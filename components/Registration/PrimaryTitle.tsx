import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";

const PrimaryTitle = ({
  title,
  additionalClassnames,
}: {
  title: string;
  additionalClassnames?: string;
}) => {
  const { t } = useTranslation();

  return (
    <Text
      className={
        additionalClassnames
          ? `mb-4 text-xl font-bold text-fuchsia-600 ${additionalClassnames}`
          : `mb-6 text-xl font-bold text-fuchsia-600`
      }
    >
      {t(title)}
    </Text>
  );
};

export default PrimaryTitle;
