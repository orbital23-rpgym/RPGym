import UserFitnessTracker from "src/user/fitness-tracker/UserFitnessTracker";
import UserAccount from "src/user/account/UserAccount";
import UserCharacter from "src/user/character/UserCharacter";
import AppSettings from "src/settings/AppSettings";
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
