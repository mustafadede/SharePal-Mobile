import { View, Text, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const ImageComponent = () => {
  return (
    <>
      <Image
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/sharepal-5d528.appspot.com/o/sharepal%2FDesktop%20-%201%20(1).jpg?alt=media&token=f2720dd8-959f-4776-82fc-ba3f73395fe0",
        }}
        className="absolute top-0 left-0 right-0 z-0 w-full h-64"
      />
      <LinearGradient
        colors={["rgb(14, 11, 19)", "transparent"]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 256,
          zIndex: 1,
        }}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
      />
    </>
  );
};

export default ImageComponent;
