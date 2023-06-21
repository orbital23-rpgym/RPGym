import { add, differenceInWeeks } from "date-fns";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  getDoc,
  QueryDocumentSnapshot,
  setDoc,
  SnapshotOptions,
} from "firebase/firestore";

import { collections as DB } from "constants/db";
import { QUEST_DURATION } from "constants/game";
import { db } from "src/firebase-init";

export type QuestDifficulty = "easy" | "medium" | "hard";
/**
 * In-game quest.
 */
export default class Quest {
  ref: DocumentReference;
  difficulty: QuestDifficulty;
  progressThisWeek: number;
  goalPerWeek: number;
  startDateTime: Date;
  endDateTime: Date;
  ongoing: boolean;
  // computed fields
  numWeeks: number;
  goalTotal: number;

  constructor(
    ref: DocumentReference,
    difficulty: QuestDifficulty,
    progressThisWeek: number,
    goalPerWeek: number,
    startDateTime: Date,
    endDateTime: Date,
    ongoing: boolean,
  ) {
    this.ref = ref;
    this.difficulty = difficulty;
    this.progressThisWeek = progressThisWeek;
    this.goalPerWeek = goalPerWeek;
    this.startDateTime = startDateTime;
    this.endDateTime = endDateTime;
    this.ongoing = ongoing;
    this.numWeeks = QUEST_DURATION[difficulty];
    this.goalTotal = goalPerWeek * this.numWeeks;
    this.name = QUEST_LORE[difficulty].name;
    this.description = QUEST_LORE[difficulty].description;
  }

  get wholeWeeksSinceStart(): number {
    const now = new Date();
    return differenceInWeeks(now, this.startDateTime, {
      roundingMethod: "floor",
    });
  }

  /**
   * Get quest data from Firestore.
   */
  static async fromRef(ref: DocumentReference): Promise<Quest> {
    const quest = await getDoc(ref.withConverter(questConverter));
    return quest.data() as Quest;
  }

  /**
   * Create new quest.
   */
  static async create(
    difficulty: QuestDifficulty,
    goalPerWeek: number,
    userId: string,
  ): Promise<Quest> {
    const startDateTime = new Date();
    const endDateTime = add(startDateTime, {
      weeks: QUEST_DURATION[difficulty],
    });
    const questData: QuestData = {
      difficulty: difficulty,
      progressThisWeek: 0,
      goalPerWeek: goalPerWeek,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      ongoing: true,
    };
    const ref = await addDoc(
      collection(db, DB.userCharacter, userId, "quests"),
      questData,
    );
    const quest = new Quest(
      ref,
      questData.difficulty,
      questData.progressThisWeek,
      questData.goalPerWeek,
      questData.startDateTime,
      questData.endDateTime,
      questData.ongoing,
    );
    return quest;
  }
}

/**
 * Firestore data converter for Quest.
 */
export const questConverter: FirestoreDataConverter<Quest> = {
  toFirestore(quest: Quest): DocumentData {
    const data: QuestData = {
      difficulty: quest.difficulty,
      progressThisWeek: quest.progressThisWeek,
      goalPerWeek: quest.goalPerWeek,
      startDateTime: quest.startDateTime,
      endDateTime: quest.endDateTime,
      ongoing: quest.ongoing,
    };
    return data;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): Quest {
    // Data from QueryDocumentSnapshot will never return undefined.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const data = snapshot.data(options)! as QuestData;
    return new Quest(
      snapshot.ref,
      data.difficulty,
      data.progressThisWeek,
      data.goalPerWeek,
      data.startDateTime,
      data.endDateTime,
      data.ongoing,
    );
  },
};

export type QuestData = {
  difficulty: QuestDifficulty;
  progressThisWeek: number;
  goalPerWeek: number;
  startDateTime: Date;
  endDateTime: Date;
  ongoing: boolean;
};
