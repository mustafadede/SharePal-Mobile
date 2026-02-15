import { RootState } from "@/store";
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

const DummyImage = ({
  wide = "100",
  user,
}: {
  wide: number | string;
  user?: false;
}) => {
  const otherProfile = useSelector((state: RootState) => state.userProfile);
  const yourProfile = useSelector((state: RootState) => state.profile);
  const profile = user ? otherProfile : yourProfile;
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
