import { Colors } from "@/constants/Colors";
import { modalActions } from "@/store/modalSlice";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import React from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import { useDispatch } from "react-redux";

const FeedCardShareAction = ({ data, handleModal }) => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const handlePress = () => {
    handleModal();
    dispatch(modalActions.updateModalType("feedcardshare"));
    dispatch(modalActions.updateModal({ modalProps: data }));
  };
  return (
    <TouchableOpacity
      className={"flex flex-row items-center gap-2"}
      onPress={handlePress}
    >
      <EvilIcons
        name="share-google"
        size={30}
        color={colorScheme === "dark" ? Colors.dark.tColor1 : "black"}
        className={"ml-4"}
      />
    </TouchableOpacity>
  );
};

export default FeedCardShareAction;
