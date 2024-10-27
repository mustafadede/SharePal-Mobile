import { SafeAreaView, Platform, StatusBar as RNStatusBar } from "react-native";
import Feed from "../feed";
import { Colors } from "@/constants/Colors";
import { useCallback, useRef, useState } from "react";
import CustomBottomSheet from "@/common/CustomBottomSheet";
import { useDispatch } from "react-redux";
import { modalActions } from "@/store/modalSlice";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Tabs from "@/common/Tabs";

const Index = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    if (index < 0) {
      console.log("Sheet Closed");
      dispatch(modalActions.closeModal());
    }
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaView
        className="flex-1 w-full h-full"
        style={{
          backgroundColor: Colors.dark.cGradient2,
          paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0, // Sadece Android için padding ekler
        }}
      >
        <Tabs tab={tab} setTab={setTab} />
        {tab === 0 && <Feed handleModal={handlePresentModalPress} />}
        <CustomBottomSheet handleSheetChanges={handleSheetChanges} bottomSheetModalRef={bottomSheetModalRef} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Index;
