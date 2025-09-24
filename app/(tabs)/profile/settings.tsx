import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import {
  Appearance,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const Settings = () => {
  const colorScheme = useColorScheme();
  const sections = [
    {
      title: "Account",
      data: [
        { title: "Profile", description: "Manage your profile info" },
        {
          title: "Account Security",
          description: "Password and security options",
        },
      ],
    },
    {
      title: "Preferences",
      data: [
        {
          title: "Notifications",
          description: "Customize notification preferences",
        },
        { title: "Privacy", description: "Control your privacy settings" },
        { title: "Language", description: "Change app language" },
        { title: "Appearance", description: "Theme, font size, and layout" },
        {
          title: "Dark Mode",
          description: "Toggle between light and dark theme",
          type: "switch",
        },
      ],
    },
    {
      title: "Support",
      data: [
        {
          title: "Help & Support",
          description: "Get help or contact support",
        },
      ],
    },
  ];

  return (
    <SafeAreaView className={"dark:bg-cGradient2 bg-gray-50 flex-1 pt-24"}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        className="px-5"
      >
        {sections.map((section, idx) => (
          <View key={idx} className="mb-6">
            <Text className="text-xs font-semibold uppercase mb-2 dark:text-slate-400 text-gray-700">
              {section.title}
            </Text>
            {section.data.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="p-4 rounded-2xl border mb-3 dark:bg-slate-900 bg-white border-gray-200 dark:border-slate-900"
                activeOpacity={item.type === "switch" ? 1 : 0.7}
              >
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-base font-medium dark:text-white text-gray-900">
                      {item.title}
                    </Text>
                    <Text className="text-sm mt-1 dark:text-slate-400 text-gray-500">
                      {item.description}
                    </Text>
                  </View>
                  {item.type === "switch" && (
                    <Switch
                      value={colorScheme === "dark"}
                      onValueChange={() => {
                        const newTheme =
                          colorScheme === "dark" ? "light" : "dark";
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
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <TouchableOpacity
          className="p-4 rounded-xl bg-transparent border dark:border-red-700 items-center"
          activeOpacity={0.8}
          onPress={() => router.replace("/")}
        >
          <View className="flex-row items-center gap-2 space-x-2">
            <Ionicons name="log-out-outline" size={20} color="rgb(185 28 28)" />
            <Text className="text-red-700 text-lg font-semibold">Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Logout Button fixed at bottom */}
    </SafeAreaView>
  );
};

export default Settings;
