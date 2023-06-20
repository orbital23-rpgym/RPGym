/**
 * Campaign template. (boss fight)
 */
export default class CampaignTemplate {
  bossName: string;
  bossImage: string;
  description: string;
  bossMaxHealth: number;
  difficulty: number;

  constructor(
    bossName: string,
    bossImage: string,
    description: string,
    bossMaxHealth: number,
    difficulty: number,
  ) {
    this.bossName = bossName;
    this.bossImage = bossImage;
    this.description = description;
    this.bossMaxHealth = bossMaxHealth;
    this.difficulty = difficulty;
  }
}
