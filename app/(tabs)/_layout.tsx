import { FontAwesome5 } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { useContext } from "react";
import { Pressable } from "react-native";

import { themes } from "constants/colors";
import HeaderStyle from "constants/HeaderStyle";
import { Text } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
}) {
  return <FontAwesome5 size={26} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarLabel(props: {
  title: string;
  focused: boolean;
  color: string;
}) {
  const labelStyle = {
    fontSize: 12,
    fontWeight: props.focused ? ("bold" as const) : ("normal" as const),
    padding: 5,
    color: props.color,
  };

  return <Text style={labelStyle}>{props.title}</Text>;
}

export default function TabLayout() {
  const colorScheme = useContext(ColorSchemeContext);

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
          maxHeight: 65,
        },
        headerStyle: {
          height: 100,
        },
        ...HeaderStyle,
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
          title: "Party",
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
          title: "Quests",
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
        name="addWorkout"
        options={{
          title: "Work Out",
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
        name="workoutHistory"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="history" color={color} />
          ),
          tabBarLabel: ({ focused, color }) => {
            return (
              <TabBarLabel title="History" color={color} focused={focused} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user-alt" color={color} />
          ),
          tabBarLabel: ({ focused, color }) => {
            return (
              <TabBarLabel title="Profile" color={color} focused={focused} />
            );
          },
          headerRight: () => (
            <Link href="/settings/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="gear"
                    size={25}
                    color={themes[colorScheme].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
