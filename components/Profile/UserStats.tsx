import { RootState } from "@/store";
import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

const UserStats = () => {
  const profile = useSelector((state: RootState) => state.profile);
  return (
    <View className="flex-row items-center justify-center gap-4 py-4 mx-4 my-2 rounded-2xl bg-slate-900">
      <View className="items-center flex-1">
        <Text className="text-lg text-white">{profile.followers}</Text>
        <Text className="text-lg text-white">Followers</Text>
      </View>
      <View className="border-l-2 border-slate-700"></View>
      <View className="items-center flex-1">
        <Text className="text-lg text-white">{profile.following}</Text>
        <Text className="text-lg text-white">Following</Text>
      </View>
      <View className="border-l-2 border-slate-700"></View>
      <View className="items-center flex-1 mr-4">
        <Text className="text-lg text-fuchsia-600">#1</Text>
        <Text className="text-lg text-white">{profile.topOne}</Text>
      </View>
    </View>
  );
};

export default UserStats;
