import { Colors } from "@/constants/Colors";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";

const Tabs = ({
  tab,
  setTab,
}: {
  tab: number;
  setTab: (tab: number) => void;
}) => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  return (
    <View className="w-full h-fit">
      <View
        className="absolute z-10 flex-row mx-2 mt-4 rounded-2xl"
        style={{
          backgroundColor:
            colorScheme === "dark" ? Colors.dark.cGradient2 : "#64748b",
        }}
      >
        <TouchableOpacity
          onPress={() => setTab(0)}
          style={{
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
          }}
          className={
            tab === 0
              ? "flex-1 py-1 bg-white dark:bg-slate-800"
              : "flex-1 py-1 bg-slate-400 dark:bg-slate-200"
          }
        >
          <Text
            className={
              tab === 0
                ? "text-xl text-center py-1 text-fuchsia-600"
                : "text-xl text-center py-1 text-slate-200"
            }
          >
            {t("tabs.feed")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab(1)}
          style={{
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
          }}
          className={
            tab === 1
              ? "flex-1 py-1 bg-white dark:bg-slate-800 rounded-tr-xl rounded-br-xl"
              : "flex-1 py-1 rounded-tr-xl bg-gray-400 dark:bg-slate-700 rounded-br-xl"
          }
        >
          <Text
            className={
              tab === 1
                ? "text-xl text-center py-1 text-fuchsia-600"
                : "text-xl text-center py-1 text-slate-200"
            }
          >
            {t("tabs.following")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Tabs;
