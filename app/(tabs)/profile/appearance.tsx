import { Colors } from "@/constants/Colors";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Appearance,
  Switch,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const appearance = () => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView className={"dark:bg-cGradient2 bg-gray-50 flex-1 pt-16 px-5"}>
      <TouchableOpacity
        key={"switcher"}
        className="p-4 rounded-2xl border mb-3 dark:bg-slate-900 bg-white border-gray-200 dark:border-slate-900"
        activeOpacity={1}
      >
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-base font-medium dark:text-white text-gray-900">
              {t("profileSettings.items.darkMode.title")}
            </Text>
            <Text className="text-sm mt-1 dark:text-slate-400 text-gray-500">
              {t("profileSettings.items.darkMode.description")}
            </Text>
          </View>
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
            trackColor={{ false: "#767577", true: "#a855f7" }}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default appearance;
