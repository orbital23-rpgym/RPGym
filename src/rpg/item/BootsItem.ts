import Item from "./Item";

/**
 * In-game boots item.
 */
export default abstract class BootsItem extends Item {
  constructor(imagePath: string) {
    super(imagePath);
  }
}
