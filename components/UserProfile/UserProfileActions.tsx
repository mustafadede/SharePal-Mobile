import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const UserProfileActions = () => {
  return (
    <View className="flex-1 flex-row justify-around w-full gap-4 relative my-2">
      <TouchableOpacity className="bg-slate-600 px-14 py-2 rounded-2xl">
        <Text className="text-lg text-white text-center">Create List</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-slate-600 px-6 py-2 rounded-2xl">
        <Text className="text-lg text-white text-center">Suggest Movie/TV</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfileActions;
