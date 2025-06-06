import { Colors } from "@/constants/Colors";
import { Post } from "@/constants/Post";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FeedCardCommentAction from "./Actıons/FeedCardCommentAction";
import FeedCardLikeAction from "./Actıons/FeedCardLikeAction";
import FeedCardShareAction from "./Actıons/FeedCardShareAction";

const FeedCardActions = ({
  data,
  handleModal,
}: {
  data: Post;
  handleModal: () => void;
}) => {
  return (
    <View className={"flex-row items-center justify-around mt-4"}>
      <FeedCardLikeAction data={data} />
      <FeedCardCommentAction data={data} handleModal={handleModal} />
      <TouchableOpacity className={"flex flex-row items-center gap-2"}>
        <EvilIcons
          name="retweet"
          size={32}
          color={Colors.dark.tColor1}
          className={"ml-4"}
        />
        <Text className={"text-slate-400"}>{data?.repost}</Text>
      </TouchableOpacity>
      <FeedCardShareAction data={data} handleModal={handleModal} />
    </View>
  );
};

export default FeedCardActions;
