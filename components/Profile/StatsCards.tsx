import useSearchWithYear from "@/hooks/useSearchWithYear";
import { RootState } from "@/store";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import StatusLabel from "../StatusLabel/StatusLabel";

const StatsCards = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const { t } = useTranslation();
  const handleCurrentlyWatching = () => {
    useSearchWithYear(
      profile.currentlyWatching.title,
      profile.currentlyWatching.releaseDate?.slice(0, 4)
    ).then((item) => {
      router.push({
        pathname: "/searchdetail",
        params: {
          title: item.title || item.name,
          release_date: item.release_date || item.first_air_date,
          poster_path: item.poster_path || item.backdrop_path,
          mediaType: item.media_type || "Movie",
          id: item.id,
          backdrop_path:
            item.backdrop_path || item.poster_path || item.backdrop_path,
        },
      });
    });
  };
  return (
    <View className="items-center flex-1 pb-4 mx-6">
      {/* currently Watching */}
      <View className="items-start justify-center w-full px-4 py-2 mb-4 h-fit bg-slate-900 rounded-2xl">
        <Text className="mb-3 text-2xl font-bold text-white">
          {t("profile.currently")}
        </Text>
        <TouchableOpacity
          className="flex-row items-center gap-4"
          onPress={() => handleCurrentlyWatching()}
        >
          <Image
            className="rounded-lg w-28 h-36"
            source={{
              uri: `https://image.tmdb.org/t/p/original/${profile.currentlyWatching.poster}`,
            }}
          />
          <View>
            <Text className="text-lg text-white">
              {profile.currentlyWatching.title}
            </Text>
            <Text className="text-lg text-slate-400">
              ({profile.currentlyWatching.releaseDate?.slice(0, 4)})
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* total series/films */}
      <View className="flex-row gap-4 my-1">
        <View className="flex-1 px-4 pb-4 rounded-2xl bg-slate-900 h-fit">
          <Text className="mt-4 text-xl font-bold text-white">
            {t("profile.totalFilms")}
          </Text>
          {profile.status === "done" ? (
            <Text className="text-2xl text-slate-400">
              {profile.totalFilms}
            </Text>
          ) : (
            <StatusLabel />
          )}
        </View>
        <View className="flex-1 px-4 pb-4 rounded-2xl bg-slate-900 h-fit">
          <Text className="mt-4 text-xl font-bold text-white">
            {t("profile.totalSeries")}
          </Text>
          {profile.status === "done" ? (
            <Text className="text-2xl text-slate-400">
              {profile.totalSeries}
            </Text>
          ) : (
            <StatusLabel />
          )}
        </View>
      </View>
    </View>
  );
};

export default StatsCards;
