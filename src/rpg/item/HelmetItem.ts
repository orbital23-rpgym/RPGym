import Item from "./Item";

/**
 * In-game helmet item.
 */
export default class HelmetItem extends Item {
  constructor(name: string, imagePath: string) {
    super(name, imagePath);
  }
}
