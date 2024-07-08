import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";

const PrimaryButton = ({ title, onClickHandler }: { title: string; onClickHandler: () => void }) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity onPress={onClickHandler} className="flex items-center justify-center w-4/5 h-12 mb-2 rounded-2xl bg-fuchsia-600">
      <Text className={"text-white text-lg"}>{t(title)}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
