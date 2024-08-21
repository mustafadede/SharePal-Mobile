import { ScrollView, TextInput, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useNowPlaying from "../../../hooks/useNowPlaying";
import useUpcoming from "@/hooks/useUpcoming";
import useNextYear from "@/hooks/useNextYear";
import useTop10 from "@/hooks/useTop10";
import ExploreBottomSheet from "@/components/ExploreBottomSheet/ExploreBottomSheet";
import ExploreCollections from "@/components/ExploreCollections/ExploreCollections";
import ExploreListSection from "@/components/ExploreListSection/ExploreListSection";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";

const Explore = () => {
  const [nowPlaying, setNowPlaying] = useState<Object[]>();
  const [upcoming, setUpcoming] = useState<Object[]>();
  const [nextYear, setNextYear] = useState<Object[]>();
  const [top10Movies, setTop10Movies] = useState<Object[]>();
  const [top10Series, setTop10Series] = useState<Object[]>();
  const [bootomSheetValues, setBootomSheetValues] = useState<object>({});

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["20%", "25%", "45%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    useNowPlaying(setNowPlaying);
    useUpcoming(setUpcoming);
    useNextYear(setNextYear);
    useTop10("movies", setTop10Movies);
    useTop10("series", setTop10Series);
  }, []);

  return (
    <GestureHandlerRootView className="flex-1 pt-6 bg-cGradient2">
      <ScrollView className="flex-1 bg-cGradient2">
        <TextInput
          placeholder="Search"
          className="h-12 px-4 m-4 text-lg text-slate-200 rounded-2xl bg-cGradient1"
          placeholderTextColor={Colors.dark.tColor1}
        />
        <ExploreCollections />
        <ExploreListSection
          exploreTitle="Now Playing"
          data={nowPlaying}
          sliderType="movie"
          setBottomSheetVisible={handlePresentModalPress}
          setBootomSheetValues={setBootomSheetValues}
        />
        <ExploreListSection
          exploreTitle="Upcoming"
          data={upcoming}
          sliderType="movie"
          setBottomSheetVisible={handlePresentModalPress}
          setBootomSheetValues={setBootomSheetValues}
        />
        <ExploreListSection
          exploreTitle="Next Year"
          data={nextYear}
          sliderType="movie"
          setBottomSheetVisible={handlePresentModalPress}
          setBootomSheetValues={setBootomSheetValues}
        />
        <ExploreListSection
          exploreTitle="Top 10 Movies"
          data={top10Movies}
          sliderType="movie"
          setBottomSheetVisible={handlePresentModalPress}
          setBootomSheetValues={setBootomSheetValues}
        />
        <ExploreListSection
          exploreTitle="Top 10 Series"
          data={top10Series}
          sliderType="tv"
          setBottomSheetVisible={handlePresentModalPress}
          setBootomSheetValues={setBootomSheetValues}
        />
      </ScrollView>
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
    </GestureHandlerRootView>
  );
};

export default Explore;
