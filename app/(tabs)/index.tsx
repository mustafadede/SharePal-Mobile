import CustomBottomSheet from "@/common/CustomBottomSheet";
import Tabs from "@/common/Tabs";
import { Colors } from "@/constants/Colors";
import { modalActions } from "@/store/modalSlice";
import Feather from "@expo/vector-icons/Feather";
import { BottomSheetModal, TouchableOpacity } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  Platform,
  StatusBar as RNStatusBar,
  useColorScheme,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import Feed from "../feed";

const Index = () => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const [tab, setTab] = useState(0);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index < 0) {
        dispatch(modalActions.closeModal());
      }
    },
    [dispatch]
  );

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor:
          colorScheme === "dark" ? Colors.dark.cGradient2 : "transparent",
        paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 40,
      }}
    >
      <Tabs tab={tab} setTab={setTab} />
      {tab === 0 && <Feed handleModal={handlePresentModalPress} />}
      <TouchableOpacity
        onPress={() => router.push("/createpost")}
        activeOpacity={0.8}
        style={{
          position: "absolute",
          borderColor:
            colorScheme === "dark" ? Colors.dark.cDarkGray : Colors.dark.cFuc6,
          bottom: 10,
          right: 10,
          backgroundColor:
            colorScheme === "dark" ? Colors.dark.cGradient2 : Colors.dark.cFuc6,
          borderRadius: 50,
          padding: 14,
          elevation: 5,
          borderWidth: 1,
        }}
      >
        <Feather name="plus" size={32} color={Colors.dark.cWhite} />
      </TouchableOpacity>
      <CustomBottomSheet
        handleSheetChanges={handleSheetChanges}
        bottomSheetModalRef={bottomSheetModalRef}
        snaps={["25%", "40%", "75%"]}
      />
    </GestureHandlerRootView>
  );
};

export default Index;
