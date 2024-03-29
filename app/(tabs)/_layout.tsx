import { FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { themes } from "constants/colors";
import { headingTextStyle } from "constants/styles";
import { Text } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
}) {
  const style = { marginBottom: -3 };
  return <FontAwesome5 size={26} style={style} {...props} />;
}

function TabBarLabel(props: {
  title: string;
  focused: boolean;
  color: string;
}) {
  const labelStyle = {
    fontFamily: "Header",
    fontSize: 12,
    padding: 5,
    color: props.color,
  };

  return <Text style={labelStyle}>{props.title}</Text>;
}

export default function TabLayout() {
  const colorScheme = useContext(ColorSchemeContext);
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      initialRouteName="AddWorkout"
      screenOptions={{
        tabBarActiveTintColor: themes[colorScheme].tint,
        tabBarInactiveTintColor: themes[colorScheme].tint,
        tabBarActiveBackgroundColor: themes[colorScheme].tabBarActiveColor,
        tabBarInactiveBackgroundColor: themes[colorScheme].tabBarInactiveColor,
        tabBarLabelPosition: "below-icon",
        tabBarStyle: {
          flex: 1,
          maxHeight: 65 + insets.bottom,
        },
        headerStyle: {
          backgroundColor: themes[colorScheme].background,
          height: 50 + insets.top,
        },
        headerTitleStyle: {
          ...headingTextStyle,
        },
        headerTintColor: themes[colorScheme].text,
        headerTransparent: false,
        headerLeftContainerStyle: {
          padding: 5,
        },
        headerRightContainerStyle: {
          padding: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="party"
        options={{
          href: null,
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
          tabBarLabel: ({ focused, color }) => {
            return (
              <TabBarLabel title="Party" color={color} focused={focused} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="quests"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shield-alt" color={color} />
          ),
          tabBarLabel: ({ focused, color }) => {
            return (
              <TabBarLabel title="Quests" color={color} focused={focused} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="dumbbell" color={color} />
          ),
          tabBarLabel: ({ focused, color }) => {
            return (
              <TabBarLabel title="Work Out" color={color} focused={focused} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="tracking"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="chart-line" color={color} />
          ),
          tabBarLabel: ({ focused, color }) => {
            return (
              <TabBarLabel title="Tracking" color={color} focused={focused} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user-alt" color={color} />
          ),
          tabBarLabel: ({ focused, color }) => {
            return (
              <TabBarLabel title="Profile" color={color} focused={focused} />
            );
          },
        }}
      />
    </Tabs>
  );
}
