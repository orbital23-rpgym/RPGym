/**
 * Max health for a user at given level.
 */
export const MAX_USER_HEALTH = [
  50, 100, 175, 275, 400, 550, 725, 925, 1150, 1400,
];

/**
 * Level experience point bounds.
 *
 * @example For levels as defined below, user with `X <= exp <= Y` will be level N.
 * ```js
 * {...
 * N: X,
 * M: Y,
 * ...}
 * ```
 */
export const LEVEL_EXP_BOUNDS = [
  0, 50, 100, 175, 275, 400, 550, 725, 925, 1150, 1400,
];

/**
 * Range for reward RNG.
 */
export type RewardRange = {
  min: number;
  max: number;
};
/**
 * Rewards for a given activity.
 * @member money Range of money to RNG.
 * @member exp Experience points.
 * @member attack Amount of HP to attack the boss if campaign active.
 * @member hasEquipment True if has chance to reward with a random equipment item.
 */
export type ActivityRewards = {
  money: RewardRange;
  exp: number;
  attack: RewardRange;
  hasEquipment: boolean;
};

/**
 * Rewards for completing easy/medium/hard quests.
 * Quests provide a fixed amount of exp and RNG money. They do not provide boss attack or equipment.
 */
export const QUEST_REWARDS: {
  easy: ActivityRewards;
  medium: ActivityRewards;
  hard: ActivityRewards;
} = {
  easy: {
    money: { min: 1, max: 15 },
    exp: 75,
    attack: { min: 0, max: 0 },
    hasEquipment: false,
  },
  medium: {
    money: { min: 5, max: 15 },
    exp: 200,
    attack: { min: 0, max: 0 },
    hasEquipment: false,
  },
  hard: {
    money: { min: 8, max: 15 },
    exp: 500,
    attack: { min: 0, max: 0 },
    hasEquipment: false,
  },
};

/**
 * Rewards for completing workouts.
 * Workouts provide a fixed amount of exp and RNG 1-10 money.
 * They provide RNG 1-10 attack for ongoing boss fights.
 * They do not provide equipment.
 */
export const WORKOUT_REWARDS: ActivityRewards = {
  money: { min: 1, max: 10 },
  exp: 50,
  attack: { min: 1, max: 10 },
  hasEquipment: false,
};

/**
 * Base rewards for completing boss fights.
 * Boss fight rewards are multiplied by the campaign difficulty modifier.
 */
export const BOSS_REWARDS: ActivityRewards = {
  money: { min: 10, max: 20 },
  exp: 1000,
  attack: { min: 0, max: 0 },
  hasEquipment: true,
};

/**
 * Base boss parameters.
 * Boss fight health and parameters are multiplied by the campaign difficulty modifier.
 */
export const BOSS_PARAMS = {
  baseHealth: 500,
  rewards: BOSS_REWARDS,
};

/**
 * Prices for each equipment type.
 */
export const EQUIP_PRICES = {
  silver: 30,
  gold: 50,
  emerald: 50,
  obsidian: 100,
};
