import Item from "./Item";

/**
 * In-game off-hand item.
 */
export default class OffHandItem extends Item {
  constructor(name: string, imagePath: string) {
    super(name, imagePath);
  }
}
