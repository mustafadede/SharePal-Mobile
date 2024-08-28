import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { DateFormatter } from "@/utils/formatter";
import Animated, { FadeInDown } from "react-native-reanimated";

const searchdetail = () => {
  const { id, title, release_date, poster_path, mediaType, backdrop_path } = useLocalSearchParams();
  const newDate = DateFormatter(release_date, "Search");

  return (
    <View className="flex-1 pt-6 bg-cGradient2">
      <View className="w-full h-96">
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/w500/${backdrop_path}` }}
          className={"w-full h-80 absolute z-0 bg-slate-900"}
          resizeMode="cover"
        >
          <LinearGradient colors={["rgba(0, 0, 0, 0.4)", "rgb(14, 11, 19)"]} style={{ flex: 1 }} />
        </ImageBackground>
        <View className={"flex-1 p-4 justify-center items-center z-10"}>
          <Animated.Image
            source={{ uri: `https://image.tmdb.org/t/p/w500/${poster_path}` }}
            className={"w-40 h-64 mt-4 bg-cGradient1 rounded-2xl"}
            style={{ borderWidth: 2, borderColor: Colors.dark.text }}
          />
        </View>
        <View className="mt-1">
          <Animated.Text className={"text-xl text-center text-fuchsia-600"} entering={FadeInDown.duration(400).delay(200)}>
            {title}
          </Animated.Text>
          <Animated.View entering={FadeInDown.duration(400).delay(400)} className={"flex-row justify-center gap-1 mt-1 items-center"}>
            <Text className={"text-lg text-center text-slate-300 mr-2"}>{newDate}</Text>
            <Text className={"text-lg text-center border border-slate-300 px-4 rounded-lg text-slate-300"}>
              {mediaType === "movie" ? "Movie" : "TV"}
            </Text>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default searchdetail;
