import { RootState } from "@/store";
import { DateFormatter } from "@/utils/formatter";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
import DummyImage from "./DummyImage";

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
  const [lockChange, setLockChange] = useState(0);
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const modal = useSelector(
    (state: RootState) => state.modal
  ) as ModalPropsType | null;

  const newYear =
    modal && DateFormatter(modal?.modalProps[0].modalProps.date, "modal");
  const content =
    modal && modal.modalProps[0]?.modalProps?.content
      ? modal.modalProps[0].modalProps.content.trim()
      : "";
  const contentLines = content.split("\n").length;
  const isLongContent = contentLines > 5;

  return (
    modal &&
    modal.modalProps[0] && (
      <View
        className="mb-4"
        style={{
          height: 640,
          width: 360,
          position: "relative",
          borderRadius: 28,
          overflow: "hidden",
          backgroundColor: colorScheme === "dark" ? "#0E0B13" : "#f8fafc",
        }}
      >
        {modal && modal.modalProps[0].modalProps.attachedFilm ? (
          <ImageBackground
            source={{
              uri: modal.modalProps[0].modalProps.attachedFilm
                ? `https://image.tmdb.org/t/p/original/${modal.modalProps[0].modalProps.attachedFilm.poster}`
                : undefined,
              cache: "force-cache",
            }}
            className="w-full h-full absolute z-0 bg-slate-900"
            resizeMode="cover"
            blurRadius={6}
          >
            <View style={[StyleSheet.absoluteFill]} pointerEvents="none">
              <BlurView
                intensity={Platform.OS === "android" ? 12 : 18}
                tint={colorScheme === "dark" ? "dark" : "light"}
                style={[
                  StyleSheet.absoluteFill,
                  {
                    backgroundColor:
                      colorScheme === "dark"
                        ? "rgba(0,0,0,0.25)"
                        : "rgba(255,255,255,0.35)",
                  },
                ]}
                experimentalBlurMethod="dimezisBlurView"
              />
            </View>
            <LinearGradient
              colors={
                colorScheme === "dark"
                  ? ["rgba(0,0,0,0.30)", "rgba(0,0,0,0.9)", "rgba(0,0,0,0.9)"]
                  : [
                      "rgba(255,255,255,0.00)",
                      "rgba(255,255,255,1)",
                      "rgba(255,255,255,0.9)",
                    ]
              }
              locations={[0, 0.6, 1]}
              style={StyleSheet.absoluteFill}
            />
          </ImageBackground>
        ) : null}
        <View className="flex-1 px-6 items-center" style={{ paddingTop: 7 }}>
          <View className="items-center">
            <Text
              className="font-semibold text-fuchsia-600"
              style={{ fontSize: 48 }}
            >
              SharePal
            </Text>
            <View
              className="mt-6 mb-8"
              style={{
                padding: 4,
                borderRadius: 16,
                backgroundColor:
                  colorScheme === "dark"
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.05)",
              }}
            >
              {modal.modalProps[0]?.modalProps?.attachedFilm?.poster ? (
                <View>
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/original/${modal.modalProps[0].modalProps.attachedFilm.poster}`,
                      cache: "force-cache",
                    }}
                    className="rounded-xl"
                    resizeMode="cover"
                    fadeDuration={0}
                    style={{
                      width: 160,
                      height: 256,
                      shadowColor: "#000",
                      shadowOpacity: colorScheme === "dark" ? 0.26 : 0.18,
                      shadowRadius: 48,
                      shadowOffset: { width: 0, height: 12 },
                    }}
                  />
                  {isLongContent && (
                    <View
                      style={{
                        marginTop: 8,
                        maxWidth: 160,
                      }}
                    >
                      <Text
                        className="text-white text-base italic"
                        style={{ textAlign: "center" }}
                      >
                        "{content}"
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <View
                  className="rounded-xl bg-transparent"
                  style={{
                    width: 0,
                    height: 0,
                    shadowColor: "#000",
                    shadowOpacity: colorScheme === "dark" ? 0.26 : 0.18,
                    shadowRadius: 48,
                    shadowOffset: { width: 0, height: 12 },
                  }}
                />
              )}
            </View>
            <Text
              style={{
                zIndex: 20,
              }}
              className="dark:text-white text-xl mt-2 text-center"
            >
              {modal?.modalProps?.[0]?.modalProps?.attachedFilm?.title || ""}
            </Text>
          </View>
          <View className="absolute left-4 gap-2" style={{ bottom: 100 }}>
            {!isLongContent ? (
              modal &&
              modal.modalProps[0]?.modalProps.spoiler &&
              switchValue ? (
                <View
                  style={{ top: 16 }}
                  className="relative items-center justify-center"
                >
                  <Text
                    className={`text-slate-300 dark:text-white text-base italic ${
                      modal.modalProps[0]?.modalProps.spoiler ? "px-2" : "px-0"
                    }`}
                  >
                    "{content}"
                  </Text>
                  <Text
                    className="absolute z-10 text-black dark:text-white w-full text-center"
                    onPress={() => setLockChange(lockChange == 0 ? 1 : 0)}
                  >
                    {lockChange == 0 && t("share.taptoreveal") + " "}
                    <Ionicons
                      name="lock-closed-outline"
                      size={24}
                      color={colorScheme === "dark" ? "white" : "black"}
                    />
                  </Text>
                  <View style={[StyleSheet.absoluteFill]} pointerEvents="none">
                    <BlurView
                      intensity={Platform.OS === "android" ? 12 : 18}
                      tint={colorScheme === "dark" ? "dark" : "light"}
                      style={[
                        StyleSheet.absoluteFill,
                        {
                          height: "100%",
                          backgroundColor:
                            colorScheme === "dark"
                              ? "rgba(0,0,0,0.25)"
                              : "rgba(255,255,255,0.35)",
                        },
                      ]}
                      experimentalBlurMethod="dimezisBlurView"
                    />
                  </View>
                </View>
              ) : (
                <Text
                  className={`text-slate-300 dark:text-white text-left text-base italic`}
                >
                  "{content}"
                </Text>
              )
            ) : null}
          </View>
          <View
            className="flex-row items-center absolute"
            style={{ bottom: 32, left: 12 }}
          >
            {modal.modalProps[0].modalProps.photoURL ? (
              <Image
                className="rounded-full"
                source={
                  modal
                    ? { uri: `${modal.modalProps[0].modalProps.photoURL}` }
                    : require("@/assets/images/react-logo.png")
                }
                style={{
                  width: 42,
                  height: 42,
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.2)",
                }}
              />
            ) : (
              <DummyImage wide={42} />
            )}
            <View className="flex-col ml-2">
              <Text className="text-lg text-slate-300 dark:text-slate-200">
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
    )
  );
};

export default SharePostComponent;
