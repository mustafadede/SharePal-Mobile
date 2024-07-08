import { View, Text } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";

const PrimaryTitle = ({ title }: { title: string }) => {
  const { t } = useTranslation();

  return <Text className="mb-6 text-2xl font-bold text-fuchsia-600">{t(title)}</Text>;
};

export default PrimaryTitle;
