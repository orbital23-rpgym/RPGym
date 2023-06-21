/**
 * Campaign template. (boss fight)
 */
export default class CampaignTemplate {
  id: CampaignId;
  bossName: string;
  bossImage: string;
  description: string;
  bossMaxHealth: number;
  difficulty: number;

  constructor(
    id: CampaignId,
    bossName: string,
    bossImage: string,
    description: string,
    bossMaxHealth: number,
    difficulty: number,
  ) {
    this.id = id;
    this.bossName = bossName;
    this.bossImage = bossImage;
    this.description = description;
    this.bossMaxHealth = bossMaxHealth;
    this.difficulty = difficulty;
  }
}

export type CampaignId = "honk";
