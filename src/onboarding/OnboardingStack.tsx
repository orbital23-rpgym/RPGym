import { Stack } from "expo-router";
import { useContext, useState } from "react";

import { themes } from "constants/colors";
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
    displayName: user.character.displayName,
    // deep copy old avatar
    avatar: Avatar.fromData(user.character.avatar.toData()),
  });
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
