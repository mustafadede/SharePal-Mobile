import React from "react";
import { View } from "react-native";

const DummyImage = ({ wide = "100" }: { wide: number | string }) => {
  return (
    <View
      style={{
        width: wide as number | string,
        height: wide as number | string,
      }}
      className="rounded-full bg-fuchsia-600"
    />
  );
};

export default DummyImage;
