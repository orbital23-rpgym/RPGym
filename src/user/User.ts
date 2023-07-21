import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  getCountFromServer,
  getDoc,
  query,
  QueryDocumentSnapshot,
  setDoc,
  SnapshotOptions,
  where,
} from "firebase/firestore";

import { collections as DB } from "constants/db";
import { UsernameTakenError } from "library/error";
import { db } from "src/firebase-init";
import Workout from "src/fitness-tracker/workout/Workout";
import AppSettings from "src/settings/AppSettings";
import {
  characterConverter,
  UserCharacter,
} from "src/user/character/UserCharacter";
import {
  fitnessTrackerConverter,
  UserFitnessTracker,
} from "src/user/fitness-tracker/UserFitnessTracker";

/**
 * User of the app. This class primarily handles basic user account data.
 * Management of various aspects of the user data is split into smaller classes.
 */
export class User {
  readonly id: string;
  readonly username: string;
  readonly emailAddress: string;
  readonly fitnessTracker: UserFitnessTracker;
  readonly character: UserCharacter;
  readonly settings: AppSettings;

  /**
   * Constructor for User.
   *
   * @param id UID of user.
   * @param username
   * @param emailAddress
   * @param fitnessTracker UserFitnessTracker instance that handles user's fitness tracking.
   * @param character UserCharacter instance that handles game-side features.
   * @param settings User-set application settings.
   */
  constructor(
    id: string,
    username: string,
    emailAddress: string,
    fitnessTracker: UserFitnessTracker,
    character: UserCharacter,
    settings: AppSettings,
  ) {
    this.id = id;
    this.username = username;
    this.emailAddress = emailAddress;
    this.fitnessTracker = fitnessTracker;
    this.character = character;
    this.settings = settings;
  }

  /**
   * Gets user from Firestore with specified ID.
   *
   * @param id User UID.
   * @returns User
   * @throws Error if data with specified ID not found.
   */
  static async fromId(id: string): Promise<User> {
    const snapshot = await getDoc(doc(db, DB.users, id));
    const data = snapshot.data() as UserData;
    if (data === undefined) throw Error("User ID not found");
    const userFitnessTracker = (
      await getDoc(data.fitnessTracker.withConverter(fitnessTrackerConverter))
    ).data();
    if (!userFitnessTracker) throw Error("User fitness tracker data not found");
    const userCharacter = (
      await getDoc(data.character.withConverter(characterConverter))
    ).data();
    if (!userCharacter) throw Error("User character data not found");
    const appSettings = new AppSettings(); // TODO: implement
    return new User(
      snapshot.id,
      data.username,
      data.emailAddress,
      userFitnessTracker,
      userCharacter,
      appSettings,
    );
  }

  /**
   * Checks if a given username is available.
   *
   * @param username Username to check.
   * @returns True if username is not already taken by another user.
   */
  static async isUsernameAvailable(username: string): Promise<boolean> {
    const usersRef = collection(db, DB.users);
    const q = query(usersRef, where("username", "==", username));
    const count = (await getCountFromServer(q)).data().count;
    return count === 0;
  }

  /**
   * Creates new user and uploads data to Firestore.
   * Profile and fitness data are set to dummy values.
   *
   * @param id UID returned by Firebase Authentication.
   * @param username
   * @param emailAddress
   * @returns Created user.
   * @throws UsernameTakenError if username is taken.
   */
  static async create(
    id: string,
    username: string,
    emailAddress: string,
  ): Promise<User> {
    const isUsernameAvailable = await User.isUsernameAvailable(username);
    if (!isUsernameAvailable)
      throw new UsernameTakenError("Username " + username + " already taken.");
    const ref = doc(db, DB.users, id).withConverter(userConverter);
    const userFitnessTracker = await UserFitnessTracker.create(id);
    const userCharacter = await UserCharacter.create(id, username);
    const appSettings = AppSettings.default();
    const user = new User(
      id,
      username,
      emailAddress,
      userFitnessTracker,
      userCharacter,
      appSettings,
    );
    await setDoc(ref, user);
    return user;
  }

  /**
   * Updates username.
   *
   * @returns New User instance with edited username.
   * @throws UsernameTakenError if username is taken.
   */
  public async setUsername(newUsername: string): Promise<User> {
    const isUsernameAvailable = await User.isUsernameAvailable(newUsername);
    if (!isUsernameAvailable)
      throw new UsernameTakenError(
        "Username " + newUsername + " already taken.",
      );
    const ref = doc(db, DB.users, this.id).withConverter(userConverter);
    const user = new User(
      this.id,
      newUsername,
      this.emailAddress,
      this.fitnessTracker,
      this.character,
      this.settings,
    );
    await setDoc(ref, user);
    return user;
  }

  /**
   * Adds new workout to user data. Also triggers rewards.
   */
  public async addWorkout(workout: Workout) {
    await this.character.completeWorkout();
    await this.fitnessTracker.addWorkout(workout);
  }

  /**
   * Updates user character.
   *
   * @returns New User instance with edited character.
   */
  public async setUserCharacter(newCharacter: UserCharacter): Promise<User> {
    const ref = doc(db, DB.users, this.id).withConverter(userConverter);
    const user = new User(
      this.id,
      this.username,
      this.emailAddress,
      this.fitnessTracker,
      newCharacter,
      this.settings,
    );
    await setDoc(ref, user);
    return user;
  }
}

/**
 * User data as stored in Firestore.
 */
type UserData = {
  username: string;
  emailAddress: string;
  fitnessTracker: DocumentReference;
  character: DocumentReference;
  settings: object;
};

/**
 * Firestore data converter for User.
 *
 * **NOTE:** Only use this for setting, as the get converter does not work.
 * */
export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user: User): DocumentData {
    const data: UserData = {
      username: user.username,
      emailAddress: user.emailAddress,
      fitnessTracker: user.fitnessTracker.ref,
      character: user.character.ref,
      settings: {}, // TODO: implement conversion of AppSettings to object
    };
    return data;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): User {
    // ! NOT TO BE USED
    // as there is no way to make the converter asynchronous
    // or otherwise deep read the fitness and character data as well.
    // This converter returns a dummy value -- Use the method fromId instead.
    // ---
    // Data from QueryDocumentSnapshot will never return undefined.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const data = snapshot.data(options)!;
    throw new Error("Firestore user converter should not be used.");
  },
};
