import React from "react";
import { Text } from "react-native";

const AppTitle = ({ title }: { title: string }) => {
  return (
    <Text className="mb-4 text-5xl z-20 font-bold text-fuchsia-600">
      {title}
    </Text>
  );
};
export default AppTitle;
