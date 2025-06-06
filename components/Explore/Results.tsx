import { View, Text, TouchableOpacity, FlatList, Image, ImageBackground } from "react-native";
import React from "react";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Movie } from "@/constants/Movie";
import { useRouter } from "expo-router";
import StatusLabel from "../StatusLabel/StatusLabel";
import InfoLabel from "@/common/InfoLabel";

const Results = ({ results, filters, selectedFilter, setSelectedFilter, loading, setLoading }) => {
  const router = useRouter();

  return (
    <View className="flex-col flex-1 mt-2">
      <Animated.View entering={FadeInUp.delay(100).duration(200)} className="flex-row justify-around mx-2 mb-2 h-fit">
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            onPress={() => setSelectedFilter(filter.id)}
            className={
              selectedFilter === filter.id
                ? "items-center justify-center flex-1 py-1 mx-1 rounded-lg border-fuchsia-600"
                : "items-center justify-center flex-1 py-1 mx-1 rounded-lg bg-slate-900"
            }
            style={{ borderWidth: 0.5 }}
          >
            <Text className="text-center text-md text-slate-200">{filter.label}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
      {loading && results?.length < 1 && <StatusLabel />}
      {!loading && !results && <InfoLabel status="No results found. Try a different search term." />}
      {!loading && (
        <FlatList
          className="flex-col flex-1 w-full h-full pl-2 mt-2 mb-2"
          data={results}
          key={"results"}
          renderItem={({ item }: { item: Movie }) =>
            item?.poster_path &&
            (item?.release_date || item?.first_air_date) && (
              <TouchableOpacity
                className="relative flex-row items-center flex-grow h-16 pl-2 m-2 rounded-2xl"
                onPress={() =>
                  router.navigate({
                    pathname: "/searchdetail",
                    params: {
                      title: item.title || item.name,
                      release_date: item.release_date || item.first_air_date,
                      poster_path: item.poster_path || item.backdrop_path,
                      mediaType: item.media_type,
                      id: item.id,
                      backdrop_path: item.backdrop_path || item.poster_path || item.backdrop_path,
                    },
                  })
                }
              >
                <ImageBackground
                  source={{ uri: `https://image.tmdb.org/t/p/original${item.backdrop_path || item.poster_path}` }} // Add your background image URL here
                  imageStyle={{ borderRadius: 16 }} // Optional: to ensure the image corners are rounded
                  className="absolute w-full h-full opacity-20 rounded-2xl"
                  blurRadius={10}
                ></ImageBackground>
                <Image source={{ uri: `https://image.tmdb.org/t/p/original${item.poster_path}` }} className="w-12 h-12 rounded-full" />
                <View className="pl-4">
                  <Text className="overflow-visible text-white w-72" ellipsizeMode="tail" numberOfLines={1}>
                    {item.title || item.name}
                  </Text>
                  <Text className="text-fuchsia-600">({item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4)})</Text>
                </View>
              </TouchableOpacity>
            )
          }
          keyExtractor={(item: Movie) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default Results;
