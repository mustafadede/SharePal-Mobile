import { Colors } from "@/constants/Colors";
import { RootState } from "@/store";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, useColorScheme } from "react-native";
import { useSelector } from "react-redux";

const FeedCardLikeAction = ({ data }) => {
  const colorScheme = useColorScheme();
  const [isLiked, setIsLiked] = useState(false);
  const { userId } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    data?.likesList?.map((likedUser) => {
      likedUser?.id === userId && setIsLiked(true);
    });
  }, []);
  return (
    <TouchableOpacity
      className={"flex flex-row flex-1 items-center justify-center gap-2"}
      onPress={() => setIsLiked(!isLiked)}
    >
      {!isLiked && (
        <Entypo
          name={"heart-outlined"}
          size={23}
          color={colorScheme === "dark" ? Colors.dark.tColor1 : "black"}
        />
      )}
      {isLiked && <Entypo name={"heart"} size={23} color={Colors.dark.cFuc6} />}
      <Text
        className={
          isLiked ? "text-fuchsia-600" : "text-black dark:text-slate-400"
        }
      >
        {data?.likes}
      </Text>
    </TouchableOpacity>
  );
};

export default FeedCardLikeAction;
