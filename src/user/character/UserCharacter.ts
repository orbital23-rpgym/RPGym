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
  party: Party | null;
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
    party?: Party,
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
    this.party = party ?? null;
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

  isMaxLevel() {
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
    );
    await setDoc(ref, userCharacter);
    return userCharacter;
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
    return new UserCharacter(
      snapshot.ref,
      data.displayName,
      data.bio,
      data.maxHealth,
      data.currentHealth,
      data.exp,
      data.money,
      avatar,
      data.party,
    );
  },
};
