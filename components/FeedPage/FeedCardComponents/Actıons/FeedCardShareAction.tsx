import { Colors } from "@/constants/Colors";
import { modalActions } from "@/store/modalSlice";
import Octicons from "@expo/vector-icons/Octicons";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import { useDispatch } from "react-redux";

const FeedCardShareAction = ({ data }) => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const handlePress = () => {
    dispatch(modalActions.updateModal({ modalProps: data }));
    router.push("/postshare");
  };
  return (
    <TouchableOpacity
      className={"flex-1 max-h-full py-2 justify-center items-center"}
      onPress={handlePress}
    >
      <Octicons
        name="rocket"
        size={17}
        color={colorScheme === "dark" ? Colors.dark.tColor1 : "black"}
        className={"ml-4"}
      />
    </TouchableOpacity>
  );
};

export default FeedCardShareAction;
