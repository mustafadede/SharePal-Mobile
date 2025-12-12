import { Colors } from "@/constants/Colors";
import "@/i18n/i18n";
import { store } from "@/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack, useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { Toaster } from "sonner-native";
import SplashScreen from "./SplashScreen";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <AppLayout />
        </BottomSheetModalProvider>
        <Toaster
          swipeToDismissDirection="left"
          style={{
            marginTop: 10,
            backdropFilter: "blur(20px)",
          }}
        />
      </GestureHandlerRootView>
    </Provider>
  );
}

function AppLayout() {
  const colorScheme = useColorScheme();
  const related = useGlobalSearchParams();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return loading ? (
    <SplashScreen />
  ) : (
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
          animation: "slide_from_right",
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
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTintColor:
            colorScheme === "dark" ? Colors.dark.cWhite : "black",
          headerTitle: "",
          animation: "slide_from_right",
          headerBackTitle: t("headerbacktitle.title"),
        }}
      />
      <Stack.Screen
        name="collection"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerStyle: {
            backgroundColor:
              colorScheme === "dark" ? Colors.dark.cGradient2 : "transparent",
          },
          headerTintColor:
            colorScheme === "dark" ? Colors.dark.cWhite : "black",
          headerTitle:
            related && related?.dir
              ? Array.isArray(related.dir)
                ? t(related.dir.join(", "))
                : t(related.dir)
              : "",
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
      <Stack.Screen
        name="attachtopost"
        options={{
          headerStyle: {
            backgroundColor:
              colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
          },
          animation: "slide_from_right",
          headerTintColor:
            colorScheme === "dark" ? Colors.dark.cWhite : "black",
          headerTitle: t("attachtopost.title"),
          headerShadowVisible: false,
          headerShown: true,
          headerBackTitle: t("headerbacktitle.title"),
        }}
      />
      <Stack.Screen
        name="userprofile"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="ResetToRoot" />
    </Stack>
  );
}
