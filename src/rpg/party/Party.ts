import OngoingCampaign from "../campaign/OngoingCampaign";

/**
 * In-game party.
 */
export class Party {
  name: string;
  memberIds: string[];
  ongoingCampaign: OngoingCampaign | undefined;

  constructor(
    name: string,
    memberIds: string[],
    ongoingCampaign?: OngoingCampaign,
  ) {
    this.name = name;
    this.memberIds = memberIds;
    this.ongoingCampaign = ongoingCampaign;
  }
}
