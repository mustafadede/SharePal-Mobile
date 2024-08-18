import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";

const ExploreBottomSheet = ({ bootomSheetValues }: { bootomSheetValues: object }) => {
  return (
    <>
      <Text className="text-lg text-center text-white">{bootomSheetValues?.title}</Text>
      <View className="flex flex-row items-center justify-center mt-3">
        <TouchableOpacity className="flex items-center justify-center p-2 mr-2 rounded-lg bg-cGradient1">
          <FontAwesome name="bookmark-o" size={30} color="white" />
          <Text className="mt-2 text-md text-slate-200">Want to Watch</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center justify-center p-2 mr-2 rounded-lg bg-cGradient1">
          <FontAwesome name="bookmark" size={30} color="white" />
          <Text className="mt-2 text-md text-slate-200">Watch</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center justify-center p-2 rounded-lg bg-cGradient1">
          <AntDesign name="eyeo" size={30} color="white" />
          <Text className="mt-2 text-md text-slate-200">Currently Watching</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ExploreBottomSheet;