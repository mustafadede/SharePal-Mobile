import { Stack, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import "@/i18n/i18n";
import { Colors } from "@/constants/Colors";

export default function RootLayout() {
  const related = useGlobalSearchParams();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="reset" options={{ title: "Reset Password" }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="searchdetail"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: Colors.dark.cGradient2,
          },
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
  );
}
