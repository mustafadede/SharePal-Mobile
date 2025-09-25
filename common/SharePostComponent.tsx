import { Colors } from "@/constants/Colors";
import { RootState } from "@/store";
import { DateFormatter } from "@/utils/formatter";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { useSelector } from "react-redux";

type ModalPropsType = {
  modalProps: {
    modalProps: {
      content: string;
      attachedFilm: {
        poster: string;
        backdrop: string;
        mediaType: string;
        title: string;
        releaseDate: string;
        id: string;
      };
      photoURL: string;
      nick: string;
      date: number;
      spoiler: boolean;
    };
  }[];
};

const SharePostComponent = ({ switchValue }: { switchValue: boolean }) => {
  const colorScheme = useColorScheme();
  const modal = useSelector(
    (state: RootState) => state.modal
  ) as ModalPropsType | null;
  const contentLenght =
    modal && modal.modalProps[0] && modal.modalProps[0].modalProps.content
      ? String(modal.modalProps[0].modalProps.content).length
      : 0;

  const newYear = DateFormatter(modal?.modalProps[0].modalProps.date, "modal");
  return (
    <View
      style={{
        height: 640,
        width: 360,
        backgroundColor: Colors.dark.cGradient1,
        position: "relative",
      }}
    >
      {modal && (
        <ImageBackground
          source={
            modal
              ? {
                  uri: `https://image.tmdb.org/t/p/original/${modal.modalProps[0].modalProps.attachedFilm.poster}`,
                }
              : require("@/assets/images/react-logo.png")
          }
          className="w-full h-full absolute z-0 bg-slate-900"
          resizeMode="cover"
          blurRadius={7}
        >
          <LinearGradient
            colors={["rgba(0, 0, 0, 0.1)", "rgb(14, 11, 19)"]}
            style={{ flex: 1 }}
          />
        </ImageBackground>
      )}
      <View className="flex-1 p-4 mt-2 items-center">
        <Text className="font-bold text-fuchsia-600" style={{ fontSize: 42 }}>
          SharePal
        </Text>
        <View className="justify-center items-center z-10">
          <Image
            source={
              modal
                ? {
                    uri: `https://image.tmdb.org/t/p/original/${modal.modalProps[0].modalProps.attachedFilm.poster}`,
                  }
                : require("@/assets/images/react-logo.png")
            }
            className="w-40 h-64 mt-4 rounded-2xl"
            style={{ borderWidth: 1, borderColor: "rgb(241, 245, 249)" }}
          />
        </View>
        <Text className="text-fuchsia-600 text-xl mt-2 align-middle">
          {modal &&
            modal.modalProps &&
            modal.modalProps[0].modalProps.attachedFilm.title}
        </Text>
        <View className="absolute left-4 gap-2" style={{ bottom: 100 }}>
          {modal && modal.modalProps[0]?.modalProps.spoiler && switchValue ? (
            <View className="relative items-center justify-center">
              <Text
                className={`text-white ${
                  contentLenght > 187 ? "text-base" : "text-xl"
                } italic ${
                  modal.modalProps[0]?.modalProps.spoiler ? "px-3" : "px-0"
                }`}
              >
                "
                {modal && modal.modalProps[0]?.modalProps.content
                  ? modal.modalProps[0].modalProps.content.trim()
                  : ""}
                "
              </Text>
              <Text className="absolute z-10 text-white w-full text-center">
                Tap to reveal spoiler{" "}
                <Ionicons name="lock-closed-outline" size={24} color="white" />
              </Text>
              <View style={[StyleSheet.absoluteFill]} pointerEvents="none">
                <BlurView
                  intensity={Platform.OS === "android" ? 10 : 20}
                  tint={colorScheme === "dark" ? "dark" : "light"}
                  style={StyleSheet.absoluteFill}
                  experimentalBlurMethod="dimezisBlurView"
                />
              </View>
            </View>
          ) : (
            <Text
              className={`text-white text-left ${
                contentLenght > 187 ? "text-base" : "text-xl"
              } italic`}
            >
              "
              {modal && modal.modalProps[0]?.modalProps.content
                ? modal.modalProps[0].modalProps.content.trim()
                : ""}
              "
            </Text>
          )}
        </View>

        <View
          className="flex-row items-center absolute"
          style={{ bottom: 48, left: 12 }}
        >
          <Image
            className="rounded-full"
            source={
              modal
                ? { uri: `${modal.modalProps[0].modalProps.photoURL}` }
                : require("@/assets/images/react-logo.png")
            }
            style={{ width: 42, height: 42 }}
          />
          <View className="flex-col ml-2">
            <Text className="text-lg text-white">
              @
              {modal &&
                modal.modalProps &&
                modal &&
                modal.modalProps[0].modalProps.nick}
            </Text>
            <Text className={"text-xs text-slate-600 dark:text-slate-400"}>
              {newYear}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SharePostComponent;
