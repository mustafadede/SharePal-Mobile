import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import Animated, { FadeInUp } from "react-native-reanimated";
import * as Sharing from "expo-sharing";
import ViewShot, { captureRef } from "react-native-view-shot";
import SearchDetailPageShareWantToWatch from "./SearchDetailPageShare";
import StatusLabel from "@/components/StatusLabel/StatusLabel";

const captureShot = (ref, handleShare, shareStatus, username, title, mediaType, backdrop_path, poster_path, color) => {
  return (
    <ViewShot ref={ref} options={{ format: "png", quality: 1 }} onCapture={handleShare}>
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

const ShareDetailShare = ({ viewRef, nick, shareStatus, title, mediaType, backdrop_path, poster_path, color, setColor, blur, setBlur }) => {
  const handleShare = async () => {
    try {
      if (viewRef.current) {
        const uri = await captureRef(viewRef, {
          format: "png",
          quality: 1,
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
    <View className={"bg-slate-950 flex-1 w-full h-full pt-10 z-50"}>
      <View className="items-center justify-center w-full h-full mt-2 rounded-3xl">
        <View className="relative">
          {captureShot(viewRef, handleShare, shareStatus, nick, title, mediaType, backdrop_path, poster_path, color)}

          {shareStatus === "done" && (
            <Animated.View entering={FadeInUp.duration(300).delay(300)} className="absolute flex-row gap-2 my-2 bottom-1 right-3">
              <TouchableOpacity onPress={() => setColor(0)}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/original/${poster_path}` }}
                  className="w-8 h-8 rounded-full"
                  resizeMode="cover"
                  style={{ borderWidth: 1, borderColor: "rgb(148, 163, 184)" }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setColor(1)}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/original/${backdrop_path}` }}
                  className="w-8 h-8 rounded-full"
                  resizeMode="cover"
                  style={{ borderWidth: 1, borderColor: "rgb(148, 163, 184)" }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setColor(2)}>
                <View className="w-8 h-8 border rounded-full border-slate-400 bg-slate-950"></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setColor(3)}>
                <View className="w-8 h-8 border rounded-full border-slate-400 bg-fuchsia-800"></View>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
        <Animated.View entering={FadeInUp.duration(300).delay(400)}>
          <TouchableOpacity onPress={handleShare} className="mt-4">
            <Text className="px-4 py-1 text-lg text-white border border-white rounded-xl">Share</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default ShareDetailShare;
