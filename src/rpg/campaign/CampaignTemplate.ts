/**
 * Campaign template. (boss fight)
 */
export default class CampaignTemplate {
  bossName: string;
  bossImage: string;
  description: string;
  bossMaxHealth: number;
  difficulty = 1;

  constructor(
    bossName: string,
    bossImage: string,
    description: string,
    bossMaxHealth: number,
  ) {
    this.bossName = bossName;
    this.bossImage = bossImage;
    this.description = description;
    this.bossMaxHealth = bossMaxHealth;
  }
}
