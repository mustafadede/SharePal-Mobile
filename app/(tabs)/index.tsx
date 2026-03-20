import Tabs from "@/common/Tabs";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Platform,
  StatusBar as RNStatusBar,
  useColorScheme,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import Feed from "../feed";

const Index = () => {
  const colorScheme = useColorScheme();
  const [tab, setTab] = useState(0);

  const containerStyle = useMemo(
    () => ({
      flex: 1,
      backgroundColor:
        colorScheme === "dark" ? Colors.dark.cGradient2 : "transparent",
      paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 60,
    }),
    [colorScheme],
  );

  const floatingActionButton = useMemo(
    () => (
      <Animated.View
        entering={FadeInDown.springify().delay(300)}
        exiting={FadeOutDown.springify()}
      >
        <TouchableOpacity
          onPress={() => {
            router.push("/createpost");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          activeOpacity={0.8}
          style={{
            position: "absolute",
            borderColor:
              colorScheme === "dark"
                ? Colors.dark.cDarkGray
                : Colors.dark.cFuc6,
            bottom: 15,
            right: 10,
            backgroundColor:
              colorScheme === "dark"
                ? Colors.dark.cGradient2
                : Colors.dark.cFuc6,
            borderRadius: 50,
            padding: 16,
            elevation: 1,
            zIndex: 1,
            borderWidth: 1,
          }}
        >
          <Ionicons
            name="create-outline"
            size={26}
            style={{ transform: [{ translateX: 2 }] }}
            color={Colors.dark.cWhite}
          />
        </TouchableOpacity>
      </Animated.View>
    ),
    [colorScheme],
  );

  return (
    <View style={containerStyle}>
      <Tabs tab={tab} setTab={setTab} />
      {tab === 0 && <Feed />}
      {tab === 1 && <View className="flex-1"></View>}
      {floatingActionButton}
    </View>
  );
};

export default Index;
