import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

const ListCard = ({
  movie,
  index,
  itemKey,
}: {
  movie: {
    title: string;
    releaseDate: string;
    poster: string;
    backdrop: string;
    media_type: string;
    [key: string]: any;
  };
  index: number;
  itemKey: string;
}) => {
  const renderRightActions = useCallback(
    () => (
      <View className="relative">
        <TouchableOpacity
          onPress={() => {
            // Handle delete action here
          }}
          className="justify-center mr-4 px-6 top-12 items-center rounded-xl"
        >
          <MaterialIcons name="delete" size={28} color="#b91c1c" />
        </TouchableOpacity>
      </View>
    ),
    []
  );

  const onPress = useCallback(
    () =>
      router.navigate({
        pathname: "/searchdetail",
        params: {
          title: movie.title,
          release_date: movie.releaseDate,
          poster_path: movie.poster,
          mediaType: movie.media_type,
          id: itemKey,
          backdrop_path: movie.backdrop,
        },
      }),
    [movie, itemKey]
  );
  return (
    <Swipeable
      key={index}
      enabled={false}
      friction={2}
      rightThreshold={28}
      onSwipeableWillOpen={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
      }}
      renderRightActions={renderRightActions}
    >
      <View className="px-4">
        <TouchableOpacity
          onLongPress={() => setSwipeEnabled(true)}
          activeOpacity={1}
          className="relative flex-row items-center flex-grow h-24 mt-4 w-full rounded-2xl"
          onPress={onPress}
        >
          <Image
            contentFit="cover"
            cachePolicy="memory-disk"
            blurRadius={Platform.OS === "ios" ? 10 : 0}
            source={{
              uri: `https://image.tmdb.org/t/p/original${movie.backdrop}`,
            }}
            style={{
              borderRadius: 16,
              opacity: 0.2,
              flex: 1,
              height: 86,
              position: "absolute",
              inset: 0,
            }}
          />
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original${movie.poster}`,
            }}
            cachePolicy="memory-disk"
            contentFit="cover"
            style={{
              width: 64,
              height: 64,
              borderRadius: 100,
              marginLeft: 16,
            }}
          />
          <View className="pl-4">
            <Text
              className="overflow-visible text-white w-72"
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {index + 1 + ". " + movie.title}
            </Text>
            <Text className="text-slate-200 dark:text-fuchsia-600">
              ({movie.releaseDate?.slice(0, 4)})
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

export default ListCard;
