import { Colors } from "@/constants/Colors";
import "@/i18n/i18n";
import { store } from "@/store";
import { Stack, useGlobalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "react-native";
import { Provider } from "react-redux";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const related = useGlobalSearchParams();
  const { t } = useTranslation();

  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: t("login.title"), headerShown: false }}
        />
        <Stack.Screen
          name="reset"
          options={{
            headerStyle: {
              backgroundColor:
                colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
            },
            headerTintColor:
              colorScheme === "dark" ? Colors.dark.cWhite : "black",
            animation: "slide_from_right",
            title: t("reset.title"),
            headerShown: true,
            headerBackTitle: t("headerbacktitle.title"),
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor:
                colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
            },
            headerBackVisible: false,
            headerTintColor:
              colorScheme === "dark" ? Colors.dark.cWhite : "black",
            headerTransparent: true,
            headerTitle: "",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "600",
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="createpost"
          options={{
            presentation: "modal",
            headerStyle: {
              backgroundColor:
                colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
            },
            animation: "slide_from_right",
            headerTintColor:
              colorScheme === "dark" ? Colors.dark.cWhite : "black",
            headerTitle: t("createpost.title"),
            headerShadowVisible: false,
            headerShown: true,
            headerBackTitle: "Ana sayfa",
          }}
        />
        <Stack.Screen
          name="searchdetail"
          options={{
            presentation: "card",
            headerShown: true,
            headerTransparent: true,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "transparent",
            },
            headerTintColor: "#ffffff",
            headerTitle: "",
            animation: "slide_from_right",
            headerBackTitle: t("headerbacktitle.title"),
          }}
        />
        <Stack.Screen
          name="collection"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: Colors.dark.cGradient2,
            },
            headerTitle:
              related && related?.dir
                ? Array.isArray(related.dir)
                  ? t(related.dir.join(", "))
                  : t(related.dir)
                : "",
            headerTintColor: Colors.dark.cWhite,
            animation: "slide_from_right",
            headerBackTitle: t("headerbacktitle.title"),
          }}
        />
        <Stack.Screen
          name="postshare"
          options={{
            headerStyle: {
              backgroundColor:
                colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
            },
            animation: "slide_from_right",
            headerTintColor:
              colorScheme === "dark" ? Colors.dark.cWhite : "black",
            headerTitle: t("share.title"),
            headerShadowVisible: false,
            headerShown: true,
            headerBackTitle: t("headerbacktitle.title"),
          }}
        />
      </Stack>
    </Provider>
  );
}
