import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import {
  Appearance,
  Platform,
  StatusBar as RNStatusBar,
  SafeAreaView,
  Switch,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

function Settings() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView
      className={"flex-1 z-0 w-full h-full px-3"}
      style={{
        backgroundColor:
          colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
        paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0, // Sadece Android için padding ekler
      }}
    >
      <View className="flex items-start px-4">
        <TouchableOpacity
          className="flex items-start dark:border dark:border-slate-400 rounded-2xl justify-center w-full h-16"
          onPress={() => router.push("/profile")}
        >
          <Text
            className="text-lg font-bold pl-4"
            style={{
              color: colorScheme === "dark" ? Colors.dark.cWhite : "black",
            }}
          >
            Profile
          </Text>
        </TouchableOpacity>
        <View className="flex items-start w-full mt-2">
          <Text className="text-2xl dark:text-white font-bold my-4">
            Settings
          </Text>
          <View className="flex flex-row items-center h-16 w-full justify-between bg-slate-200 dark:bg-slate-700 px-4 rounded-xl">
            <Text className="text-lg font-semibold dark:text-white">
              Dark Mode
            </Text>
            <Switch
              value={colorScheme === "dark"}
              onValueChange={() => {
                const newTheme = colorScheme === "dark" ? "light" : "dark";
                Appearance.setColorScheme(newTheme);
              }}
              thumbColor={
                colorScheme === "dark"
                  ? Colors.dark.cWhite
                  : Colors.dark.cDarkGray
              }
              trackColor={{
                false: Colors.dark.cFuc6,
                true: Colors.dark.cDarkGray,
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Settings;
