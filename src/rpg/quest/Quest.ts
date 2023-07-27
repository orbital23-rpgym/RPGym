import { add, addWeeks, differenceInWeeks, isBefore } from "date-fns";
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
  Timestamp,
} from "firebase/firestore";

import { collections as DB } from "constants/db";
import { QUEST_DURATION, QUEST_LORE } from "constants/game";
import { db } from "src/firebase-init";

export type QuestDifficulty = "easy" | "medium" | "hard";
/**
 * In-game quest.
 */
export default class Quest {
  ref: DocumentReference;
  difficulty: QuestDifficulty;
  progressThisWeek: number;
  thisWeekStart: Date;
  goalPerWeek: number;
  startDateTime: Date;
  endDateTime: Date;
  ongoing: boolean; // ongoing == incomplete
  failed: boolean;
  // computed fields
  numWeeks: number;
  goalTotal: number;
  name: string;
  description: string;

  constructor(
    ref: DocumentReference,
    difficulty: QuestDifficulty,
    progressThisWeek: number,
    goalPerWeek: number,
    startDateTime: Date,
    endDateTime: Date,
    ongoing: boolean,
    thisWeekStart: Date,
    failed: boolean,
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
    this.thisWeekStart = thisWeekStart;
    this.failed = failed;
  }

  get wholeWeeksSinceStart(): number {
    const now = new Date();
    return differenceInWeeks(now, this.startDateTime);
  }

  async setOngoing(ongoing: boolean): Promise<Quest> {
    const ref = this.ref.withConverter(questConverter);
    this.ongoing = ongoing;
    await setDoc(ref, this);
    return this;
  }

  async setFailed(failed: boolean): Promise<Quest> {
    const ref = this.ref.withConverter(questConverter);
    this.failed = failed;
    await setDoc(ref, this);
    return this;
  }

  async setProgressThisWeek(progressThisWeek: number): Promise<Quest> {
    const ref = this.ref.withConverter(questConverter);
    this.progressThisWeek = progressThisWeek;
    await setDoc(ref, this);
    return this;
  }

  async setThisWeekStart(thisWeekStart: Date): Promise<Quest> {
    const ref = this.ref.withConverter(questConverter);
    this.thisWeekStart = thisWeekStart;
    this.progressThisWeek = 0;
    await setDoc(ref, this);
    return this;
  }

  public async incrementProgress(): Promise<Quest> {
    // do not do anything for failed/completed quests.
    if (!this.ongoing || this.failed) return this;

    const now = new Date();
    // check if deadline passed
    if (isBefore(this.endDateTime, now)) {
      // check for quest complete.
      // logic: if this week is the last week & this week's target hit, quest is complete.
      if (this.progressThisWeek >= this.goalPerWeek) {
        // complete
        await this.setOngoing(false);
        return this;
      } else {
        await this.setFailed(true);
        return this;
      }
    }

    // add workout
    await this.setProgressThisWeek(this.progressThisWeek + 1);

    // check for quest completion before deadline pass
    // logic: if this week is the last week & this week's target hit, quest is complete.
    if (
      isBefore(this.endDateTime, addWeeks(now, 1)) &&
      this.progressThisWeek >= this.goalPerWeek
    ) {
      // complete
      await this.setOngoing(false);
      return this;
    }

    // check if it is time to move onto a diff week
    if (differenceInWeeks(now, this.thisWeekStart) > 0) {
      // check if fail by not meeting goal
      if (this.progressThisWeek < this.goalPerWeek) {
        await this.setFailed(true);
        return this;
      }

      // update week counter
      await this.setThisWeekStart(addWeeks(this.thisWeekStart, 1));
    }

    return this;
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
      startDateTime: Timestamp.fromDate(startDateTime),
      endDateTime: Timestamp.fromDate(endDateTime),
      ongoing: true,
      thisWeekStart: Timestamp.fromDate(startDateTime),
      failed: false,
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
      questData.startDateTime.toDate(),
      questData.endDateTime.toDate(),
      questData.ongoing,
      questData.thisWeekStart.toDate(),
      questData.failed,
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
      startDateTime: Timestamp.fromDate(quest.startDateTime),
      endDateTime: Timestamp.fromDate(quest.endDateTime),
      ongoing: quest.ongoing,
      thisWeekStart: Timestamp.fromDate(quest.thisWeekStart),
      failed: quest.failed,
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
      data.startDateTime.toDate(),
      data.endDateTime.toDate(),
      data.ongoing,
      data.thisWeekStart.toDate(),
      data.failed,
    );
  },
};

export type QuestData = {
  difficulty: QuestDifficulty;
  progressThisWeek: number;
  goalPerWeek: number;
  startDateTime: Timestamp;
  endDateTime: Timestamp;
  ongoing: boolean;
  thisWeekStart: Timestamp;
  failed: boolean;
};
