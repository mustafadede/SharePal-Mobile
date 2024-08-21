import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { DateFormatter } from "@/utils/formatter";

const searchdetail = () => {
  const { id, title, release_date, poster_path, mediaType, backdrop_path } = useLocalSearchParams();
  const newDate = DateFormatter(release_date, "Search");
  console.log(backdrop_path);

  return (
    <View className="flex-1 pt-6 bg-cGradient2">
      <View className="w-full h-96">
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/w500/${backdrop_path}` }}
          className={"w-full h-80 absolute z-0 bg-slate-400"}
          resizeMode="cover"
        >
          <LinearGradient colors={["rgba(0, 0, 0, 0.4)", "rgb(14, 11, 19)"]} style={{ flex: 1 }} />
        </ImageBackground>
        <View className={"flex-1 p-4 justify-center items-center z-10"}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500/${poster_path}` }}
            className={"w-40 h-64 mt-4 bg-cGradient1 rounded-2xl"}
            style={{ borderWidth: 2, borderColor: Colors.dark.text }}
          />
        </View>
        <View>
          <Text className={"text-xl text-center text-fuchsia-600"}>{title}</Text>
          <View className={"flex-row justify-center gap-3 mt-1 items-center"}>
            <Text className={"text-lg text-center text-slate-300"}>{newDate}</Text>
            <Text className={"text-lg text-center border border-slate-300 px-4 rounded-lg text-slate-300"}>
              {mediaType === "movie" ? "Movie" : "TV"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default searchdetail;
