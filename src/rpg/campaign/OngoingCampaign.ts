import CampaignTemplate from "./CampaignTemplate";

/**
 * Ongoing campaign.
 */
export default class OngoingCampaign {
  template: CampaignTemplate;
  currentBossHealth: number;

  constructor(template: CampaignTemplate, currentBossHealth: number) {
    this.template = template;
    this.currentBossHealth = currentBossHealth;
  }
}
