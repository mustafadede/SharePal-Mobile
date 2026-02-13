import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Platform, Text, TouchableOpacity, useColorScheme } from "react-native";

const _layout = () => {
  const colorScheme = useColorScheme();

  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor:
            colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
        },
        headerStyle: {
          backgroundColor:
            colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
        },
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          headerStyle: {
            backgroundColor:
              colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
          },
          contentStyle: {
            backgroundColor:
              colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
          },
          headerShadowVisible: false,
          headerTitle: "",
          headerTintColor:
            colorScheme === "dark" ? Colors.dark.cWhite : "black",
          headerBackButtonMenuEnabled: true,
          headerBackTitle: t("headerbacktitle.title"),
          headerBackVisible: true,
          headerLeft: () =>
            Platform.OS === "ios" ? (
              <TouchableOpacity
                onPress={() => {
                  router.back();
                }}
                className="flex-row items-center"
              >
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={colorScheme === "dark" ? Colors.dark.cWhite : "black"}
                />
                <Text className="text-lg dark:text-white ml-2">
                  {t("headerbacktitle.title")}
                </Text>
              </TouchableOpacity>
            ) : null,
        }}
      />
    </Stack>
  );
};

export default _layout;
