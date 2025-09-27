import { Colors } from "@/constants/Colors";
import { RootState } from "@/store";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
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
              colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
          },
          headerTintColor:
            colorScheme === "dark"
              ? Colors.dark.cWhite
              : Colors.dark.cGradient2,
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
                      : Colors.dark.cBlack
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
          headerBackTitle: t("headerbacktitle.title"),
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
          headerBackTitle: t("headerbacktitle.title"),
          headerTransparent: true,
          headerTintColor:
            colorScheme === "dark" ? Colors.dark.cWhite : "black",
        }}
      />
      <Stack.Screen
        name="appearance"
        options={{
          animation: "slide_from_right",
          title: t("profileSettings.items.appearance.title"),
          headerTransparent: true,
          headerBackTitle: t("headerbacktitle.title"),
          headerTintColor:
            colorScheme === "dark" ? Colors.dark.cWhite : "black",
        }}
      />
      <Stack.Screen
        name="profileedit"
        options={{
          animation: "slide_from_right",
          headerStyle: {
            backgroundColor:
              colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
          },
          title: t("profileSettings.items.profile.title"),
          headerBackTitle: t("headerbacktitle.title"),
          headerTintColor:
            colorScheme === "dark" ? Colors.dark.cWhite : "black",
        }}
      />
      <Stack.Screen
        name="accountsecurity"
        options={{
          animation: "slide_from_right",
          headerStyle: {
            backgroundColor:
              colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
          },
          title: t("profileSettings.items.accountSecurity.title"),
          headerBackTitle: t("headerbacktitle.title"),
          headerTintColor:
            colorScheme === "dark" ? Colors.dark.cWhite : "black",
        }}
      />
      <Stack.Screen
        name="[list]"
        options={{
          animation: "slide_from_right",
          headerStyle: {
            backgroundColor:
              colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
          },
          title: t("profile.list"),
          headerBackTitle: t("headerbacktitle.title"),
          headerTintColor:
            colorScheme === "dark" ? Colors.dark.cWhite : "black",
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
              <SimpleLineIcons
                name="options-vertical"
                size={16}
                color={colorScheme === "dark" ? Colors.dark.cWhite : "black"}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
