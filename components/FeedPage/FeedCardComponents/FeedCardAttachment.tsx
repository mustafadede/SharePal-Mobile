import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImageComponent from "@/common/ImageComponent";
import DummyImage from "@/common/DummyImage";
import { JustYearFormatter } from "@/utils/formatter";
import { router } from "expo-router";
import { PostAttachment } from "@/constants/Post";

const FeedCardAttachment = ({ attachedData }: { attachedData: PostAttachment }) => {
  const newDate = JustYearFormatter(attachedData?.releaseDate);

  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/searchdetail",
          params: {
            id: attachedData.id,
            backdrop_path: attachedData.backdrop,
            title: attachedData.title,
            release_date: attachedData.releaseDate,
            poster_path: attachedData.poster,
            mediaType: attachedData.mediaType,
          },
        });
      }}
      className={"flex-row py-2 px-4 rounded-2xl items-center bg-slate-800"}
    >
      <View className={"w-12 h-12 rounded-full bg-slate-800"}>
        {attachedData?.poster ? (
          <ImageComponent url={`https://image.tmdb.org/t/p/original${attachedData?.poster}`} />
        ) : (
          <DummyImage wide={12} />
        )}
      </View>
      <View className={"flex-row items-center ml-2"}>
        <Text className={"text-white"}>
          {attachedData?.title.length > 24 ? attachedData?.title.slice(0, 24) + "..." : attachedData?.title}
        </Text>
        <Text className={"text-slate-400 ml-1"}>({newDate})</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FeedCardAttachment;
