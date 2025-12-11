import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity } from "react-native";

const PrimaryButton = ({
  title,
  onClickHandler,
  className,
}: {
  title: string;
  onClickHandler: () => void;
  className?: string;
}) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={onClickHandler}
      className={`flex items-center justify-center w-full h-12 mb-4 rounded-2xl bg-fuchsia-600 ${className}`}
    >
      <Text className={"text-white text-lg"}>{t(title)}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
