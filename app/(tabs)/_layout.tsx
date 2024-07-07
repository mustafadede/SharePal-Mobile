import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Feed",
            tabBarLabel: "Feed",
          }}
        />
        <Tabs.Screen
          name="explore/index"
          options={{
            title: "Explore",
            tabBarLabel: "Explore",
          }}
        />
        <Tabs.Screen
          name="notification/index"
          options={{
            title: "Notification",
            tabBarLabel: "Notification",
          }}
        />
        <Tabs.Screen
          name="settings/index"
          options={{
            title: "Settings",
            tabBarLabel: "Settings",
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
