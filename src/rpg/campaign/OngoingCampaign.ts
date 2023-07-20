import { CAMPAIGNS } from "./campaigns";
import CampaignTemplate, { CampaignId } from "./CampaignTemplate";

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

  public toData(): OngoingCampaignData {
    return {
      template: this.template.id,
      currentBossHealth: this.currentBossHealth,
    };
  }

  static fromData(data: OngoingCampaignData): OngoingCampaign {
    return new OngoingCampaign(
      CAMPAIGNS[data.template],
      data.currentBossHealth,
    );
  }
}

export type OngoingCampaignData = {
  template: CampaignId;
  currentBossHealth: number;
};
