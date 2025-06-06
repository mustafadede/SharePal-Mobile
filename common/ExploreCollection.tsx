import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, Text, TouchableOpacity } from "react-native";

const ExploreCollection = ({
  photo,
  title,
}: {
  photo: string;
  title: string;
}) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="flex flex-col items-center justify-center w-64 h-24 my-1 overflow-hidden"
      style={{
        paddingHorizontal: 2,
        marginHorizontal: 4,
      }}
      onPress={() => {
        router.push({
          pathname: "/collection",
          params: {
            dir: title,
          },
        });
      }}
    >
      <ImageBackground
        source={{
          uri: photo,
        }}
        className="w-full bg-cGradient1"
        style={{
          borderRadius: 14,
          height: "100%",
          width: 220,
          overflow: "hidden",
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text className="text-xl w-full font-bold text-center text-slate-200">
          {title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ExploreCollection;
