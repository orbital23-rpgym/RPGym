import Item from "./Item";

/**
 * In-game chestplate item.
 */
export default class ChestplateItem extends Item {
  constructor(name: string, imagePath: string) {
    super(name, imagePath);
  }
}
