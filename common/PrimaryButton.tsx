import StatusLabel from "@/components/StatusLabel/StatusLabel";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity } from "react-native";

const PrimaryButton = ({
  title,
  onClickHandler,
  className,
  loading,
}: {
  title: string;
  onClickHandler: () => void;
  className?: string;
  loading?: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={onClickHandler}
      className={`flex items-center justify-center w-full h-12 mb-4 rounded-2xl bg-fuchsia-600 ${className}`}
    >
      {loading && <StatusLabel size={"small"} color="white" />}
      {!loading && <Text className={"text-white text-lg"}>{t(title)}</Text>}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
