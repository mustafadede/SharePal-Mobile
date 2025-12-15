import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";

const Providers = ({
  id,
  mediaType,
}: {
  id: string;
  mediaType: "movie" | "tv";
}) => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/providers/[id]",
            params: { id: id, mediaType: mediaType },
          });
        }}
        className="mt-4 rounded-full flex-1 flex-row items-center py-2 justify-between"
      >
        <Text className="text-2xl text-black dark:text-slate-300 mt-1">
          {t("searchdetail.providers")}
        </Text>
        <Feather
          name="chevron-right"
          size={24}
          color={colorScheme === "dark" ? "white" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Providers;
