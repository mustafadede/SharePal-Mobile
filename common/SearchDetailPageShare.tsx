import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const SearchDetailPageShareWantToWatch = ({ backdrop_path, poster_path, title, mediaType, username, color }) => {
  const { label } = useSelector((state: RootState) => state.shareSearchDetail);
  return (
    <Animated.View
      entering={FadeInUp.duration(300).delay(100)}
      className="items-center justify-center"
      style={{
        height: 640,
        width: 360,
      }}
    >
      {color === 0 && (
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/original/${poster_path}` }}
          className={"w-full h-full absolute z-0 bg-slate-900"}
          resizeMode="cover"
          blurRadius={7}
        >
          <LinearGradient colors={["rgba(0, 0, 0, 0.1)", "rgb(14, 11, 19)"]} style={{ flex: 1 }} />
        </ImageBackground>
      )}
      {color === 1 && (
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/original/${backdrop_path}` }}
          className={"w-full h-full absolute z-0 bg-slate-900"}
          resizeMode="cover"
          blurRadius={3}
        >
          <LinearGradient colors={["rgba(0, 0, 0, 0.1)", "rgb(14, 11, 19)"]} style={{ flex: 1 }} />
        </ImageBackground>
      )}
      {color === 2 && (
        <View className={"w-full h-full absolute z-0 bg-slate-950"}>
          <LinearGradient colors={["rgba(0, 0, 0, 0.1)", "rgb(14, 11, 19)"]} style={{ flex: 1 }} />
        </View>
      )}
      {color === 3 && (
        <View className={"w-full h-full absolute z-0 bg-fuchsia-800"}>
          <LinearGradient colors={["rgba(0, 0, 0, 0.1)", "rgb(14, 11, 19)"]} style={{ flex: 1 }} />
        </View>
      )}
      <View className={"flex-1 p-4 mt-14 items-center"}>
        <Text className="text-4xl font-bold text-center text-fuchsia-600">SharePal</Text>
        <View className={"mb-5 justify-center items-center z-10"}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/original/${poster_path}` }}
            className="w-40 h-64 mt-4 bg-cGradient1 rounded-2xl"
            style={[
              color === 1 && { borderWidth: 1, borderColor: "rgb(241, 245, 249)" }, // Tailwind "slate-200" hex kodu
            ]}
          />
        </View>
        {label !== "" && (
          <View className="items-center justify-center w-full text-center">
            <Text className={"text-center text-lg text-white"}>
              {username}
              <Text className={"text-center text-fuchsia-600"}> {title} </Text>
            </Text>
            <Text className={"text-center text-lg text-white"}>
              <Text className={"text-center text-lg text-white"}>adlı {mediaType === "movie" ? "filmi " : "diziyi "}</Text>
              {label === "watched" && "izledi."}
              {label === "wanttowatch" && "izlemek istiyor."}
            </Text>
          </View>
        )}
        {label === "" && <Text className={"text-center text-lg text-fuchsia-600"}>{title}</Text>}
      </View>
      <View className="right-0 bottom-2">
        <Text
          style={{
            fontSize: 8,
          }}
          className={"text-fuchsia-900 px-2"}
        >
          sharepal.dev
        </Text>
      </View>
    </Animated.View>
  );
};

export default SearchDetailPageShareWantToWatch;
