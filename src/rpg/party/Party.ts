import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  getDoc,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

import OngoingCampaign, {
  OngoingCampaignData,
} from "../campaign/OngoingCampaign";

/**
 * In-game party.
 */
export class Party {
  ref: DocumentReference;
  name: string;
  memberIds: string[];
  ongoingCampaign: OngoingCampaign | null;

  constructor(
    ref: DocumentReference,
    name: string,
    memberIds: string[],
    ongoingCampaign: OngoingCampaign | null,
  ) {
    this.ref = ref;
    this.name = name;
    this.memberIds = memberIds;
    this.ongoingCampaign = ongoingCampaign;
  }

  /**
   * Get party data from Firestore.
   */
  static async fromRef(ref: DocumentReference): Promise<Party> {
    const party = await getDoc(ref.withConverter(partyConverter));
    return party.data() as Party;
  }
}

/**
 * Firestore data converter for Party.
 */
export const partyConverter: FirestoreDataConverter<Party> = {
  toFirestore(party: Party): DocumentData {
    const data: PartyData = {
      name: party.name,
      memberIds: party.memberIds,
      ongoingCampaign: party.ongoingCampaign?.toData() ?? null,
    };
    return data;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): Party {
    // Data from QueryDocumentSnapshot will never return undefined.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const data = snapshot.data(options)! as PartyData;
    return new Party(
      snapshot.ref,
      data.name,
      data.memberIds,
      data.ongoingCampaign
        ? OngoingCampaign.fromData(data.ongoingCampaign)
        : null,
    );
  },
};

export type PartyData = {
  name: string;
  memberIds: string[];
  ongoingCampaign: OngoingCampaignData | null;
};
