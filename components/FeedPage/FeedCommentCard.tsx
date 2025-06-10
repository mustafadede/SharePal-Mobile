import { Post } from "@/constants/Post";
import React from "react";
import { View } from "react-native";
import FeedCardActions from "./FeedCardComponents/FeedCardActions";
import FeedCardContent from "./FeedCardComponents/FeedCardContent";
import FeedCardHeader from "./FeedCardComponents/FeedCardHeader";

const FeedCommentCard = ({
  data,
  index,
  handleModal,
}: {
  data: Post;
  index: number;
  handleModal: () => void;
}) => {
  return (
    <View
      className={
        "dark:bg-slate-900 bg-slate-200 rounded-xl p-4 h-fit w-full mb-4"
      }
    >
      <FeedCardHeader data={data} handleModal={handleModal} />
      <FeedCardContent data={data} />
      <FeedCardActions data={data} handleModal={handleModal} />
    </View>
  );
};

export default FeedCommentCard;
