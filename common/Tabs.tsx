import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Tabs = ({ tab, setTab }) => {
  return (
    <View className="w-full h-fit top-1">
      <LinearGradient
        colors={["rgba(14, 11, 19, 0.7)", "transparent"]}
        style={{
          position: "absolute",
          top: -40,
          left: 0,
          right: 0,
          height: 160,
          zIndex: 1,
          bottom: 0,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <View className="absolute z-10 flex-row mx-3 mt-3 bg-slate-800 rounded-2xl">
        <TouchableOpacity
          onPress={() => setTab(0)}
          className={
            tab === 0 ? "flex-1 py-1 bg-slate-800 rounded-tl-xl rounded-bl-xl" : "flex-1 py-1 rounded-tl-xl bg-slate-900 rounded-bl-xl"
          }
        >
          <Text className={tab === 0 ? "text-lg text-center py-1 text-fuchsia-300" : "text-lg text-center py-1 text-white"}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab(1)}
          className={
            tab === 1 ? "flex-1 py-1 bg-slate-800 rounded-tr-xl rounded-br-xl" : "flex-1 py-1 rounded-tr-xl bg-slate-900 rounded-br-xl"
          }
        >
          <Text className={tab === 1 ? "text-lg text-center py-1 text-fuchsia-300" : "text-lg text-center py-1 text-white"}>Following</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Tabs;
