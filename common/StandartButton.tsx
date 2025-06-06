import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity } from "react-native";

const StandartButton = ({
  title,
  onClickHandler,
}: {
  title: string;
  onClickHandler: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity onPress={onClickHandler}>
      <Text className="text-fuchsia-600 font-medium">{t(title)}</Text>
    </TouchableOpacity>
  );
};

export default StandartButton;
