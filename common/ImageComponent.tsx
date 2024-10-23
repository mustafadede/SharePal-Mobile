import { Image } from "react-native";
import React from "react";

const ImageComponent = ({ url }: { url: string }) => {
  return <Image source={{ uri: url }} className={`h-full w-full rounded-full`} />;
};

export default ImageComponent;
