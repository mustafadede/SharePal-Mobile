import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";

const AttachItem = () => {
  return (
    <View className="flex-row items-center justify-between mb-2">
      <View className="flex-row items-center gap-2">
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original/dMOpdkrDC5dQxqNydgKxXjBKyAc.jpg`,
          }}
          className="w-16 h-24 rounded-2xl"
          resizeMode="cover"
        />
        <Text className="text-md text-slate-200">INVINCIBLE</Text>
        <Text className="text-md text-slate-400">(2023)</Text>
      </View>
      <TouchableOpacity className="justify-center h-8 px-4 bg-slate-600 rounded-xl">
        <Entypo name="attachment" size={18} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

export default AttachItem;
