import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, useColorScheme } from "react-native";

const UnderlineButton = ({
  subtitle,
  title,
  onClickHandler,
}: {
  subtitle?: string;
  title: string;
  onClickHandler: () => void;
}) => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      onPress={onClickHandler}
      className="flex-row gap-2 items-center"
    >
      {subtitle && (
        <Text
          style={{
            color: colorScheme !== "dark" ? "#1e293b" : "white",
            fontSize: 16,
            marginBottom: 6,
          }}
        >
          {t(subtitle)}
        </Text>
      )}
      <Text
        className="text-fuchsia-600"
        style={{
          fontSize: 16,
          marginBottom: 6,
        }}
      >
        {t(title)}
      </Text>
    </TouchableOpacity>
  );
};

export default UnderlineButton;
