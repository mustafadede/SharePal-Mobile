import { DateFormatter } from "@/utils/formatter";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useTranslation } from "react-i18next";
import { ImageBackground, Text, useColorScheme, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const SearchDetailHeader = ({
  title,
  backdrop_path,
  poster_path,
  release_date,
  mediaType,
  sharedValue,
}: {
  title: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  mediaType: "movie" | "tv";
  sharedValue: SharedValue<number>;
}) => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  const backdropAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      sharedValue.value,
      [0, 180],
      [344, 120],
      Extrapolation.CLAMP
    );
    return { height };
  });
  const newDate = DateFormatter(release_date, "Search");

  return (
    <View
      className={`"w-full h-96 dark:bg-cGradient2 gap-14 ${title.length > 32 ? "mb-12" : "mb-6"}`}
    >
      <Animated.View
        className="w-full absolute z-0 overflow-hidden"
        style={backdropAnimatedStyle}
      >
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/original/${backdrop_path}`,
          }}
          className="w-full h-full bg-cover"
          blurRadius={8}
        >
          <LinearGradient
            colors={
              colorScheme === "dark"
                ? ["rgba(0, 0, 0, 0.4)", "rgb(14, 11, 19)"]
                : ["rgba(255, 255, 255, 0.8)", "rgb(245, 245, 245)"]
            }
            style={{ flex: 1 }}
          />
        </ImageBackground>
      </Animated.View>

      {/* POSTER */}
      <Animated.View className="flex-1 relative justify-center items-center mt-64 z-10">
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original/${poster_path}`,
          }}
          style={{
            width: 186,
            height: 248,
            borderRadius: 24,
            shadowColor: "#000",
            shadowOpacity: colorScheme === "dark" ? 0.26 : 0.18,
            shadowRadius: 22,
            shadowOffset: { width: 0, height: 12 },
          }}
          contentFit="cover"
          transition={300}
        />
      </Animated.View>

      {/* TITLE + DATE + MEDIATYPE */}
      <Animated.View className="pt-28 items-center">
        <Text className="text-2xl w-96 font-semibold text-center text-slate-800 dark:text-fuchsia-400 mb-1">
          {title}
        </Text>

        <View className="flex-row justify-center items-center gap-2">
          <Text className="text-base text-slate-600 dark:text-slate-300">
            {newDate}
          </Text>

          <View
            className="px-3 py-1 rounded-full 
                   bg-slate-200/70 dark:bg-white/10"
          >
            <Text className="text-sm text-slate-700 dark:text-slate-300">
              {mediaType === "movie"
                ? t("searchdetail.movie")
                : t("searchdetail.tv")}
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default SearchDetailHeader;
