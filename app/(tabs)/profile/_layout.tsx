import { Colors } from "@/constants/Colors";
import { RootState } from "@/store";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import { useSelector } from "react-redux";

export default function ProfileLayout() {
  const profile = useSelector((state: RootState) => state.profile);
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        options={{
          title: profile ? profile.nick : "",
          headerShown: true,
          headerTransparent: true,
          headerStyle: {
            backgroundColor:
              colorScheme !== "dark" ? Colors.dark.cWhite : "black",
          },
          headerTintColor:
            colorScheme === "dark" ? Colors.dark.cWhite : "black",
          headerRight: () => (
            <View className="flex flex-row gap-2">
              <TouchableOpacity
                onPress={() => {
                  router.push("/createpost");
                }}
                style={{ marginRight: 16 }}
              >
                <Ionicons
                  name="create-outline"
                  size={26}
                  color={
                    colorScheme === "dark"
                      ? Colors.dark.cWhite
                      : "rgb(192 38 211)"
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  router.push("/profile/settings");
                }}
                style={{ marginRight: 16 }}
              >
                <Entypo
                  name="menu"
                  size={26}
                  color={colorScheme === "dark" ? Colors.dark.cWhite : "black"}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
        name="index"
      />
      <Stack.Screen
        name="settings"
        options={{
          animation: "slide_from_right",
          title: profile
            ? `${profile.nick}${t("profileSettings.title")}`
            : t("profileSettings.defaultTitle"),
          headerTransparent: true,
          headerTintColor:
            colorScheme === "dark" ? Colors.dark.cWhite : "black",
        }}
      />
      <Stack.Screen
        name="language"
        options={{
          animation: "slide_from_right",
          title: t("profileSettings.langTitle"),
          headerTransparent: true,
          headerTintColor:
            colorScheme === "dark" ? Colors.dark.cWhite : "black",
        }}
      />
    </Stack>
  );
}
