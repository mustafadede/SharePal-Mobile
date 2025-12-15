import InfoLabel from "@/common/InfoLabel";
import { Movie } from "@/constants/Movie";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import StatusLabel from "../StatusLabel/StatusLabel";

const Results = ({
  results,
  filters,
  selectedFilter,
  setSelectedFilter,
  loading,
  setLoading,
}) => {
  const router = useRouter();
  const renderItem = useCallback(
    ({ item }: { item: Movie }) =>
      item?.poster_path &&
      (item?.release_date || item?.first_air_date) && (
        <TouchableOpacity
          className="relative flex-row items-center flex-grow h-28 pl-2 m-2 rounded-3xl"
          onPress={() =>
            router.navigate({
              pathname: "/searchdetail",
              params: {
                title: item.title || item.name,
                release_date: item.release_date || item.first_air_date,
                poster_path: item.poster_path || item.backdrop_path,
                mediaType: item.media_type,
                id: item.id,
                backdrop_path:
                  item.backdrop_path || item.poster_path || item.backdrop_path,
              },
            })
          }
        >
          <ImageBackground
            source={{
              uri: `https://image.tmdb.org/t/p/original${
                item.backdrop_path || item.poster_path
              }`,
            }}
            imageStyle={{ borderRadius: 16 }}
            className="absolute w-full h-full opacity-80 bg-black dark:opacity-20 rounded-2xl"
            style={{
              borderTopRightRadius: 16,
              borderBottomLeftRadius: 16,
              borderTopLeftRadius: 16,
              borderBottomRightRadius: 16,
            }}
          ></ImageBackground>
          <Image
            source={`https://image.tmdb.org/t/p/original${item.poster_path}`}
            contentFit="cover"
            transition={100}
            style={{
              width: 64,
              height: 64,
              borderRadius: 100,
              marginLeft: 12,
            }}
          />
          <View className="pl-4">
            <Text
              className="overflow-visible text-white w-72"
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {item.title || item.name}
            </Text>
            <Text className="text-slate-200 dark:text-fuchsia-600">
              (
              {item.release_date?.slice(0, 4) ||
                item.first_air_date?.slice(0, 4)}
              )
            </Text>
          </View>
        </TouchableOpacity>
      ),
    []
  );
  return (
    <View className="flex-col flex-1 mt-2">
      <Animated.View
        entering={FadeIn.delay(100).duration(100)}
        className="flex-row justify-around mx-2 mb-2 h-fit"
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            onPress={() => setSelectedFilter(filter.id)}
            className={
              selectedFilter === filter.id
                ? "items-center justify-center flex-1 py-1 mx-1 rounded-lg bg-fuchsia-600 dark:bg-transparent border-fuchsia-600"
                : "items-center justify-center flex-1 py-1 mx-1 rounded-lg bg-slate-900"
            }
            style={{ borderWidth: 0.5 }}
          >
            <Text className="text-center text-md text-slate-200">
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
      {loading && results?.length < 1 && <StatusLabel />}
      {!loading && !results && <InfoLabel status="explore.searchNotFound" />}
      {!loading && (
        <Animated.FlatList
          className="flex-col flex-1 w-full h-full pl-2 mt-2 mb-2"
          data={results}
          renderItem={renderItem}
          keyExtractor={(item: Movie) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default Results;
