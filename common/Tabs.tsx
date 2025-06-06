import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

const Tabs = ({ tab, setTab }) => {
  const { t } = useTranslation();
  return (
    <View className="w-full h-fit">
      <LinearGradient
        colors={["rgba(14, 11, 19, 0.7)", "transparent"]}
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
      <View className="absolute z-10 flex-row mx-2 mt-4 bg-slate-800 rounded-2xl">
        <TouchableOpacity
          onPress={() => setTab(0)}
          style={{
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
          }}
          className={
            tab === 0 ? "flex-1 py-1 bg-slate-800" : "flex-1 py-1 bg-slate-900"
          }
        >
          <Text
            className={
              tab === 0
                ? "text-xl text-center py-1 text-fuchsia-300"
                : "text-xl text-center py-1 text-white"
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
              ? "flex-1 py-1 bg-slate-800 rounded-tr-xl rounded-br-xl"
              : "flex-1 py-1 rounded-tr-xl bg-slate-900 rounded-br-xl"
          }
        >
          <Text
            className={
              tab === 1
                ? "text-xl text-center py-1 text-fuchsia-300"
                : "text-xl text-center py-1 text-white"
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
