/**
 * Numeric parameters and constants for gamification portion of app.
 */

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
 * Range for game RNG.
 */
export type RNGRange = {
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
  money: RNGRange;
  exp: number;
  attack: RNGRange;
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
    money: { min: 1, max: 10 },
    exp: 75,
    attack: { min: 0, max: 0 },
    hasEquipment: false,
  },
  medium: {
    money: { min: 50, max: 50 },
    exp: 200,
    attack: { min: 0, max: 0 },
    hasEquipment: false,
  },
  hard: {
    money: { min: 100, max: 100 },
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
  money: { min: 0, max: 0 },
  exp: 600,
  attack: { min: 0, max: 0 },
  hasEquipment: true,
};

/**
 * Base boss parameters.
 * Boss fight health and parameters are multiplied by the campaign difficulty modifier.
 */
export const BOSS_PARAMS = {
  baseHealth: 100,
  strength: { min: 0, max: 0 } as RNGRange,
  rewards: BOSS_REWARDS,
};

/**
 * Prices for each equipment type.
 */
export const EQUIP_PRICES = {
  none: 0,
  silver: 30,
  gold: 50,
  emerald: 70,
  obsidian: 100,
};

/**
 * Quest durations in weeks.
 */
export const QUEST_DURATION = {
  easy: 1,
  medium: 2,
  hard: 4,
};

export type QuestLore = {
  name: string;
  description: string;
};
/** Titles and descriptions for each difficulty of quest. */
export const QUEST_LORE: {
  easy: QuestLore;
  medium: QuestLore;
  hard: QuestLore;
} = {
  easy: {
    name: "Battle for the Bronze",
    description:
      "Embark on a grueling journey in “Battle for the Bronze”! Conquer a series of intense workouts, endure hardships and claim the Bronze Medal of Endurance as a testament to your unwavering dedication.",
  },
  medium: {
    name: "Silver Summoning",
    description:
      "Embark on a herculean odyssey to prove your indomitable spirit in “Silver Summoning”.  Triumph over formidable obstacles, persevere through extreme hardships, and seize the Silver Medal of Resilience, an emblem of your unparalleled fortitude.",
  },
  hard: {
    name: "Hitting the Gold Mine",
    description:
      "Plunge into an infernal crucible that will push your body and mind to their limits in “Hitting the Gold Mine”. Brave an onslaught of merciless workouts, conquering insurmountable barriers and claiming the Gold Metal of Invincibility, an irrefutable testament to your unyielding dominance.",
  },
};

export function computeRewards(base: ActivityRewards) {
  const rng = Math.random();
  const rewards = {
    money: rng * (base.money.max - base.money.min) + base.money.min,
    exp: base.exp,
    attack: rng * (base.attack.max - base.attack.min) + base.attack.min,
    equipment: base.hasEquipment ? /*rng equipment */ "" : null,
  };
  return rewards;
}
