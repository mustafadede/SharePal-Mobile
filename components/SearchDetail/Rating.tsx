import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

const Rating = ({ vote_average }: { vote_average: number }) => {
  const { t } = useTranslation();
  return (
    <View className="flex-row justify-between mt-4">
      <Text className="text-2xl text-black dark:text-slate-300 mt-1">
        {t("searchdetail.rating")}
      </Text>

      <Text className="text-3xl text-fuchsia-400">
        {`${vote_average}`[0]}
        <Text className="text-lg text-black dark:text-slate-300">/10</Text>
      </Text>
    </View>
  );
};

export default Rating;
