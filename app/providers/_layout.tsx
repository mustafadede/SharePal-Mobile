import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "react-native";

const _layout = () => {
  const colorScheme = useColorScheme();

  const { t } = useTranslation();

  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerStyle: {
            backgroundColor:
              colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
          },
          animation: "slide_from_right",
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
