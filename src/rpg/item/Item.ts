import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

/**
 * In-game item.
 */
export default abstract class Item {
  name: string;
  imagePath: string;
  constructor(name: string, imagePath: string) {
    this.name = name;
    this.imagePath = imagePath;
  }

  public toData(): ItemData {
    return { name: this.name, imagePath: this.imagePath };
  }

  public abstract fromData(data: ItemData): Item;
}

export type ItemData = {
  name: string;
  imagePath: string;
};
