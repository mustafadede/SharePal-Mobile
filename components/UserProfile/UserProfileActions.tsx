import { RootState } from "@/store";
import { navigate } from "expo-router/build/global-state/routing";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

const UserProfileActions = ({ userId }: { userId: string }) => {
  const { t } = useTranslation();
  const profile = useSelector((state: RootState) => state.profile);
  const [hasFollow, setHasFollow] = useState(false);
  useEffect(() => {
    profile.followingList.forEach((item: { date: string; uid: string }) => {
      if (item.uid === userId) {
        setHasFollow(true);
      }
    });
  }, []);
  return (
    <View className="flex-row w-full gap-2 my-2">
      <TouchableOpacity
        onPress={() => {}}
        className={
          hasFollow
            ? "bg-slate-900 flex-1 py-2 rounded-2xl"
            : "bg-fuchsia-600 flex-1 py-2 rounded-2xl"
        }
      >
        <Text className="text-lg text-white text-center">
          {hasFollow ? t("profile.unfollow") : t("profile.follow")}
        </Text>
      </TouchableOpacity>
      {hasFollow && (
        <TouchableOpacity
          onPress={() => navigate("/userprofile/usersuggest")}
          className="bg-slate-600 flex-1 py-2 rounded-2xl"
        >
          <Text className="text-lg text-white text-center">
            {t("profile.suggest")}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UserProfileActions;
