import UserFitnessTracker from "./fitness-tracker/UserFitnessTracker";
import UserAccount from "./account/UserAccount";
import UserCharacter from "./character/UserCharacter";
import AppSettings from "../settings/AppSettings";
/**
 * User of the app.
 * Management of various aspects of the user data is split into smaller classes.
 */
export class User {
  #account: UserAccount;
  #fitnessTracker: UserFitnessTracker;
  #character: UserCharacter;
  #settings: AppSettings;

  constructor(
    account: UserAccount,
    fitnessTracker: UserFitnessTracker,
    character: UserCharacter,
    settings: AppSettings,
  ) {
    this.#account = account;
    this.#fitnessTracker = fitnessTracker;
    this.#character = character;
    this.#settings = settings;
  }
}
