import PrimaryButton from "@/common/PrimaryButton";
import PrimaryInput from "@/common/PrimaryInput";
import AvatarPicker from "@/components/Settings/AvatarPicker";
import { RootState } from "@/store";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";

const ProfileEdit = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const { t } = useTranslation();
  return (
    <ScrollView className="flex-1 bg-transparent dark:bg-cGradient2">
      <View className="px-6 relative">
        {/* Avatar */}
        <AvatarPicker />
        <Text className="text-xs font-semibold uppercase mb-2 dark:text-slate-400 text-gray-700">
          {t("profileSettings.items.profile.title")}
        </Text>
        {/* Name Input */}
        <PrimaryInput placeholder={profile?.nick ? profile.nick : "Username"} />

        {/* Email Input */}
        <PrimaryInput placeholder={profile?.email ? profile.email : "Email"} />

        <PrimaryInput
          placeholder={profile?.quote ? profile.quote : "Username"}
        />

        <PrimaryInput
          placeholder={profile?.topOne ? profile.topOne : "Username"}
        />
        <Text className="text-xs font-semibold uppercase mb-2 dark:text-slate-400 text-gray-700">
          {t("profileSettings.items.profile.socials")}
        </Text>

        <PrimaryInput
          placeholder={profile?.instagram ? profile.instagram : "Instagram"}
        />

        <PrimaryInput
          placeholder={profile?.github ? profile.github : "Github"}
        />

        <PrimaryInput
          placeholder={profile?.linkedin ? profile.linkedin : "Linkedin"}
        />

        {/* Save Button */}
        <PrimaryButton
          title={t("profileSettings.save")}
          onClickHandler={() => {}}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileEdit;
