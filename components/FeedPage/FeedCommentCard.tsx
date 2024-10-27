import { View } from "react-native";
import React from "react";
import FeedCardHeader from "./FeedCardComponents/FeedCardHeader";
import FeedCardContent from "./FeedCardComponents/FeedCardContent";
import FeedCardActions from "./FeedCardComponents/FeedCardActions";
import { Post } from "@/constants/Post";

const FeedCommentCard = ({ data, index, handleModal }: { data: Post; index: number; handleModal: () => void }) => {
  return (
    <View className={"bg-slate-900 rounded-2xl p-4 h-fit w-full mb-4"}>
      <FeedCardHeader data={data} handleModal={handleModal} />
      <FeedCardContent data={data} />
      <FeedCardActions data={data} handleModal={handleModal} />
    </View>
  );
};

export default FeedCommentCard;
