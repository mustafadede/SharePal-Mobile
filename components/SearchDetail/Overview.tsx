import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import StatusLabel from "../StatusLabel/StatusLabel";

const Overview = ({ overview }: { overview: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();
  return (
    <View className="px-4">
      <Text className="text-2xl mt-1 text-start text-dark dark:text-slate-200">
        {t("searchdetail.overview")}
      </Text>

      {overview ? (
        <Text
          className="text-md text-start my-3 text-slate-600 dark:text-slate-400 leading-[22px]"
          numberOfLines={isExpanded ? 0 : 3}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {overview}
        </Text>
      ) : (
        <StatusLabel />
      )}
    </View>
  );
};

export default Overview;
