import { Stack, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import "@/i18n/i18n";
import { Colors } from "@/constants/Colors";
import { Provider } from "react-redux";
import { store } from "@/store";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native";
import * as Sharing from "expo-sharing";

export default function RootLayout() {
  const related = useGlobalSearchParams();

  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false, animation: "fade_from_bottom" }} />
        <Stack.Screen name="reset" options={{ title: "Reset Password" }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="searchdetail"
          options={{
            headerShown: true,
            headerTransparent: true,
            headerStyle: {
              backgroundColor: "transparent",
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => {}}>
                <Feather name="share" size={24} color="white" />
              </TouchableOpacity>
            ),
            headerTintColor: "#ffffff",
            headerTitle: "",
            animation: "slide_from_right",
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
