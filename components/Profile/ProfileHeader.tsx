import DummyImage from "@/common/DummyImage";
import { RootState } from "@/store";
import { Image } from "expo-image";
import React from "react";
import { ImageBackground, Text, View } from "react-native";
import { useSelector } from "react-redux";

const ProfileHeader = ({ user = false }: { user?: boolean }) => {
  const otherProfile = useSelector((state: RootState) => state.userProfile);
  const yourProfile = useSelector((state: RootState) => state.profile);
  const profile = user ? otherProfile : yourProfile;
  const hasBanner = !!profile.banner;

  return (
    <View className="flex-1 max-h-52 mb-2 px-4">
      <ImageBackground
        className="flex items-center justify-center px-4 mb-2 h-52 bg-slate-800 rounded-2xl"
        source={hasBanner ? { uri: profile.banner } : undefined}
        imageStyle={{ borderRadius: 20, opacity: 0.6 }}
      >
        <View className="flex-row items-center justify-center gap-4">
          {profile.photoURL ? (
            <Image
              source={{ uri: `${profile.photoURL}` }}
              style={{
                width: 110,
                height: 110,
                borderRadius: 100,
              }}
              contentFit="cover"
            />
          ) : (
            <DummyImage wide={96} />
          )}

          <View>
            <Text className="text-2xl text-white">{profile.nick}</Text>
            <Text className="text-sm italic font-bold text-slate-400">
              {profile.quote}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileHeader;
