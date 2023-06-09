import Item from "./Item";

/**
 * In-game leggings item.
 */
export default abstract class LeggingsItem extends Item {
  constructor(imagePath: string) {
    super(imagePath);
  }
}
