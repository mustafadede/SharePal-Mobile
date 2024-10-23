import { View } from "react-native";
import React from "react";
import FeedCardHeader from "./FeedCardComponents/FeedCardHeader";
import FeedCardContent from "./FeedCardComponents/FeedCardContent";
import FeedCardActions from "./FeedCardComponents/FeedCardActions";
import { Post } from "@/constants/Post";

const FeedCommentCard = ({ data, index }: { data: Post; index: number }) => {
  return (
    <View className={"bg-slate-900 rounded-2xl p-4 h-fit w-full mb-4"}>
      <FeedCardHeader data={data} />
      <FeedCardContent data={data} />
      <FeedCardActions data={data} />
    </View>
  );
};

export default FeedCommentCard;
