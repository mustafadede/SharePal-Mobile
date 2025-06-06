import StatusLabel from "@/components/StatusLabel/StatusLabel";
import * as Sharing from "expo-sharing";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import ViewShot, { captureRef } from "react-native-view-shot";
import SearchDetailPageShareWantToWatch from "./SearchDetailPageShare";

type ShareDetailShareProps = {
  viewRef: React.RefObject<any>;
  nick: string;
  shareStatus: "done" | "loading" | string;
  title: string;
  mediaType: string;
  backdrop_path: string;
  poster_path: string;
  color: number;
  setColor: (color: number) => void;
  blur: number;
  setBlur: (blur: number) => void;
};

const captureShot = (
  ref: React.RefObject<any>,
  handleShare: () => void,
  shareStatus: "done" | "loading" | string,
  username: string,
  title: string | string[],
  mediaType: string | string[],
  backdrop_path: string | string[],
  poster_path: string | string[],
  color: number
) => {
  return (
    <ViewShot
      ref={ref}
      options={{ format: "png", quality: 1 }}
      onCapture={handleShare}
    >
      {shareStatus === "done" ? (
        <SearchDetailPageShareWantToWatch
          backdrop_path={backdrop_path}
          poster_path={poster_path}
          title={title}
          username={username}
          mediaType={mediaType}
          color={color}
        />
      ) : (
        <StatusLabel />
      )}
    </ViewShot>
  );
};

const ShareDetailShare = ({
  viewRef,
  nick,
  shareStatus,
  title,
  mediaType,
  backdrop_path,
  poster_path,
  color,
  setColor,
  blur,
  setBlur,
}: ShareDetailShareProps) => {
  const { t } = useTranslation();
  const [border, setBorder] = useState(false);
  const handleShare = async () => {
    try {
      if (viewRef.current) {
        const uri = await captureRef(viewRef, {
          format: "png",
          result: "tmpfile",
        });

        const isAvailable = await Sharing.isAvailableAsync();

        if (isAvailable) {
          await Sharing.shareAsync(uri, {
            mimeType: "image/png",
            dialogTitle: "Share your content",
          });
        } else {
          console.log("Sharing not available");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className={"flex-1 w-full h-full pt-10 z-50 bg-cGradient2"}>
      <View className="items-center justify-center w-full h-full mt-2 rounded-3xl">
        <View className="relative">
          {captureShot(
            viewRef,
            handleShare,
            shareStatus,
            nick,
            title,
            mediaType,
            backdrop_path,
            poster_path,
            color
          )}
          {shareStatus === "done" && (
            <Animated.View
              entering={FadeInUp.duration(300).delay(200)}
              style={{
                width: 360,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <TouchableOpacity
                className="absolute h-fit rounded-full w-fit px-6 py-1"
                style={{
                  backgroundColor: "rgb(192 38 211)",
                  bottom: 64,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text className="text-lg  text-white">Add border</Text>
              </TouchableOpacity> */}
            </Animated.View>
          )}
          {shareStatus === "done" && (
            <Animated.View
              entering={FadeInUp.duration(300).delay(300)}
              className="absolute flex flex-row justify-center items-center gap-4 mb-2 bottom-0"
              style={{
                width: 360,
              }}
            >
              <TouchableOpacity onPress={() => setColor(0)}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/original/${poster_path}`,
                  }}
                  className="w-8 h-8 rounded-full"
                  resizeMode="cover"
                  style={{
                    borderWidth: 1,
                    borderColor: "rgb(148, 163, 184)",
                    width: 36,
                    height: 36,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setColor(1)}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/original/${backdrop_path}`,
                  }}
                  className="w-8 h-8 rounded-full"
                  resizeMode="cover"
                  style={{
                    borderWidth: 1,
                    borderColor: "rgb(148, 163, 184)",
                    width: 36,
                    height: 36,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setColor(2)}>
                <View
                  className="border border-slate-300 bg-slate-950"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "100%",
                    backgroundColor: "#020617",
                  }}
                ></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setColor(3)}>
                <View
                  className="border border-slate-300"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "100%",
                    backgroundColor: "#86198f",
                  }}
                ></View>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
        <Animated.View entering={FadeInUp.duration(300).delay(400)}>
          <TouchableOpacity onPress={handleShare} className="mt-4 rounded-3xl">
            <Text
              className="px-8 py-1 text-lg text-white border border-white rounded-full"
              style={{
                borderColor: "white",
              }}
            >
              {t("searchdetail.share")}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default ShareDetailShare;
