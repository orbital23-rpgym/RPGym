import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  getDoc,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

import { collections as DB } from "constants/db";
import { db } from "src/firebase-init";
/**
 * Exercise template.
 */
export default class ExerciseTemplate {
  readonly ref: DocumentReference;
  name: string;
  category: string;
  notes: string;

  constructor(
    ref: DocumentReference,
    name: string,
    category: string,
    notes: string,
  ) {
    this.ref = ref;
    this.name = name;
    this.category = category;
    this.notes = notes;
  }

  /**
   * Get default templates from Firestore.
   */
  static async getDefaultTemplates() {
    const defaultsRef = doc(db, DB.rpgym, "fitness");
    const snapshot = await getDoc(defaultsRef);
    const data = snapshot.data() as ExerciseTemplateData[];
    return data.map((templateData) =>
      // TODO: rework ref
      ExerciseTemplate.fromData(
        templateData,
        doc(db, DB.userCharacter, "rpgym", "exerciseTemplates"),
      ),
    );
  }

  /**
   * Get template from Firestore.
   */
  static async fromRef(ref: DocumentReference): Promise<ExerciseTemplate> {
    const template = await getDoc(ref.withConverter(exerciseTemplateConverter));
    return template.data() as ExerciseTemplate;
  }

  /**
   * Create new exercise template and upload to Firestore.
   */
  static async create(
    name: string,
    category: string,
    notes: string,
    userId: string,
  ): Promise<ExerciseTemplate> {
    const templateData: ExerciseTemplateData = {
      name: name,
      category: category,
      notes: notes,
    };
    const ref = await addDoc(
      collection(db, DB.userCharacter, userId, "exerciseTemplates"),
      templateData,
    );
    const template = new ExerciseTemplate(
      ref,
      templateData.name,
      templateData.category,
      templateData.notes,
    );
    return template;
  }

  /**
   * Get template from data.
   */
  static fromData(
    data: ExerciseTemplateData,
    ref: DocumentReference,
  ): ExerciseTemplate {
    return new ExerciseTemplate(ref, data.name, data.category, data.notes);
  }

  /**
   * Convert template to data.
   */
  toData(): ExerciseTemplateData {
    return {
      name: this.name,
      category: this.category,
      notes: this.notes,
    };
  }
}

/**
 * Firestore data converter for ExerciseTemplate.
 */
export const exerciseTemplateConverter: FirestoreDataConverter<ExerciseTemplate> =
  {
    toFirestore(template: ExerciseTemplate): DocumentData {
      const data = template.toData();
      return data;
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions,
    ): ExerciseTemplate {
      // Data from QueryDocumentSnapshot will never return undefined.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const data = snapshot.data(options)! as ExerciseTemplateData;
      return ExerciseTemplate.fromData(data, snapshot.ref);
    },
  };

export type ExerciseTemplateData = {
  name: string;
  category: string;
  notes: string;
};
