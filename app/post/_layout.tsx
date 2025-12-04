import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { getAuth } from "firebase/auth";
import React from "react";
import { useTranslation } from "react-i18next";
import { Platform, Text, TouchableOpacity, useColorScheme } from "react-native";

const _layout = () => {
  const colorScheme = useColorScheme();
  const currentUserId = getAuth().currentUser?.uid;
  const { userId } = useLocalSearchParams();
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
          headerTitle: "",

          headerTintColor:
            colorScheme === "dark" ? Colors.dark.cWhite : "black",
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerBackVisible: true,
          headerBackTitle: t("headerbacktitle.title"),
          headerBackButtonDisplayMode: "minimal",
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
          headerRight: () =>
            currentUserId === userId && (
              <TouchableOpacity className="flex flex-row gap-2">
                <TouchableOpacity onPress={() => {}}>
                  <MaterialCommunityIcons
                    name="dots-horizontal"
                    size={24}
                    color={
                      colorScheme === "dark"
                        ? Colors.dark.cWhite
                        : Colors.dark.cBlack
                    }
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ),
        }}
      />
    </Stack>
  );
};

export default _layout;
