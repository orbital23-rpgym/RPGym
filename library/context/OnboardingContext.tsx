import { createContext, Dispatch, SetStateAction, useContext } from "react";

import Avatar from "src/rpg/avatar/Avatar";

export type OnboardingData = {
  displayName: string;
  avatar: Avatar;
  isNewbie: boolean;
  equipment: "dumbbell" | "barbell";
  gymFrequency: 1 | 2 | 3 | 4 | 5;
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
