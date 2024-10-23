import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const FeedCardCommentAction = ({ data }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className={"flex flex-row items-center gap-2"}
      onPress={() => {
        navigation.navigate("FeedDetail", { data: data });
      }}
    >
      <Ionicons name={"chatbox-outline"} size={21} color={Colors.dark.tColor1} className={"ml-4 text-slate-300"} />
      <Text className={"text-slate-400"}>{data?.comments}</Text>
    </TouchableOpacity>
  );
};

export default FeedCardCommentAction;
