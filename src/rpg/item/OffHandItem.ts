import Item from "./Item";

/**
 * In-game off-hand item.
 */
export default abstract class OffHandItem extends Item {
  constructor(imagePath: string) {
    super(imagePath);
  }
}
