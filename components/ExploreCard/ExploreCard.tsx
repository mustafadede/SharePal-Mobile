import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";

const ExploreCard = ({
  title,
  release_date,
  poster_path,
  loading = false,
  setBottomSheetVisible,
  setBootomSheetValues,
}: {
  title: string;
  release_date: string;
  poster_path: string;
  loading?: boolean;
  setBottomSheetVisible: (value: boolean) => void;
  setBootomSheetValues?: (value: object) => void;
}) => {
  const router = useRouter();
  const releaseYear = release_date?.slice(0, 4);
  return !loading ? (
    <>
      <TouchableOpacity
        className="relative w-48 h-full mr-4 rounded-2xl bg-cGradient1"
        onLongPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          setBottomSheetVisible(true);
          setBootomSheetValues({ title, releaseYear, poster_path });
        }}
        onPress={() => {}}
      >
        {poster_path ? (
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }} className="absolute w-full h-full rounded-2xl" />
        ) : (
          <View className="absolute w-full h-full bg-fuchsia-600 rounded-2xl" />
        )}
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.8)", "transparent"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          className="absolute bottom-0 w-full h-2/3 rounded-b-2xl"
        />
        <TouchableOpacity className="absolute top-0 right-0 pr-1 mr-1 rounded-full">
          <Text className="text-3xl text-slate-100">+</Text>
        </TouchableOpacity>
        <View className="absolute bottom-0 flex flex-col justify-end w-full pb-2 pl-4 h-1/3">
          <Text className="text-lg text-slate-200">{title?.length > 24 ? `${title.slice(0, 10)}...` : title}</Text>
          <Text className="text-md text-fuchsia-600">{releaseYear}</Text>
        </View>
      </TouchableOpacity>
    </>
  ) : (
    <View className="relative w-48 mr-4 h-72 rounded-2xl bg-slate-800"></View>
  );
};

export default ExploreCard;
