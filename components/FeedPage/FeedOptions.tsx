import { deleteSelectedPost } from "@/services/firebaseActions";
import { postsActions } from "@/store/postSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Animated, Text, TouchableOpacity, useColorScheme } from "react-native";
import { useDispatch } from "react-redux";

const FeedOptions = ({ postId }: { postId: string }) => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleDelete = () => {
    fadeOut();
    deleteSelectedPost(postId);
    dispatch(postsActions.removePost(postId));
  };

  return (
    <Animated.View
      style={{ opacity: fadeAnim }}
      className={
        "dark:bg-slate-900 flex-row gap-4 bg-white border dark:border-slate-800 border-slate-200 rounded-2xl h-fit w-full mb-4"
      }
    >
      <TouchableOpacity className="flex-1 flex-row gap-2 h-fit py-2 items-center justify-center rounded-2xl">
        <Octicons
          name="pencil"
          size={18}
          color={colorScheme === "dark" ? "white" : "black"}
        />
        <Text className="text-black dark:text-white">{t("actions.edit")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleDelete}
        className="flex-1 flex-row gap-2 h-fit py-2 items-center justify-center rounded-r-2xl bg-red-600"
      >
        <Ionicons name="trash-outline" size={18} color="white" />
        <Text className="text-white">{t("actions.delete")}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default FeedOptions;
