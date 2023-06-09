import Item from "./Item";

/**
 * In-game main hand item.
 */
export default abstract class MainHandItem extends Item {
  constructor(imagePath: string) {
    super(imagePath);
  }
}
