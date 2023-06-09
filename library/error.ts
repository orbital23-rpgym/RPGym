/**
 * Error that is thrown when a new or existing account tries to claim a username that is taken by another account.
 */
export class UsernameTakenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UsernameTakenError";
  }
}
