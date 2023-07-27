import { createContext, Dispatch, SetStateAction, useContext } from "react";

import { Item } from "src/rpg/item/Item";

export const EquipmentShopContext = createContext<{
  data: Item | undefined;
  setData: Dispatch<SetStateAction<Item>> | undefined;
}>({ data: undefined, setData: undefined });

/** Hook to use EquipmentShopContext. Guarantees workout is not undefined. */
export const useEquipmentShopContext = () => {
  const { data, setData } = useContext(EquipmentShopContext);
  if (!data || !setData) {
    throw new Error(
      "No EquipmentShopContext.Provider found when calling useEquipmentShopContext.",
    );
  }
  return { data, setData };
};
