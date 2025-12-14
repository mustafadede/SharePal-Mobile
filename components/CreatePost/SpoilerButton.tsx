import { RootState } from "@/store";
import { createPostsActions } from "@/store/createpostSlice";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const SpoilerButton = () => {
  const dispatch = useDispatch();
  const { createdPost } = useSelector((state: RootState) => state.createpost);
  const { t } = useTranslation();
  useEffect(() => {
    if (createdPost.spoiler) dispatch(createPostsActions.setSpoiler());
  }, []);
  return (
    <TouchableOpacity
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        dispatch(createPostsActions.setSpoiler());
      }}
      className={`flex-row items-center flex-1 py-3 px-5 rounded-xl ${
        createdPost.spoiler
          ? "bg-fuchsia-600 dark:bg-slate-600"
          : "bg-fuchsia-800 dark:bg-slate-800"
      }`}
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
      }}
    >
      <Feather
        name={createdPost.spoiler ? "lock" : "unlock"}
        size={18}
        color="white"
      />
      <Text className="ml-2 text-white font-medium">
        {t("createpost.spoiler")}
      </Text>
    </TouchableOpacity>
  );
};

export default SpoilerButton;
