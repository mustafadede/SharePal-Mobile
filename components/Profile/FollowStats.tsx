import { RootState } from "@/store";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import StatusLabel from "../StatusLabel/StatusLabel";

const FollowStats = () => {
  const { t } = useTranslation();
  const profile = useSelector((state: RootState) => state.profile);
  return (
    <View className="py-2 flex flex-row justify-around my-2 bg-white dark:bg-slate-900 rounded-2xl h-20 border border-slate-200 dark:border-transparent">
      <TouchableOpacity className=" items-center h-full">
        <Text className="text-xl font-bold text-slate-700 dark:text-white">
          {t("profile.followers")}
        </Text>
        <Text className="text-lg text-slate-600 dark:text-slate-200">
          {profile ? profile.followers : <StatusLabel />}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="items-center h-full">
        <Text className="text-xl font-bold text-slate-700 dark:text-white">
          {t("profile.following")}
        </Text>
        <Text className="text-lg text-slate-600 dark:text-slate-200">
          {profile ? profile.following : <StatusLabel />}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FollowStats;
