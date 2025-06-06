import { Colors } from "@/constants/Colors";
import "@/i18n/i18n";
import { store } from "@/store";
import { Stack, useGlobalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { Provider } from "react-redux";

export default function RootLayout() {
  const related = useGlobalSearchParams();
  const { t } = useTranslation();

  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="reset"
          options={{
            headerStyle: {
              backgroundColor: Colors.dark.cGradient2,
            },
            headerTintColor: Colors.dark.cWhite,
            animation: "slide_from_right",
            title: t("reset.title"),
            headerShown: true,
            headerBackTitle: t("headerbacktitle.title"),
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="createpost"
          options={{
            headerStyle: {
              backgroundColor: Colors.dark.cGradient2,
            },
            animation: "slide_from_right",
            headerTintColor: Colors.dark.cWhite,
            headerTitle: t("createpost.title"),
            headerShown: true,
            headerBackTitle: "Ana sayfa",
          }}
        />
        <Stack.Screen
          name="searchdetail"
          options={{
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
            headerTitle: related?.dir,
            headerTintColor: Colors.dark.cWhite,
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </Provider>
  );
}
