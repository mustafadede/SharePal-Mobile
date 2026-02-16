import React from "react";
import { View } from "react-native";

const DummyImage = ({
  wide = "100",
}: {
  wide: number | string;
  user?: false;
}) => {
  return (
    <View
      style={{
        width: wide as number,
        height: wide as number,
      }}
      className="rounded-full bg-fuchsia-600"
    />
  );
};

export default DummyImage;
