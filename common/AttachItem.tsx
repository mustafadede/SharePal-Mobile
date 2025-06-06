import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const AttachItem = () => {
  return (
    <View className="flex-row items-center w-fit h-fit justify-between mt-4">
      <View className="flex-row items-center gap-2">
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original/dMOpdkrDC5dQxqNydgKxXjBKyAc.jpg`,
          }}
          className="rounded-2xl"
          style={{
            width: 64,
            height: 96,
          }}
          resizeMode="cover"
        />
        <Text className="text-md text-slate-200">INVINCIBLE</Text>
        <Text className="text-md text-slate-400">(2023)</Text>
      </View>
      <TouchableOpacity className="justify-center h-12 py-0 px-4 bg-slate-600 rounded-lg">
        <Entypo name="attachment" size={18} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

export default AttachItem;
