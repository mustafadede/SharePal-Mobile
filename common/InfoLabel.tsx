import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const InfoLabel = ({ status, small }: { status: string; small?: boolean }) => {
  const { t } = useTranslation();

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(150)}
      className="w-full py-2"
    >
      <Text
        className={
          small
            ? "text-md text-center text-slate-400"
            : "text-xl text-center text-slate-400"
        }
      >
        {t(status)}
      </Text>
    </Animated.View>
  );
};

export default InfoLabel;
