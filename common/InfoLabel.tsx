import { View, Text } from "react-native";
import React from "react";

const InfoLabel = ({ status }: { status: string }) => {
  return (
    <View className="w-full py-2">
      <Text className="text-xl text-center text-slate-400">{status}</Text>
    </View>
  );
};

export default InfoLabel;
