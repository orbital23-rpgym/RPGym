// Initializes Firebase.
require("src/firebase-init");

/**
 * Toggles debug mode.
 *
 * Set to true to disable authentication requirement and use dummy user account.
 * ! SET TO FALSE BEFORE PUSHING
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DEBUG_MODE = false;
if (DEBUG_MODE) require("constants/dummy-values");
