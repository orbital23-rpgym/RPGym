import {
  DocumentData,
  DocumentReference,
  QueryDocumentSnapshot,
  SnapshotOptions,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "src/firebase-init";
import { collections as DB } from "constants/db";
import { Party } from "src/rpg/party/Party";
import { MAX_HEALTH } from "constants/game";

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
  party: Party | null;

  constructor(
    ref: DocumentReference,
    displayName: string,
    bio: string,
    maxHealth: number,
    currentHealth: number,
    exp: number,
    party?: Party,
  ) {
    this.ref = ref;
    this.displayName = displayName;
    this.bio = bio;
    this.maxHealth = maxHealth;
    this.currentHealth = currentHealth;
    this.exp = exp;
    this.party = party ?? null;
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
    const ref = doc(db, DB.userFitness, id).withConverter(characterConverter);
    const userCharacter = new UserCharacter(
      ref,
      username,
      "",
      MAX_HEALTH,
      MAX_HEALTH,
      0,
    );
    await setDoc(ref, userCharacter);
    return userCharacter;
  }
}

export const characterConverter = {
  toFirestore(character: UserCharacter): DocumentData {
    return {
      displayName: character.displayName,
      bio: character.bio,
      maxHealth: character.maxHealth,
      currentHealth: character.currentHealth,
      exp: character.exp,
      party: character.party,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): UserCharacter {
    // Data from QueryDocumentSnapshot will never return undefined.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const data = snapshot.data(options)!;
    return new UserCharacter(
      snapshot.ref,
      data.displayName,
      data.bio,
      data.maxHealth,
      data.currentHealth,
      data.exp,
      data.party,
    );
  },
};
