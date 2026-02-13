import { Colors } from "@/constants/Colors";
import "@/i18n/i18n";
import { store } from "@/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { Toaster } from "sonner-native";
import SplashScreen from "./SplashScreen";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <Provider store={store}>
      <GestureHandlerRootView
        style={{
          flex: 1,
          backgroundColor:
            colorScheme === "dark" ? Colors.dark.cGradient2 : "#f9fafb",
        }}
      >
        <SafeAreaProvider>
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
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Colors.dark.cGradient2,
  },
};

const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#f2f2f2",
  },
};

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
    <ThemeProvider value={colorScheme === "dark" ? MyDarkTheme : MyLightTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
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
          name="index"
          options={{
            title: t("login.title"),
            headerShown: false,
            contentStyle: {
              backgroundColor:
                colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
            },
            headerStyle: {
              backgroundColor:
                colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
            },
          }}
        />
        <Stack.Screen
          name="reset"
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
            contentStyle: {
              backgroundColor:
                colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
            },
            headerTintColor:
              colorScheme === "dark" ? Colors.dark.cWhite : "black",
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
            contentStyle: {
              backgroundColor:
                colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
            },
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
            contentStyle: {
              backgroundColor:
                colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
            },
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
            contentStyle: {
              backgroundColor:
                colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
            },
            headerBackTitle: t("headerbacktitle.title"),
          }}
        />
        <Stack.Screen
          name="post"
          options={{
            headerShown: false,
            contentStyle: {
              backgroundColor:
                colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
            },
            headerStyle: {
              backgroundColor:
                colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
            },
          }}
        />
        <Stack.Screen
          name="postshare"
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
            contentStyle: {
              backgroundColor:
                colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
            },
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
            animation: "slide_from_right",
            contentStyle: {
              backgroundColor:
                colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
            },
            headerStyle: {
              backgroundColor:
                colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
            },
          }}
        />
        <Stack.Screen
          name="providers"
          options={{
            headerStyle: {
              backgroundColor:
                colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
            },
            title: t("searchdetail.providers"),
            animation: "slide_from_right",
            headerTintColor:
              colorScheme === "dark" ? Colors.dark.cWhite : "black",
            headerShown: true,
            contentStyle: {
              backgroundColor:
                colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
            },
            headerBackButtonMenuEnabled: true,
            headerBackVisible: true,
            headerTransparent: true,
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen name="ResetToRoot" />
      </Stack>
    </ThemeProvider>
  );
}
