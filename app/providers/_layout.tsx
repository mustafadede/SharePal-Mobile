import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "react-native";

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
          title: "",
          headerTintColor:
            colorScheme === "dark" ? Colors.dark.cWhite : "black",
          headerShown: false,
          headerBackButtonMenuEnabled: true,
          headerBackVisible: true,
        }}
      />
    </Stack>
  );
};

export default _layout;
