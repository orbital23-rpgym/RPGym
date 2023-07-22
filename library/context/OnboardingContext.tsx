import { createContext, Dispatch, SetStateAction, useContext } from "react";

import Avatar from "src/rpg/avatar/Avatar";

export type OnboardingEquipment = "dumbbell" | "barbell";
export type OnboardingFrequency = 1 | 2 | 3 | 4 | 5;
export type OnboardingData = {
  displayName: string;
  avatar: Avatar;
  equipment?: OnboardingEquipment;
  gymFrequency?: OnboardingFrequency;
};

export const OnboardingContext = createContext<{
  data: OnboardingData | undefined;
  setData: Dispatch<SetStateAction<OnboardingData>> | undefined;
}>({ data: undefined, setData: undefined });

/** Hook to use OnboardingContext. Guarantees data is not undefined. */
export const useOnboardingContext = () => {
  const { data, setData } = useContext(OnboardingContext);
  if (!data || !setData) {
    throw new Error(
      "No OnboardingContext.Provider found when calling useOnboardingContext.",
    );
  }
  return { data, setData };
};
