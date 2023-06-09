/**
 * In-game item.
 */
export default abstract class Item {
  imagePath: string;
  constructor(imagePath: string) {
    this.imagePath = imagePath;
  }
}
