import StatusLabel from "@/components/StatusLabel/StatusLabel";
import * as Sharing from "expo-sharing";
import React from "react";
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
}: ShareDetailShareProps) => {
  const { t } = useTranslation();
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
      className="flex-1 w-full items-center justify-center"
      style={{
        backgroundColor: colorScheme === "dark" ? "#0E0B13" : "#F8FAFC",
        paddingTop: 20,
      }}
    >
      <ViewShot
        ref={viewRef}
        options={{ format: "png", quality: 1 }}
        style={{
          width: 360,
          height: 640,
          borderRadius: 28,
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        {shareStatus === "done" ? (
          <SearchDetailPageShareWantToWatch
            backdrop_path={backdrop_path}
            poster_path={poster_path}
            title={title}
            username={nick}
            mediaType={mediaType}
            color={color}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <StatusLabel />
          </View>
        )}
      </ViewShot>

      {shareStatus === "done" && (
        <Animated.View
          entering={FadeInUp.duration(300).delay(200)}
          className={"border border-slate-400"}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 999,
            backgroundColor:
              colorScheme === "dark"
                ? "rgba(30,27,34,0.85)"
                : "rgba(241,245,249,0.9)",
            flexDirection: "row",
            borderWidth: 0.5,
            gap: 12,
            position: "relative",
            top: -20,
          }}
        >
          <TouchableOpacity onPress={() => setColor(0)}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original/${poster_path}`,
              }}
              resizeMode="cover"
              fadeDuration={0}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                borderWidth: color === 0 ? 2 : 1,
                borderColor: color === 0 ? "#d946ef" : "rgba(148,163,184,0.6)",
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setColor(1)}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original/${backdrop_path}`,
              }}
              resizeMode="cover"
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                borderWidth: color === 1 ? 2 : 1,
                borderColor: color === 1 ? "#d946ef" : "rgba(148,163,184,0.6)",
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setColor(2)}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: "#020617",
                borderWidth: color === 2 ? 2 : 1,
                borderColor: color === 2 ? "#d946ef" : "rgba(148,163,184,0.6)",
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setColor(3)}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: "#86198f",
                borderWidth: color === 3 ? 2 : 1,
                borderColor: color === 3 ? "#d946ef" : "rgba(148,163,184,0.6)",
              }}
            />
          </TouchableOpacity>
        </Animated.View>
      )}

      <Animated.View entering={FadeInUp.duration(300).delay(400)}>
        <TouchableOpacity
          onPress={handleShare}
          style={{
            paddingHorizontal: 40,
            paddingVertical: 14,
            borderRadius: 999,
            borderWidth: 1.5,
            borderColor: colorScheme === "dark" ? "#fff" : "#020617",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: colorScheme === "dark" ? "#fff" : "#020617",
            }}
          >
            {t("searchdetail.share")}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default ShareDetailShare;
