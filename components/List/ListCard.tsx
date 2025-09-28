import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  return (
    <Swipeable
      key={index}
      friction={2}
      rightThreshold={28}
      onSwipeableWillOpen={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
      }}
      renderRightActions={() => (
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
      )}
    >
      <TouchableOpacity
        activeOpacity={1}
        className="relative flex-row items-center px-4 flex-grow h-24 mt-4 rounded-2xl"
        onPress={() =>
          router.navigate({
            pathname: "/searchdetail",
            params: {
              title: movie.title,
              release_date: movie.releaseDate,
              poster_path: movie.poster,
              mediaType: movie.media_type,
              id: itemKey, // use the firebase key here
              backdrop_path: movie.backdrop,
            },
          })
        }
      >
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/original${movie.backdrop}`,
          }}
          imageStyle={{ borderRadius: 16 }}
          className="absolute w-full h-full opacity-80 bg-black dark:opacity-20 rounded-2xl"
          blurRadius={10}
        />
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original${movie.poster}`,
          }}
          className="w-14 h-14 rounded-full"
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
    </Swipeable>
  );
};

export default ListCard;
