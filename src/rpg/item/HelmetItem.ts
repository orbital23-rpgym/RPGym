import Item from "./Item";

/**
 * In-game helmet item.
 */
export default abstract class HelmetItem extends Item {
  constructor(imagePath: string) {
    super(imagePath);
  }
}
