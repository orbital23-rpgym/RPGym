import FontAwesome from "@expo/vector-icons/FontAwesome";
import { NotoSans_400Regular } from "@expo-google-fonts/noto-sans";
import { WorkSans_600SemiBold } from "@expo-google-fonts/work-sans";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

import { headerStyle } from "constants/styles";
import { AuthProvider } from "library/context/auth";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Naming convention rule disabled as unstable_settings is an expo router default name.
// eslint-disable-next-line @typescript-eslint/naming-convention
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [isLoaded, error] = useFonts({
    BodyRegular: NotoSans_400Regular,
    Header: WorkSans_600SemiBold,
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!isLoaded && <SplashScreen />}
      {isLoaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme() ?? "dark";

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <ColorSchemeContext.Provider value={colorScheme}>
          <Stack screenOptions={headerStyle}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="settings/index"
              options={{ presentation: "card", title: "Settings" }}
            />
            <Stack.Screen
              name="settings/accountSettings"
              options={{ title: "Account Settings" }}
            />
            <Stack.Screen
              name="settings/profileSettings"
              options={{ title: "Profile Settings" }}
            />
            <Stack.Screen name="(auth)/signUp" options={{ title: "Sign Up" }} />
            <Stack.Screen name="(auth)/login" options={{ title: "Log In" }} />
            <Stack.Screen
              name="(auth)/welcome"
              options={{ headerShown: false }}
            />
          </Stack>
        </ColorSchemeContext.Provider>
      </ThemeProvider>
    </AuthProvider>
  );
}
