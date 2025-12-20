import Tabs from "@/common/Tabs";
import { Colors } from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { BottomSheetModal, TouchableOpacity } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  Platform,
  StatusBar as RNStatusBar,
  useColorScheme,
  View,
} from "react-native";
import Feed from "../feed";

const Index = () => {
  const colorScheme = useColorScheme();
  const [tab, setTab] = useState(0);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    requestAnimationFrame(() => {
      bottomSheetModalRef.current?.present();
    });
  }, []);

  const containerStyle = useMemo(
    () => ({
      flex: 1,
      backgroundColor:
        colorScheme === "dark" ? Colors.dark.cGradient2 : "transparent",
      paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 60,
    }),
    [colorScheme]
  );

  const floatingActionButton = useMemo(
    () => (
      <TouchableOpacity
        onPress={() => router.push("/createpost")}
        activeOpacity={0.8}
        style={{
          position: "absolute",
          borderColor:
            colorScheme === "dark" ? Colors.dark.cDarkGray : Colors.dark.cFuc6,
          bottom: 90,
          right: 10,
          backgroundColor:
            colorScheme === "dark" ? Colors.dark.cGradient2 : Colors.dark.cFuc6,
          borderRadius: 50,
          padding: 14,
          elevation: 1,
          zIndex: 1,
          borderWidth: 1,
        }}
      >
        <Feather name="plus" size={32} color={Colors.dark.cWhite} />
      </TouchableOpacity>
    ),
    [colorScheme]
  );

  return (
    <View style={containerStyle}>
      <Tabs tab={tab} setTab={setTab} />
      {tab === 0 && <Feed handleModal={handlePresentModalPress} />}
      {floatingActionButton}
    </View>
  );
};

export default Index;
