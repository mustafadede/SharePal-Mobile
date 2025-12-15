import { Image } from "expo-image";
import React from "react";

const ImageComponent = ({ url }: { url: string }) => {
  return (
    <Image
      source={{ uri: url }}
      cachePolicy={"memory-disk"}
      contentFit="cover"
      transition={300}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 100,
      }}
    />
  );
};

export default ImageComponent;
