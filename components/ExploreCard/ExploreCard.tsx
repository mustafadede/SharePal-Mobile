import { Movie } from "@/constants/Movie";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const ExploreCard = ({
  item,
  loading = false,
  sliderType,
  setBottomSheetVisible,
  setBottomSheetValues,
  explore,
}: {
  item: Movie;
  loading?: boolean;
  sliderType: string;
  setBottomSheetVisible: () => void;
  setBottomSheetValues?: (value: object) => void;
  explore?: boolean;
}) => {
  const router = useRouter();
  const releaseYear = item?.release_date
    ? item?.release_date?.slice(0, 4)
    : item?.first_air_date?.slice(0, 4);
  return !loading ? (
    <>
      <TouchableOpacity
        className={
          explore
            ? "relative w-full h-full mr-4 rounded-2xl bg-cGradient1"
            : "relative w-48 h-full mr-4 rounded-2xl bg-cGradient1"
        }
        onLongPress={() => {
          if (setBottomSheetVisible) {
            setBottomSheetValues({
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
          router.navigate({
            pathname: "/searchdetail",
            params: {
              title: item.title || item.name,
              release_date: item.release_date || item.first_air_date,
              poster_path: item.poster_path || item.backdrop_path,
              mediaType: sliderType || item.media_type,
              id: item.id,
              backdrop_path:
                item.backdrop_path || item.poster_path || item.backdrop_path,
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
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.2 }}
          className="absolute bottom-0 w-full h-full rounded-b-2xl"
        />
        <TouchableOpacity className="absolute top-0 right-0 pr-1 mr-1 rounded-full">
          <Text className="text-3xl text-slate-100">+</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </>
  ) : (
    <View className="relative w-48 mr-4 h-72 rounded-2xl bg-slate-800"></View>
  );
};

export default ExploreCard;
