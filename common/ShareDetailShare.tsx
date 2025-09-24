import StatusLabel from "@/components/StatusLabel/StatusLabel";
import * as Sharing from "expo-sharing";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
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
  const colorScheme = useColorScheme();
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
    <View
      className={"flex-1 w-full h-full pt-10 z-50"}
      style={{
        backgroundColor: colorScheme === "dark" ? "#0E0B13" : "#cbd5e1",
      }}
    >
      <View className="items-center justify-center w-full h-full rounded-3xl">
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
        </View>
        {shareStatus === "done" && (
          <Animated.View
            entering={FadeInUp.duration(300).delay(300)}
            className="flex flex-row items-center justify-center gap-4"
            style={{
              position: "absolute",
              bottom: 80,
              paddingVertical: 10,
              paddingHorizontal: 16,
              backgroundColor: colorScheme === "dark" ? "#1E1B22" : "#f1f5f9",
              borderRadius: 20,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 3 },
              elevation: 3,
            }}
          >
            <TouchableOpacity onPress={() => setColor(0)}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${poster_path}`,
                }}
                className="rounded-full"
                style={{
                  width: 44,
                  height: 44,
                  borderWidth: color === 0 ? 2 : 1,
                  borderColor: color === 0 ? "#c026d3" : "rgb(148, 163, 184)",
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setColor(1)}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${backdrop_path}`,
                }}
                className="rounded-full"
                style={{
                  width: 44,
                  height: 44,
                  borderWidth: color === 1 ? 2 : 1,
                  borderColor: color === 1 ? "#c026d3" : "rgb(148, 163, 184)",
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setColor(2)}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: "#020617",
                  borderWidth: color === 2 ? 2 : 1,
                  borderColor: color === 2 ? "#c026d3" : "rgb(148, 163, 184)",
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setColor(3)}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: "#86198f",
                  borderWidth: color === 3 ? 2 : 1,
                  borderColor: color === 3 ? "#c026d3" : "rgb(148, 163, 184)",
                }}
              />
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Share button */}
        <Animated.View
          entering={FadeInUp.duration(300).delay(400)}
          style={{
            position: "absolute",
            bottom: 20,
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            onPress={handleShare}
            style={{
              paddingHorizontal: 32,
              paddingVertical: 12,
              borderRadius: 9999,
              borderWidth: 2,
              borderColor: colorScheme === "dark" ? "#fff" : "#000",
              backgroundColor: colorScheme === "dark" ? "#0E0B13" : "#f8fafc",
            }}
          >
            <Text
              className="text-md font-semibold"
              style={{
                color: colorScheme === "dark" ? "#fff" : "#0E0B13",
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
