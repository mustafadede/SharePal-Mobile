import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";

const ExploreBanner = ({ data }: { data: Object[] }) => {
  return (
    <View className="w-full mb-2 h-80 bg-fuchsia-950">
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w500/cB3xYrmlCAMuccsn4uC5s9hs4SK.jpg`,
        }}
        className={"w-full h-full absolute z-0 bg-slate-400"}
        resizeMode="cover"
      >
        <LinearGradient colors={["rgba(0, 0, 0, 0.4)", "rgb(14, 11, 19)"]} style={{ flex: 1 }} />
      </ImageBackground>
      <View className="flex items-center justify-center h-full">
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500//dMOpdkrDC5dQxqNydgKxXjBKyAc.jpg` }}
          className={"w-40 h-60 bg-cGradient1 rounded-2xl"}
          style={{ borderWidth: 0.5, borderColor: Colors.dark.text }}
          resizeMode="cover"
        />
        <Text className={"text-lg text-center mt-2 text-white"}>INVINCIBLE</Text>
      </View>
    </View>
  );
};

export default ExploreBanner;
