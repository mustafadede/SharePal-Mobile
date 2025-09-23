import { Colors } from "@/constants/Colors";
import { RootState } from "@/store";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import { FlatList, TouchableOpacity, useColorScheme } from "react-native";
import { useSelector } from "react-redux";
export const flatListRef = React.createRef<FlatList<any>>();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { scrollPosition } = useSelector((state: RootState) => state.scroll);
  const [currentTab, setCurrentTab] = useState("index");
  const handleScroll = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.dark.cFuc6,
        tabBarStyle: {
          borderColor:
            colorScheme === "dark" ? Colors.dark.cDarkGray : Colors.dark.cWhite,
          backgroundColor:
            colorScheme === "dark"
              ? Colors.dark.cGradient2
              : Colors.dark.cWhite,
          borderTopWidth: 0.5,
          paddingTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        listeners={{
          tabPress: () => setCurrentTab("index"),
        }}
        options={{
          title: "Feed",
          tabBarLabel: "Feed",
          tabBarIcon: ({ color }) => {
            if (scrollPosition > 10 && currentTab === "index") {
              return (
                <TouchableOpacity onPress={handleScroll}>
                  <AntDesign name="up-circle" size={26} color={color} />
                </TouchableOpacity>
              );
            } else {
              return <Entypo name="home" size={26} color={color} />;
            }
          },
        }}
      />
      <Tabs.Screen
        name="explore/index"
        listeners={{
          tabPress: () => setCurrentTab("explore/index"),
        }}
        options={{
          title: "Explore",
          tabBarLabel: "Explore",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notification/index"
        listeners={{
          tabPress: () => setCurrentTab("notification/index"),
        }}
        options={{
          title: "Notification",
          headerShown: true,
          headerShadowVisible: false,
          headerTransparent: true,
          headerTintColor:
            colorScheme === "dark" ? Colors.dark.cWhite : "black",
          tabBarLabel: "Notification",
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/index"
        listeners={{
          tabPress: () => setCurrentTab("settings/index"),
        }}
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
