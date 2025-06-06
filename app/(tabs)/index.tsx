import CustomBottomSheet from "@/common/CustomBottomSheet";
import Tabs from "@/common/Tabs";
import { Colors } from "@/constants/Colors";
import { modalActions } from "@/store/modalSlice";
import Feather from "@expo/vector-icons/Feather";
import { BottomSheetModal, TouchableOpacity } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Platform, StatusBar as RNStatusBar, SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import Feed from "../feed";

const Index = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    if (index < 0) {
      dispatch(modalActions.closeModal());
    }
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.dark.cGradient2,
          paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
        }}
      >
        <Tabs tab={tab} setTab={setTab} />
        {tab === 0 && <Feed handleModal={handlePresentModalPress} />}
        <TouchableOpacity
          onPress={() => router.push("/createpost")}
          activeOpacity={0.8}
          style={{
            position: "absolute",
            borderColor: Colors.dark.cDarkGray,
            bottom: 10,
            right: 10,
            backgroundColor: Colors.dark.cGradient2,
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
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Index;
