import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

const Avatar = ({
  uid,
  name,
  photoURL,
}: {
  uid: string;
  name: string;
  photoURL: string;
}) => {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/userprofile/[id]",
          params: {
            id: uid,
            username: name,
          },
        })
      }
    >
      <Image
        source={{ uri: photoURL }}
        style={{
          width: 52,
          height: 52,
          borderRadius: 26,
        }}
      />
    </Pressable>
  );
};

export default Avatar;
