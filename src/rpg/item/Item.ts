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
}
