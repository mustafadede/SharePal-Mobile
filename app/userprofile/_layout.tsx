import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { Platform, TouchableOpacity, useColorScheme } from "react-native";

export default function ProfileLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const { list } = useLocalSearchParams();
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
          headerTintColor:
            colorScheme === "dark" ? Colors.dark.cWhite : "black",
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerBackVisible: true,
          headerTransparent: true,
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
              </TouchableOpacity>
            ) : null,
        }}
      />
      <Stack.Screen
        name="usersuggest"
        options={{
          title: t("profile.suggestusertitle"),
          sheetElevation: 0,
          headerStyle: {
            backgroundColor:
              colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
          },
          contentStyle: {
            backgroundColor:
              colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
          },
          headerTintColor:
            colorScheme === "dark" ? Colors.dark.cWhite : "black",
          headerBackTitle: t("headerbacktitle.title"),
        }}
      />
      <Stack.Screen
        name="list/[list]/index"
        options={{
          headerStyle: {
            backgroundColor:
              colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
          },
          contentStyle: {
            backgroundColor:
              colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
          },
          title: list ? list.toString() : t("profile.list"),
          headerBackTitle: t("headerbacktitle.title"),
          headerTintColor:
            colorScheme === "dark" ? Colors.dark.cWhite : "black",
        }}
      />
    </Stack>
  );
}
