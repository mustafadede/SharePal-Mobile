import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import FeedCardLikeAction from "./Actıons/FeedCardLikeAction";
import FeedCardCommentAction from "./Actıons/FeedCardCommentAction";
import { Colors } from "@/constants/Colors";
import { Post } from "@/constants/Post";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const FeedCardActions = ({ data }: { data: Post }) => {
  return (
    <View className={"flex-row items-center justify-around mt-4"}>
      <FeedCardLikeAction data={data} />
      <FeedCardCommentAction data={data} />
      <TouchableOpacity className={"flex flex-row items-center gap-2"}>
        <EvilIcons name="retweet" size={32} color={Colors.dark.tColor1} className={"ml-4"} />
        <Text className={"text-slate-400"}>{data?.repost}</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity className={'flex flex-row items-center gap-2'}>
        <AntDesign
          name={'rocket1'}
          size={21}
          color={colorPalette.cSlate500}
          className={'ml-4 text-slate-300'}
        />
      </TouchableOpacity> */}
    </View>
  );
};

export default FeedCardActions;
