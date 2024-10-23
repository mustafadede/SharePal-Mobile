import { Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Colors } from "@/constants/Colors";
import { RootState } from "@/store";
import Entypo from "@expo/vector-icons/Entypo";

const FeedCardLikeAction = ({ data }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { displayName } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    data?.likesList?.map((likedUser) => likedUser?.nick === displayName && setIsLiked(true));
  }, []);
  return (
    <TouchableOpacity className={"flex flex-row items-center gap-2"} onPress={() => setIsLiked(!isLiked)}>
      {!isLiked && <Entypo name={"heart-outlined"} size={24} color={Colors.dark.tColor1} />}
      {isLiked && <Entypo name={"heart"} size={24} color={Colors.dark.cFuc6} />}
      <Text className={isLiked ? "text-fuchsia-600" : "text-slate-400"}>{data?.likes}</Text>
    </TouchableOpacity>
  );
};

export default FeedCardLikeAction;
