import { Stack } from "expo-router";
import { useContext, useEffect, useState } from "react";

import { themes } from "constants/colors";
import { PLACEHOLDER_USER } from "constants/placeholder-values";
import { headingTextStyle } from "constants/styles";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import {
  OnboardingContext,
  OnboardingData,
} from "library/context/OnboardingContext";
import { useAppUser } from "library/context/UserContext";
import Avatar from "src/rpg/avatar/Avatar";

export default function OnboardingStack() {
  const colorScheme = useContext(ColorSchemeContext);
  const user = useAppUser();
  // initialise new empty shared data context for this stack
  const [data, setData] = useState<OnboardingData>({
    displayName: "",
    // deep copy old avatar
    avatar: Avatar.DEFAULT,
  });

  useEffect(() => {
    if (user !== PLACEHOLDER_USER) {
      const { displayName: oldName, avatar: oldAvatar, ...otherData } = data;
      const newData = {
        displayName: user.character.displayName,
        avatar: Avatar.fromData(user.character.avatar.toData()),
        ...otherData,
      };
      setData(newData);
    }
  }, [user]);
  return (
    <OnboardingContext.Provider value={{ data, setData }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerTitleStyle: {
            ...headingTextStyle,
          },
          headerTintColor: themes[colorScheme].text,
          headerTransparent: true,
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "Profile Setup | Display Name" }}
        />
        <Stack.Screen
          name="avatar"
          options={{ title: "Profile Setup | Avatar" }}
        />
        <Stack.Screen
          name="routine/index"
          options={{ title: "Starter Routine" }}
        />
        <Stack.Screen
          name="routine/equip"
          options={{ title: "Starter Routine | Equipment" }}
        />
        <Stack.Screen
          name="routine/freq"
          options={{ title: "Starter Routine | Frequency" }}
        />
        <Stack.Screen
          name="routine/result"
          options={{ title: "Starter Routine | Result" }}
        />
        <Stack.Screen
          name="tutorial/index"
          options={{ title: "App Tutorial" }}
        />
        <Stack.Screen
          name="tutorial/guide"
          options={{ title: "App Tutorial" }}
        />
        <Stack.Screen name="complete" options={{ title: "Let's go!" }} />
      </Stack>
    </OnboardingContext.Provider>
  );
}
