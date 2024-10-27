import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Colors } from "@/constants/Colors";
import { useDispatch } from "react-redux";
import { modalActions } from "@/store/modalSlice";

const FeedCardShareAction = ({ data, handleModal }) => {
  const dispatch = useDispatch();
  const handlePress = () => {
    handleModal();
    dispatch(modalActions.updateModalType("feedcardshare"));
    dispatch(modalActions.updateModal({ modalProps: data }));
  };
  return (
    <TouchableOpacity className={"flex flex-row items-center gap-2"} onPress={handlePress}>
      <EvilIcons name="share-google" size={30} color={Colors.dark.tColor1} className={"ml-4"} />
    </TouchableOpacity>
  );
};

export default FeedCardShareAction;
