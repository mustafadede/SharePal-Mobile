import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, useColorScheme } from "react-native";

const FeedCardCommentAction = ({ data, postPage }) => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const handleModalState = () => {
    !postPage &&
      router.push({
        pathname: "/post/[id]",
        params: {
          id: data.postId,
          userId: data.userId,
        },
      });
  };

  return (
    <TouchableOpacity
      className={"flex flex-row items-center gap-2"}
      onPress={handleModalState}
    >
      <Ionicons
        name={"chatbox-outline"}
        size={21}
        color={colorScheme === "dark" ? Colors.dark.tColor1 : "black"}
        className={"ml-4"}
      />
      <Text className={"text-black dark:text-slate-400"}>{data?.comments}</Text>
    </TouchableOpacity>
  );
};

export default FeedCardCommentAction;
