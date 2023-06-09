import Item from "./Item";

/**
 * In-game chestplate item.
 */
export default abstract class ChestplateItem extends Item {
  constructor(imagePath: string) {
    super(imagePath);
  }
}
