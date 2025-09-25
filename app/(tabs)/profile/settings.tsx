import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
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

const sections = [
  {
    title: "profileSettings.sections.account",
    data: [
      {
        title: "profileSettings.items.profile.title",
        description: "profileSettings.items.profile.description",
        to: "",
      },
      {
        title: "profileSettings.items.accountSecurity.title",
        description: "profileSettings.items.accountSecurity.description",
        to: "",
      },
    ],
  },
  {
    title: "profileSettings.sections.preferences",
    data: [
      {
        title: "profileSettings.items.notifications.title",
        description: "profileSettings.items.notifications.description",
        to: "",
      },
      {
        title: "profileSettings.items.privacy.title",
        description: "profileSettings.items.privacy.description",
        to: "",
      },
      {
        title: "profileSettings.items.language.title",
        description: "profileSettings.items.language.description",
        to: "(tabs)/profile/language",
      },
      {
        title: "profileSettings.items.appearance.title",
        description: "profileSettings.items.appearance.description",
        to: "",
      },
      {
        title: "profileSettings.items.darkMode.title",
        description: "profileSettings.items.darkMode.description",
        type: "switch",
        to: "",
      },
    ],
  },
  {
    title: "profileSettings.sections.support",
    data: [
      {
        title: "profileSettings.items.helpSupport.title",
        description: "profileSettings.items.helpSupport.description",
      },
    ],
  },
];

const Settings = () => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <SafeAreaView className={"dark:bg-cGradient2 bg-gray-50 flex-1 pt-24"}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        className="px-5"
      >
        {sections.map((section, idx) => (
          <View key={idx} className="mb-6">
            <Text className="text-xs font-semibold uppercase mb-2 dark:text-slate-400 text-gray-700">
              {t(section.title)}
            </Text>
            {section.data.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="p-4 rounded-2xl border mb-3 dark:bg-slate-900 bg-white border-gray-200 dark:border-slate-900"
                activeOpacity={item.type === "switch" ? 1 : 0.7}
                onPress={() => {
                  router.push(item?.to);
                }}
              >
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-base font-medium dark:text-white text-gray-900">
                      {t(item.title)}
                    </Text>
                    <Text className="text-sm mt-1 dark:text-slate-400 text-gray-500">
                      {t(item.description)}
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
            <Text className="text-red-700 text-lg font-semibold">
              {t("profileSettings.logout")}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Logout Button fixed at bottom */}
    </SafeAreaView>
  );
};

export default Settings;
