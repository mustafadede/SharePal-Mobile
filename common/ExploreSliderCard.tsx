import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, ImageBackground, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = {
  backdrop: string;
  photo: string;
  title: string;
  index: number;
  releaseDate: string;
  overview: string;
  mediaType: string;
};

const ExploreSliderCard = ({
  photo,
  title,
  index,
  backdrop,
  releaseDate,
  overview,
  mediaType,
}: Props) => {
  const { width } = Dimensions.get("screen");
  const newYear = releaseDate?.slice(0, 4);
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{ width: width, height: `auto` }}
      key={index}
      onPress={() => {
        router.push({
          pathname: "/searchdetail",
          params: {
            title: title,
            release_date: releaseDate,
            poster_path: photo,
            mediaType: mediaType,
            id: index,
            backdrop_path: backdrop,
          },
        });
      }}
    >
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/original/${backdrop}`,
        }}
        className={"w-full h-full absolute z-0 bg-slate-400"}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.4)", "rgb(14, 11, 19)"]}
          style={{ flex: 1 }}
        />
      </ImageBackground>
      <View className="flex items-center justify-center h-full overflow-hidden">
        <View className="flex flex-row items-center">
          <Animated.Image
            entering={FadeInDown.duration(400).delay(100)}
            source={{ uri: `https://image.tmdb.org/t/p/original/${photo}` }}
            className={"w-40 h-60 bg-cGradient1 rounded-2xl"}
            style={{
              borderWidth: 0.5,
              borderColor: Colors.dark.text,
              width: 160,
              height: 240,
            }}
            resizeMode="cover"
          />
          <View
            className="flex items-start gap-2 ml-4"
            style={{ maxWidth: 180 }}
          >
            <Animated.Text
              entering={FadeInDown.duration(400).delay(200)}
              className={"text-lg text-start w-full mt-2 text-white"}
              numberOfLines={2}
              ellipsizeMode={"tail"}
            >
              {title}
            </Animated.Text>
            <Animated.Text
              entering={FadeInDown.duration(400).delay(400)}
              style={{
                borderColor: "#e2e8f0",
                color: "#d946ef",
                backgroundColor: "rgba(15 23 42 / 0.6)",
              }}
              className={"text-sm border rounded-lg px-3 text-fuchsia-500"}
            >
              {newYear}
            </Animated.Text>
            <Animated.Text
              entering={FadeInDown.duration(400).delay(400)}
              className={"text-sm text-white w-10"}
            >
              {overview.slice(0, 40) + (overview.length > 40 ? "..." : "")}
            </Animated.Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExploreSliderCard;
