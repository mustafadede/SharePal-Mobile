import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity } from "react-native";

const UnderlineButton = ({
  subtitle,
  title,
  onClickHandler,
}: {
  subtitle?: string;
  title: string;
  onClickHandler: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      onPress={onClickHandler}
      className="flex-row gap-2 items-center"
    >
      {subtitle && (
        <Text
          className="text-slate-300"
          style={{
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
