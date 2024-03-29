import { FontAwesome5 } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { NotoSans_400Regular } from "@expo-google-fonts/noto-sans";
import { WorkSans_600SemiBold } from "@expo-google-fonts/work-sans";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { LogBox } from "react-native";

import { themes } from "constants/colors";
import { headingTextStyle } from "constants/styles";
import { AuthProvider } from "library/context/auth";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { PopUpProvider } from "library/context/PopUpContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Naming convention rule disabled as unstable_settings is an expo router default name.
// eslint-disable-next-line @typescript-eslint/naming-convention
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  auth: {
    initialRouteName: "welcome",
  },
  initialRouteName: "(tabs)/",
};

// Suppress font loading error as the splashscreen method doesn't really work
LogBox.ignoreLogs([
  "You need to wait for Font.loadAsync to complete before using the font.",
]);

export default function RootLayout() {
  const [isLoadedFonts, error] = useFonts({
    BodyRegular: NotoSans_400Regular,
    Header: WorkSans_600SemiBold,
    ...FontAwesome.font,
    ...FontAwesome5.font,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  useEffect(() => {
    if (isLoadedFonts) {
      // Hide the splash screen after the fonts have loaded and the
      // UI is ready.
      SplashScreen.hideAsync();
    }
  }, [isLoadedFonts]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Prevent rendering real layout until fonts loaded
  if (!isLoadedFonts) {
    return <Slot initialRouteName="(auth)/loading" />;
  }

  // Render the children routes now that all the assets are loaded.
  return isLoadedFonts ? <RootLayoutNav /> : <SplashScreen />;
}

function RootLayoutNav() {
  // const colorScheme = useColorScheme() ?? "dark";
  // only dark theme available for now
  const colorScheme = "dark";

  return (
    <AuthProvider>
      <PopUpProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <ColorSchemeContext.Provider value={colorScheme}>
            <StatusBar
              animated={true}
              backgroundColor={themes[colorScheme].background}
              style={colorScheme === "dark" ? "light" : "dark"}
            />
            <Stack
              initialRouteName="(auth)/welcome"
              screenOptions={{
                headerStyle: {
                  backgroundColor: themes[colorScheme].background,
                },
                headerTitleStyle: {
                  ...headingTextStyle,
                },
                headerTintColor: themes[colorScheme].text,
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="(auth)/welcome"
                options={{ headerShown: false, title: "Welcome to RPGym" }}
              />
              <Stack.Screen
                name="workout/reward"
                options={{
                  presentation: "modal",
                }}
              />
              <Stack.Screen
                name="quest/reward"
                options={{
                  presentation: "modal",
                }}
              />
            </Stack>
          </ColorSchemeContext.Provider>
        </ThemeProvider>
      </PopUpProvider>
    </AuthProvider>
  );
}
