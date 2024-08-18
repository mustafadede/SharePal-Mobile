import { Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";

const ExploreCollection = ({ photo, title }: { photo: string; title: string }) => {
  return (
    <TouchableOpacity className="flex flex-col items-center justify-center w-64 h-24 px-2 mb-1 overflow-hidden">
      <ImageBackground
        source={{
          uri: photo,
        }}
        className="w-full bg-cGradient1"
        style={{
          borderRadius: 14,
          height: "100%",
          overflow: "hidden",
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text className="text-xl font-bold text-center text-slate-200">{title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ExploreCollection;
