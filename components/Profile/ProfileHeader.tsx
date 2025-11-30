import DummyImage from "@/common/DummyImage";
import { RootState } from "@/store";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { useSelector } from "react-redux";

const ProfileHeader = ({ user = false }: { user?: boolean }) => {
  const otherProfile = useSelector((state: RootState) => state.userProfile);
  const yourProfile = useSelector((state: RootState) => state.profile);
  const profile = user ? otherProfile : yourProfile;

  return (
    <>
      <ImageBackground
        className="flex items-center justify-center px-4 mt-4 mb-2 h-52 bg-slate-800 rounded-2xl"
        source={{ uri: profile.banner }}
        imageStyle={{ borderRadius: 20, opacity: 0.6 }}
      >
        <View className="flex-row items-center justify-start gap-4">
          {profile.photoURL ? (
            <Image
              className="w-24 h-24 rounded-full"
              source={{ uri: `${profile.photoURL}` }}
            />
          ) : (
            <DummyImage wide={24} />
          )}

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
