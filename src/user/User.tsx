import {
  UserFitnessTracker,
  fitnessTrackerConverter,
} from "src/user/fitness-tracker/UserFitnessTracker";
import {
  UserCharacter,
  characterConverter,
} from "src/user/character/UserCharacter";
import AppSettings from "src/settings/AppSettings";
import {
  doc,
  getDoc,
  setDoc,
  DocumentReference,
  QueryDocumentSnapshot,
  SnapshotOptions,
  DocumentData,
} from "firebase/firestore";
import { db } from "src/firebase-init";
import { collections as DB } from "constants/db";
import { MAX_HEALTH } from "constants/game";

/**
 * User of the app.
 * Management of various aspects of the user data is split into smaller classes.
 */
export class User {
  readonly id: string;
  username: string;
  emailAddress: string;
  readonly fitnessTracker: UserFitnessTracker;
  readonly character: UserCharacter;
  readonly settings: AppSettings;

  /**
   * Constructor for User.
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
   * @param id User UID.
   * @returns User
   * @throws Error if data with specified ID not found.
   */
  static async fromId(id: string): Promise<User> {
    const snapshot = await getDoc(doc(db, DB.users, id));
    const data = snapshot.data() as UserData;
    if (!data) throw Error("User ID not found");
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
   * Creates new user and uploads data to Firestore. Profile and fitness data are set to dummy values.
   * @param id UID returned by Firebase Authentication.
   * @param username
   * @param emailAddress
   * @returns Created user.
   */
  static async create(
    id: string,
    username: string,
    emailAddress: string,
  ): Promise<User> {
    const ref = doc(db, DB.users, id);
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
    await setDoc(ref, {});
    return user;
  }
}

type UserData = {
  username: string;
  emailAddress: string;
  fitnessTracker: DocumentReference;
  character: DocumentReference;
  settings: object;
};

export const userConverter = {
  toFirestore(user: User): DocumentData {
    const data: UserData = {
      username: user.username,
      emailAddress: user.emailAddress,
      fitnessTracker: user.fitnessTracker.ref,
      character: user.character.ref,
      settings: user.settings,
    };
    return data;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): User {
    // ! NOT TO BE USED unless there is a way to make the converter async
    // or otherwise deep read the fitness and character data as well.
    // This returns a dummy value -- Use fromId instead.
    // ---
    // Data from QueryDocumentSnapshot will never return undefined.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const data = snapshot.data(options)!;

    /** Dummy account. */
    const JB_FITNESS = new UserFitnessTracker(
      doc(db, DB.userFitness, "jim-bro"),
    );
    const JB_CHAR = new UserCharacter(
      doc(db, DB.userCharacter, "jim-bro"),
      "Jim Bro",
      "",
      MAX_HEALTH,
      MAX_HEALTH,
      0,
    );
    const JIM_BRO = new User(
      "jim-bro",
      "jimbro",
      "jimbro@example.com",
      JB_FITNESS,
      JB_CHAR,
      AppSettings.default(),
    );
    return JIM_BRO;
  },
};
