import { RootState } from "@/store";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  ImageBackground,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useSelector } from "react-redux";

const SearchDetailPageShareWantToWatch = ({
  backdrop_path,
  poster_path,
  title,
  mediaType,
  username,
  color,
}: {
  backdrop_path: string;
  poster_path: string;
  title: string;
  mediaType: string;
  username: string;
  color: number;
}) => {
  const { i18n } = useTranslation();
  const profile = useSelector((state: RootState) => state.profile);
  const { label } = useSelector((state: RootState) => state.shareSearchDetail);
  const colorScheme = useColorScheme();

  return (
    <Animated.View
      entering={FadeInUp.duration(300).delay(100)}
      className="items-center justify-center"
      style={{
        height: 640,
        width: 360,
      }}
    >
      {/* Backgrounds */}
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/original/${
            color === 0 ? poster_path : color === 1 ? backdrop_path : null
          }`,
        }}
        className="w-full h-full absolute z-0 bg-slate-900"
        resizeMode="cover"
        blurRadius={7}
      >
        {colorScheme === "dark" ? (
          <LinearGradient
            colors={["rgba(0, 0, 0, 0.4)", "rgb(14, 11, 19)"]}
            style={{ flex: 1 }}
          />
        ) : (
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.6)", "rgb(245, 245, 245)"]}
            style={{ flex: 1 }}
          />
        )}
      </ImageBackground>
      {color === 2 && (
        <View className="w-full h-full absolute z-0 bg-slate-950">
          <LinearGradient
            colors={["rgba(0, 0, 0, 0.1)", "rgb(14, 11, 19)"]}
            style={{ flex: 1 }}
          />
        </View>
      )}
      {color === 3 && (
        <View
          className="w-full h-full absolute z-0"
          style={{ backgroundColor: "#86198f" }}
        >
          <LinearGradient
            colors={["rgba(0, 0, 0, 0.1)", "rgb(14, 11, 19)"]}
            style={{ flex: 1 }}
          />
        </View>
      )}

      {/* Content */}
      <View className="flex-1 p-4 mt-20 items-center">
        <Text
          className="font-bold text-fuchsia-600"
          style={{ fontSize: 42, marginTop: 24 }}
        >
          SharePal
        </Text>

        <View className="mb-6 justify-center items-center z-10">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original/${poster_path}`,
            }}
            className="w-40 h-64 mt-4 rounded-2xl shadow-lg"
          />
        </View>

        {label !== "" &&
          (i18n.language === "tr" ? (
            <View className="items-center justify-center w-full text-center">
              <Text className="text-center text-2xl mt-4 text-white">
                {username}
                <Text className="text-center text-fuchsia-600"> {title} </Text>
              </Text>
              <Text className="text-center text-2xl text-slate-700 dark:text-white">
                adlı {mediaType === "movie" ? "filmi " : "diziyi "}
                {label === "watched" && "izledi"}
                {label === "wanttowatch" && "izlemek istiyor"}
              </Text>
            </View>
          ) : (
            <Text className="text-center text-2xl mt-4 text-slate-700 dark:text-white">
              {username}
              {label === "watched" && " watched"}
              {label === "wanttowatch" && " wants to watch"}
              <Text className="text-center text-fuchsia-600"> {title} </Text>
            </Text>
          ))}

        {label === "" && (
          <Text className="text-center text-lg text-white">{title}</Text>
        )}

        {label !== "" && (
          <View
            className="flex-row items-center"
            style={{
              position: "relative",
              top: 140,
            }}
          >
            <Image
              className="rounded-full"
              source={
                profile.photoURL
                  ? { uri: `${profile.photoURL}` }
                  : require("@/assets/images/react-logo.png")
              }
              style={{ width: 42, height: 42 }}
            />
            <Text className="ml-2 text-lg font-semibold text-slate-700 dark:text-white">
              @{username}
            </Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
};

export default SearchDetailPageShareWantToWatch;
