import React from "react";
import { Image, Pressable } from "react-native";

const NotificationSuggestionCard = () => {
  return (
    <Pressable
      className="h-24 rounded-2xl items-start  justify-center px-4 w-96 bg-cGradient1 mb-4"
      onPress={() => {
        console.log("pressed");
      }}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <Image
        src="https://avatars.githubusercontent.com/u/95627279?v=4"
        className="w-16 h-16 rounded-full bg-cGradient2"
      />
    </Pressable>
  );
};

export default NotificationSuggestionCard;
