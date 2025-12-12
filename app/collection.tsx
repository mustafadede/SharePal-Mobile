import Marvel from "@/assets/collections/marvel-collection.json";
import ExploreBottomSheet from "@/components/ExploreBottomSheet/ExploreBottomSheet";
import ExploreListSection from "@/components/ExploreListSection/ExploreListSection";
import { Colors } from "@/constants/Colors";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

const collection = () => {
  const { dir } = useLocalSearchParams();

  const [bottomSheetValues, setBottomSheetValues] = useState<object>({});

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["20%", "25%", "45%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 pt-36 bg-transparent dark:bg-cGradient2">
        {dir === Marvel.name && (
          <ScrollView className="flex-1">
            <View className="flex items-center justify-center w-full h-72">
              <Animated.Image
                entering={FadeIn.duration(400).delay(100)}
                source={{
                  uri: "https://i.shgcdn.com/63b14da2-e9c2-4b5e-b91c-5d8a7813d214/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
                }}
                className="flex h-20 mb-4 w-80"
              />
              <Animated.Text
                entering={FadeInDown.duration(400).delay(200)}
                className="px-6 font-bold text-center text-slate-400 text-md"
              >
                This is a cronogiocal order of Marvel Cinematic Universe (MCU).
                You can explore the movies and series by clicking on them or you
                can click the plus icon to add them to your watchlist.
              </Animated.Text>
            </View>
            <View className="h-80">
              <ExploreListSection
                data={Marvel["MCU Sagas"]["Infinity Saga"]}
                sliderType="movie"
                exploreTitle="Infinity Saga"
                setBottomSheetVisible={handlePresentModalPress}
                setBottomSheetValues={setBottomSheetValues}
              />
            </View>
            <View className="h-80">
              <ExploreListSection
                data={Marvel["MCU Sagas"]["Multiverse Saga"]}
                sliderType="movie"
                exploreTitle="Multiverse Saga"
                setBottomSheetVisible={handlePresentModalPress}
                setBottomSheetValues={setBottomSheetValues}
              />
            </View>
          </ScrollView>
        )}
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
            <ExploreBottomSheet
              bottomSheetValues={bottomSheetValues}
              handlePresentModalClose={handlePresentModalClose}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </GestureHandlerRootView>
  );
};

export default collection;
