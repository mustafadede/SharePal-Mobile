import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";

const StandartButton = ({ title, onClickHandler }: { title: string; onClickHandler: () => void }) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity onPress={onClickHandler}>
      <Text className="text-fuchsia-600">{t(title)}</Text>
    </TouchableOpacity>
  );
};

export default StandartButton;
