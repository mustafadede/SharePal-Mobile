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
  console.log(poster_path);

  return (
    <Animated.View
      entering={FadeInUp.duration(300).delay(100)}
      className="items-center justify-center"
      style={{
        height: 640,
        width: 360,
        borderRadius: 28,
        overflow: "hidden",
      }}
    >
      {/* Backgrounds */}
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/original/${
            color === 0 ? poster_path : color === 1 ? backdrop_path : null
          }`,
          cache: "force-cache",
        }}
        className="w-full h-full absolute z-0 bg-slate-900"
        resizeMode="cover"
        blurRadius={6}
      >
        {colorScheme === "dark" ? (
          <LinearGradient
            colors={["rgba(0, 0, 0, 0.4)", "rgb(14, 11, 19)"]}
            style={{ flex: 1 }}
          />
        ) : (
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.3)", "rgb(245, 245, 245)"]}
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
      <View className="flex-1 px-6 pt-24 items-center">
        <Text
          className="font-semibold text-fuchsia-500"
          style={{ fontSize: 28, opacity: 0.9 }}
        >
          SharePal
        </Text>

        <View
          className="mt-6 mb-8 items-center justify-center"
          style={{
            padding: 6,
            borderRadius: 28,
            backgroundColor:
              colorScheme === "dark"
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.05)",
          }}
        >
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original/${poster_path}`,
              cache: "force-cache",
            }}
            className="w-44 h-72 rounded-3xl"
            resizeMode="cover"
            fadeDuration={0}
            style={{
              shadowColor: "#000",
              shadowOpacity: colorScheme === "dark" ? 0.26 : 0.18,
              shadowRadius: 22,
              shadowOffset: { width: 0, height: 12 },
            }}
          />
        </View>

        {label !== "" &&
          (i18n.language === "tr" ? (
            <View className="items-center justify-center w-full text-center">
              <Text className="text-center text-xl dark:text-white mt-2">
                {title}
              </Text>
              <Text className="text-center text-base font-normal text-slate-300 dark:text-slate-300">
                {username}{" "}
                <Text className="text-fuchsia-600">
                  {mediaType === "movie" ? "filmi" : "diziyi"}
                </Text>{" "}
                {label === "watched" && "izledi"}
                {label === "wanttowatch" && "izlemek istiyor"}
              </Text>
            </View>
          ) : (
            <View className="items-center justify-center w-full text-center">
              <Text className="text-center text-xl dark:text-white mt-2">
                {title}
              </Text>
              <Text className="text-center text-base font-normal text-slate-300 dark:text-slate-300">
                {username}
                {label === "watched" && " watched"}
                {label === "wanttowatch" && " wants to watch"}
              </Text>
            </View>
          ))}

        {label === "" && (
          <Text className="text-center text-xl text-white mt-2">{title}</Text>
        )}

        {label !== "" && (
          <View
            className="flex-row justif items-center"
            style={{
              position: "relative",
              top: 96,
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
            <Text className="ml-2 text-lg font-semibold text-slate-300">
              @{username}
            </Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
};

export default SearchDetailPageShareWantToWatch;
