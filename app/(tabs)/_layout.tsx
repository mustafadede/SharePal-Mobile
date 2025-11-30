import { Colors } from "@/constants/Colors";
import { RootState } from "@/store";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useSelector } from "react-redux";
export const flatListRef = React.createRef<FlatList<any>>();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { scrollPosition } = useSelector((state: RootState) => state.scroll);
  const [currentTab, setCurrentTab] = useState("index");
  const profile = useSelector((state: RootState) => state.profile);
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
          borderTopWidth: 1,
          paddingTop: 10,
          paddingBottom: 40,
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
                  <Entypo name="home" size={26} color={color} />
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
          title: "Notifications",
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor:
              colorScheme === "dark" ? Colors.dark.cBlack : Colors.dark.cWhite,
          },
          headerTintColor:
            colorScheme === "dark" ? Colors.dark.cWhite : "black",
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        listeners={{
          tabPress: () => setCurrentTab("profile/index"),
        }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image
              source={{ uri: `${profile.photoURL}` }}
              style={{
                width: 30,
                height: 30,
                borderColor: color,
                borderWidth: color ? 2 : 0,
              }}
              className={`rounded-full`}
            />
          ),
        }}
      />
    </Tabs>
  );
}
