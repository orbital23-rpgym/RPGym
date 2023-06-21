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
import { LEVEL_EXP_BOUNDS, MAX_USER_HEALTH } from "constants/game";
import { db } from "src/firebase-init";
import Avatar, { AvatarData } from "src/rpg/avatar/Avatar";
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
  completedQuests: Quest[] | undefined;
  avatar: Avatar;

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
    );
    await setDoc(ref, userCharacter);
    return userCharacter;
  }

  public beginQuest(quest: Quest) {
    // Check if user already has ongoing quest
    if (this.ongoingQuest !== null)
      throw new Error("A quest is already in progress.");
    this.ongoingQuest = quest;
    this.updateToFirestore();
  }

  public updateToFirestore() {
    setDoc(this.ref.withConverter(characterConverter), this).catch((reason) => {
      throw new Error("Update to cloud failed.");
    });
  }

  public updateFromFirestore() {
    getDoc(this.ref.withConverter(characterConverter)).then((snap) => {
      const updated = snap.data() as UserCharacter;
      Object.assign(this, updated);
    });
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
};
