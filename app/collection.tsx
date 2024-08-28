import { View, Text } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import Marvel from "@/assets/Collections/marvel-collection.json";
import ExploreListSection from "@/components/ExploreListSection/ExploreListSection";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import ExploreBottomSheet from "@/components/ExploreBottomSheet/ExploreBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";

const collection = () => {
  const { dir } = useLocalSearchParams();
  const [bootomSheetValues, setBootomSheetValues] = useState<object>({});

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["20%", "25%", "45%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <GestureHandlerRootView className="flex-1 pt-6 bg-cGradient2">
      <View className="flex-1 bg-cGradient2">
        {dir === Marvel.name && (
          <>
            <View className="h-80">
              <ExploreListSection
                data={Marvel["MCU Sagas"]["Infinity Saga"]}
                sliderType="movie"
                exploreTitle="Infinity Saga"
                setBottomSheetVisible={handlePresentModalPress}
                setBootomSheetValues={setBootomSheetValues}
              />
            </View>
            <View className="h-80">
              <ExploreListSection
                data={Marvel["MCU Sagas"]["Multiverse Saga"]}
                sliderType="movie"
                exploreTitle="Multiverse Saga"
                setBottomSheetVisible={handlePresentModalPress}
                setBootomSheetValues={setBootomSheetValues}
              />
            </View>
          </>
        )}
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            keyboardBlurBehavior="none"
            handleIndicatorStyle={{ backgroundColor: "rgb(100 116 139)" }}
            keyboardBehavior="interactive"
            android_keyboardInputMode="adjustPan"
            backgroundComponent={({ style }) => (
              <View
                style={[
                  style,
                  {
                    backgroundColor: Colors.dark.cGradient1,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              />
            )}
          >
            <BottomSheetView style={{ flex: 1, marginTop: 10 }}>
              <ExploreBottomSheet bootomSheetValues={bootomSheetValues} />
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </View>
    </GestureHandlerRootView>
  );
};

export default collection;
