import {
  doc,
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  getDoc,
  QueryDocumentSnapshot,
  setDoc,
  SnapshotOptions,
} from "firebase/firestore";

import { collections as DB } from "constants/db";
import {
  computeRewards,
  LEVEL_EXP_BOUNDS,
  MAX_USER_HEALTH,
  WORKOUT_REWARDS,
} from "constants/game";
import { db } from "src/firebase-init";
import Avatar, { AvatarData } from "src/rpg/avatar/Avatar";
import { Item } from "src/rpg/item/Item";
import { Party } from "src/rpg/party/Party";
import Quest from "src/rpg/quest/Quest";

/**
 * User character (social & RPG-related) data.
 */
export class UserCharacter {
  readonly ref: DocumentReference;
  displayName: string;
  bio: string;
  maxHealth: number;
  currentHealth: number;
  exp: number;
  expLevel: number;
  money: number;
  // null if does not exist, undefined if not retrieved
  party: Party | null | undefined;
  ongoingQuest: Quest | null | undefined;
  completedQuests: Quest[];
  avatar: Avatar;
  items: Item[];

  constructor(
    ref: DocumentReference,
    displayName: string,
    bio: string,
    maxHealth: number,
    currentHealth: number,
    exp: number,
    money: number,
    avatar: Avatar,
    completedQuests: Quest[],
    party: Party | null | DocumentReference,
    ongoingQuest: Quest | null | DocumentReference,
    items: Item[],
  ) {
    this.ref = ref;
    this.displayName = displayName;
    this.bio = bio;
    this.maxHealth = maxHealth;
    this.currentHealth = currentHealth;
    this.exp = exp;
    this.expLevel = this.computeExpLevel();
    this.money = money;
    this.avatar = avatar;
    this.completedQuests = completedQuests;
    this.items = items;

    this.party = undefined;
    this.ongoingQuest = undefined;
    if (party instanceof DocumentReference) {
      Party.fromRef(party).then((party) => (this.party = party));
    } else if (party instanceof Party || party === null) {
      this.party = party;
    }
    if (ongoingQuest instanceof DocumentReference) {
      Quest.fromRef(ongoingQuest).then((quest) => (this.ongoingQuest = quest));
    } else if (ongoingQuest instanceof Quest || ongoingQuest === null) {
      this.ongoingQuest = ongoingQuest;
    }
  }

  computeExpLevel(): number {
    let prevLevel = -1;
    for (const bound of LEVEL_EXP_BOUNDS) {
      if (this.exp < bound) return prevLevel;
      prevLevel += 1;
    }
    return prevLevel;
  }

  /**
   * Gets exp after subtracting existing level.
   */
  get expForLevel() {
    return this.exp - LEVEL_EXP_BOUNDS[this.expLevel];
  }

  public isMaxLevel() {
    return this.expLevel >= LEVEL_EXP_BOUNDS.length;
  }

  /**
   * Gets total exp needed for next level after subtracting existing level.
   */
  get expForNextLevel() {
    if (this.isMaxLevel()) return Infinity;
    return (
      LEVEL_EXP_BOUNDS[this.expLevel + 1] - LEVEL_EXP_BOUNDS[this.expLevel]
    );
  }

  /**
   * Gets character data from Firestore of user with specified ID.
   * @param id User UID.
   * @returns User character data
   * @throws Error if user with specified ID not found.
   */
  static async fromId(id: string): Promise<UserCharacter> {
    const d = await getDoc(
      doc(db, DB.userFitness, id).withConverter(characterConverter),
    );
    if (d.exists()) {
      return d.data() as UserCharacter;
    } else {
      throw Error("User not found");
    }
  }

  /**
   * Creates new blank character and uploads to Firestore.
   * @param id UID returned by Firebase Authentication.
   * @param username User-entered username, used as default display name value.
   * @returns Created character.
   */
  static async create(id: string, username: string): Promise<UserCharacter> {
    const ref = doc(db, DB.userCharacter, id).withConverter(characterConverter);
    const userCharacter = new UserCharacter(
      ref,
      username,
      "",
      MAX_USER_HEALTH[0],
      MAX_USER_HEALTH[0],
      0,
      0,
      Avatar.DEFAULT,
      [],
      null,
      null,
      [],
    );
    await setDoc(ref, userCharacter);
    return userCharacter;
  }

  /**
   * Edits user profile and uploads to Firestore.
   *
   * @returns Modified character.
   */
  async updateProfile(
    displayName: string,
    bio: string,
    avatar: Avatar,
  ): Promise<UserCharacter> {
    const newCharacter = new UserCharacter(
      this.ref,
      displayName,
      bio,
      this.maxHealth,
      this.currentHealth,
      this.exp,
      this.money,
      avatar,
      this.completedQuests,
      this.party ?? null,
      this.ongoingQuest ?? null,
      this.items,
    );
    await setDoc(this.ref.withConverter(characterConverter), newCharacter);
    return newCharacter;
  }

  /**
   * Edits money balance and uploads to Firestore.
   *
   * @returns Modified character.
   */
  async setMoney(money: number): Promise<UserCharacter> {
    const newCharacter = new UserCharacter(
      this.ref,
      this.displayName,
      this.bio,
      this.maxHealth,
      this.currentHealth,
      this.exp,
      money,
      this.avatar,
      this.completedQuests,
      this.party ?? null,
      this.ongoingQuest ?? null,
      this.items,
    );
    await setDoc(this.ref.withConverter(characterConverter), newCharacter);
    return newCharacter;
  }

  /**
   * Edits inventory items and uploads to Firestore.
   *
   * @returns Modified character.
   */
  async setItems(items: Item[]): Promise<UserCharacter> {
    const newCharacter = new UserCharacter(
      this.ref,
      this.displayName,
      this.bio,
      this.maxHealth,
      this.currentHealth,
      this.exp,
      this.money,
      this.avatar,
      this.completedQuests,
      this.party ?? null,
      this.ongoingQuest ?? null,
      items,
    );
    await setDoc(this.ref.withConverter(characterConverter), newCharacter);
    return newCharacter;
  }

  public async beginQuest(quest: Quest) {
    // Check if user already has ongoing quest
    if (this.ongoingQuest !== null)
      throw new Error("A quest is already in progress.");
    this.ongoingQuest = quest;
    await this.updateToFirestore();
  }

  public isOngoingCampaign(): boolean {
    return Boolean(this.party?.ongoingCampaign);
  }

  /**
   * Trigger rewards associated with workout completion.
   */
  public async completeWorkout() {
    const rewards = computeRewards(WORKOUT_REWARDS);
    this.exp += rewards.exp;
    this.money += rewards.money;
    this.incrementQuest();
    this.incrementCampaign(rewards.attack);
    await this.updateToFirestore();
    return {
      exp: rewards.exp,
      money: rewards.money,
      attack: this.isOngoingCampaign() ? rewards.attack : 0,
    };
  }

  /** Progress quest and check for completion. */
  public async incrementQuest() {
    if (this.ongoingQuest) {
      this.ongoingQuest.progressThisWeek += 1;
      await this.updateToFirestore();
    }
  }

  /**
   * Trigger rewards associated with quest completion.
   */
  public completeQuest() {
    return;
  }

  public incrementCampaign(amount: number) {
    return;
  }
  /**
   * Trigger rewards associated with campaign completion.
   */
  public completeCampaign() {
    return;
  }

  async updateToFirestore() {
    await setDoc(this.ref.withConverter(characterConverter), this).catch(
      (reason) => {
        throw new Error("Update to cloud failed.");
      },
    );
  }

  updateFromFirestore() {
    getDoc(this.ref.withConverter(characterConverter)).then((snap) => {
      const updated = snap.data() as UserCharacter;
      Object.assign(this, updated);
    });
  }

  /**
   * Gets latest user character from cloud.
   *
   * @returns New UserCharacter instance with updated info from database.
   */
  public async getUserCharacter(): Promise<UserCharacter> {
    const ref = this.ref.withConverter(characterConverter);
    const snapshot = await getDoc(ref);
    return snapshot.data() as UserCharacter;
  }
}

export const characterConverter: FirestoreDataConverter<UserCharacter> = {
  toFirestore(character: UserCharacter): DocumentData {
    return {
      displayName: character.displayName,
      bio: character.bio,
      maxHealth: character.maxHealth,
      currentHealth: character.currentHealth,
      exp: character.exp,
      money: character.money,
      party: character.party,
      avatar: character.avatar.toData(),
      ongoingQuest: character.ongoingQuest?.ref ?? null,
      items: character.items,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): UserCharacter {
    // Data from QueryDocumentSnapshot will never return undefined.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const data = snapshot.data(options)!;
    const avatar = Avatar.fromData(data.avatar as AvatarData);
    const character = new UserCharacter(
      snapshot.ref,
      data.displayName,
      data.bio,
      data.maxHealth,
      data.currentHealth,
      data.exp,
      data.money,
      avatar,
      data.completedQuests,
      data.party,
      data.ongoingQuest,
      data.items,
    );
    return character;
  },
};

export type UserCharacterData = {
  displayName: string;
  bio: string;
  maxHealth: number;
  currentHealth: number;
  exp: number;
  expLevel: number;
  money: number;
  party: DocumentReference | null;
  ongoingQuest: DocumentReference | null;
  completedQuests: DocumentReference[];
  avatar: Avatar;
  items: Item[];
};
