import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { Movie } from "@/constants/Movie";

const ExploreCard = ({
  item,
  loading = false,
  sliderType,
  setBottomSheetVisible,
  setBootomSheetValues,
}: {
  item: Movie;
  loading?: boolean;
  sliderType: string;
  setBottomSheetVisible: () => void;
  setBootomSheetValues?: (value: object) => void;
}) => {
  const router = useRouter();
  const releaseYear = item?.release_date ? item?.release_date?.slice(0, 4) : item?.first_air_date?.slice(0, 4);

  return !loading ? (
    <>
      <TouchableOpacity
        className="relative w-48 h-full mr-4 rounded-2xl bg-cGradient1"
        onLongPress={() => {
          if (setBottomSheetVisible) {
            setBootomSheetValues({
              title: item.title || item.name,
              release_date: item.release_date || item.first_air_date,
              poster_path: item.poster_path || item.backdrop_path,
              mediaType: sliderType || item.media_type,
              id: item.id,
            });
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            setBottomSheetVisible();
          }
        }}
        onPress={() => {
          router.push({
            pathname: "/searchdetail",
            params: {
              title: item.title || item.name,
              release_date: item.release_date || item.first_air_date,
              poster_path: item.poster_path || item.backdrop_path,
              mediaType: sliderType || item.media_type,
              id: item.id,
              backdrop_path: item.backdrop_path || item.poster_path || item.backdrop_path,
            },
          });
        }}
      >
        {item?.poster_path ? (
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
            }}
            className="absolute w-full h-full rounded-2xl"
          />
        ) : item?.backdrop_path ? (
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
            }}
            className="absolute w-full h-full rounded-2xl"
          />
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
          <Text className="text-lg text-slate-200">
            {item.title?.length > 24 ? `${item.title.slice(0, 10)}...` : item.title || item.name}
          </Text>
          <Text className="text-md text-fuchsia-600">{releaseYear}</Text>
        </View>
      </TouchableOpacity>
    </>
  ) : (
    <View className="relative w-48 mr-4 h-72 rounded-2xl bg-slate-800"></View>
  );
};

export default ExploreCard;
