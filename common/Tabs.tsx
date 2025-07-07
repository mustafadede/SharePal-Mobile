import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";

const Tabs = ({ tab, setTab }) => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  return (
    <View className="w-full h-fit">
      <LinearGradient
        colors={[
          colorScheme === "dark" ? "rgba(14, 11, 19, 0.7)" : "transparent",
          "transparent",
        ]}
        style={{
          position: "absolute",
          top: -40,
          left: 0,
          right: 0,
          height: 125,
          zIndex: 1,
          bottom: 0,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
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
              ? "flex-1 py-1 bg-[#475569] dark:bg-slate-800"
              : "flex-1 py-1 bg-[#94a3b8] dark:bg-slate-900"
          }
        >
          <Text
            className={
              tab === 0
                ? "text-xl text-center py-1 text-white"
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
              ? "flex-1 py-1 bg-[#475569] dark:bg-slate-800 rounded-tr-xl rounded-br-xl"
              : "flex-1 py-1 rounded-tr-xl bg-[#94a3b8] dark:bg-slate-900 rounded-br-xl"
          }
        >
          <Text
            className={
              tab === 1
                ? "text-xl text-center py-1 text-white"
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
