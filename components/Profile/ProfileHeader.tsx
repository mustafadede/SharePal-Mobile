import { RootState } from "@/store";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { useSelector } from "react-redux";

const ProfileHeader = () => {
  const profile = useSelector((state: RootState) => state.profile);
  return (
    <>
      <ImageBackground
        className="flex items-center justify-center px-4 mt-4 mb-2 h-52 bg-slate-800 rounded-2xl"
        source={
          profile.banner
            ? { uri: profile.banner }
            : require("@/assets/images/react-logo.png")
        }
        imageStyle={{ borderRadius: 20, opacity: 0.6 }}
      >
        <View className="flex-row items-center justify-start gap-4">
          <Image
            className="w-24 h-24 rounded-full"
            source={
              profile.photoURL
                ? { uri: `${profile.photoURL}` }
                : require("@/assets/images/react-logo.png")
            }
          />
          <View>
            <Text className="text-2xl text-white">{profile.nick}</Text>
            <Text className="text-sm italic font-bold text-slate-400">
              {profile.quote}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default ProfileHeader;
