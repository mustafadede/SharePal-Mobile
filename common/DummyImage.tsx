import { View, Text } from "react-native";
import React from "react";

const DummyImage = ({ wide }: { wide: number }) => {
  return <View className={`h-${wide} w-${wide} rounded-full bg-fuchsia-600`}></View>;
};

export default DummyImage;
