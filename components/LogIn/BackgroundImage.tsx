import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, useColorScheme } from "react-native";

const BackgroundImage = () => {
  const colorScheme = useColorScheme();
  return (
    <>
      <Image
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/sharepal-5d528.appspot.com/o/sharepal%2FDesktop%20-%201%20(1).png?alt=media&token=78b8d741-7575-484c-9def-e44a242fb683",
        }}
        className="absolute top-0 left-0 right-0 z-0 w-full h-96"
        onError={(error) =>
          console.error("Image loading error:", error.nativeEvent?.error)
        }
      />
      <LinearGradient
        colors={
          colorScheme === "dark"
            ? ["rgb(14, 11, 19)", "transparent"]
            : ["transparent", "transparent"]
        }
        className="absolute top-0 left-0 right-0 z-10 w-full h-96"
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
      />
    </>
  );
};

export default BackgroundImage;
