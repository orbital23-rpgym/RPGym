import Item from "./Item";

/**
 * In-game main hand item.
 */
export default class MainHandItem extends Item {
  constructor(name: string, imagePath: string) {
    super(name, imagePath);
  }
}
