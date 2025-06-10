import { Colors } from "@/constants/Colors";
import { Post } from "@/constants/Post";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import React from "react";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
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
  const colorScheme = useColorScheme();
  return (
    <View className={"flex-row items-center justify-around mt-4"}>
      <FeedCardLikeAction data={data} />
      <FeedCardCommentAction data={data} handleModal={handleModal} />
      <TouchableOpacity className={"flex flex-row items-center gap-2"}>
        <EvilIcons
          name="retweet"
          size={32}
          color={colorScheme === "dark" ? Colors.dark.tColor1 : "black"}
          className={"ml-4"}
        />
        <Text className={"text-black dark:text-slate-400"}>{data?.repost}</Text>
      </TouchableOpacity>
      <FeedCardShareAction data={data} handleModal={handleModal} />
    </View>
  );
};

export default FeedCardActions;
