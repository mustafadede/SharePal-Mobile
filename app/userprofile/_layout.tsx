import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  Platform,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function ProfileLayout() {
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
                <Text className="text-lg ml-2">
                  {t("headerbacktitle.title")}
                </Text>
              </TouchableOpacity>
            ) : null,
          headerRight: () => (
            <View className="flex flex-row gap-2">
              <TouchableOpacity onPress={() => {}}>
                <Text className="bg-fuchsia-600 px-6 py-2 rounded-xl text-white">
                  Follow
                </Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
