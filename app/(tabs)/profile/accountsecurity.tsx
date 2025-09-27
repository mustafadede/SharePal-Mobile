import PrimaryButton from "@/common/PrimaryButton";
import PrimaryInput from "@/common/PrimaryInput";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

const accountsecurity = () => {
  const { t } = useTranslation();
  return (
    <View className="flex-1 bg-transparent dark:bg-cGradient2 px-6 pt-4">
      <PrimaryInput
        placeholder={t("profileSettings.items.accountSecurity.currentPassword")}
        visibility={true}
      />
      <PrimaryInput
        placeholder={t("profileSettings.items.accountSecurity.newPassword")}
        visibility={true}
      />
      <PrimaryInput
        placeholder={t(
          "profileSettings.items.accountSecurity.confirmNewPassword"
        )}
        visibility={true}
      />
      <PrimaryButton
        title={t("profileSettings.save")}
        onClickHandler={() => {}}
      />
    </View>
  );
};

export default accountsecurity;
