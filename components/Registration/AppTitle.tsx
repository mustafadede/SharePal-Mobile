import { View, Text } from "react-native";
import React from "react";

const AppTitle = ({ title }: { title: string }) => {
  return <Text className="mb-4 text-5xl font-bold text-fuchsia-600">{title}</Text>;
};
export default AppTitle;
