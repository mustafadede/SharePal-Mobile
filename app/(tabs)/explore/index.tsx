import {
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  StatusBar as RNStatusBar,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useNowPlaying from "../../../hooks/useNowPlaying";
import useUpcoming from "@/hooks/useUpcoming";
import useNextYear from "@/hooks/useNextYear";
import useTop10 from "@/hooks/useTop10";
import ExploreBottomSheet from "@/components/ExploreBottomSheet/ExploreBottomSheet";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import Discover from "@/components/Explore/Discover";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { styled } from "nativewind";
import useSearch from "@/hooks/useSearch";
import Results from "@/components/Explore/Results";

const filters = [
  { label: "Movie", id: 0 },
  { label: "TV", id: 1 },
  { label: "Users", id: 2 },
  { label: "People", id: 3 },
];

const Explore = () => {
  const StyledEvilIcon = styled(EvilIcons);
  const [nowPlaying, setNowPlaying] = useState<Object[]>();
  const [upcoming, setUpcoming] = useState<Object[]>();
  const [nextYear, setNextYear] = useState<Object[]>();
  const [top10Movies, setTop10Movies] = useState<Object[]>();
  const [top10Series, setTop10Series] = useState<Object[]>();
  const [results, setResults] = useState<Object[]>();
  const [bottomSheetValues, setBottomSheetValues] = useState<object>({});
  const [search, setSearch] = useState("");
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["20%", "25%", "45%"], []);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [loading, setLoading] = useState(false);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  useEffect(() => {
    useNowPlaying(setNowPlaying);
    useUpcoming(setUpcoming);
    setTimeout(() => {
      useNextYear(setNextYear);
      useTop10("movies", setTop10Movies);
      useTop10("series", setTop10Series);
    }, 1000);
  }, []);
  const handleSearch = (search: string) => {
    setSearch(search);
    setLoading(true);
    setTimeout(() => {
      const type = filters[selectedFilter].label.toLowerCase();
      useSearch(search, setResults, type).then(() => setLoading(false));
    }, 300);
  };

  useEffect(() => {
    setResults([]);
    handleSearch(search);
  }, [selectedFilter]);

  return (
    <SafeAreaView
      className="flex-1 w-full h-full"
      style={{
        backgroundColor: Colors.dark.cGradient2,
        paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0, // Sadece Android için padding ekler
      }}
    >
      <GestureHandlerRootView className="flex-1">
        <View className="flex-row">
          <TextInput
            placeholder="Search"
            className="flex-1 px-4 py-2 mt-2 mb-2 ml-2 mr-2 text-lg border-slate-600 text-slate-200 rounded-2xl"
            placeholderTextColor={Colors.dark.slate600}
            value={search}
            style={{ borderWidth: 0.5 }}
            onChange={(e) => handleSearch(e.nativeEvent.text)}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")} className="items-center justify-center mx-2">
              <StyledEvilIcon name="close" size={24} className="text-slate-600" />
            </TouchableOpacity>
          )}
        </View>
        {search.length > 0 ? (
          <Results
            results={results}
            filters={filters}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            loading={loading}
            setLoading={setLoading}
          />
        ) : (
          <ScrollView className="flex-1 bg-cGradient2">
            <Discover
              nowPlaying={nowPlaying}
              upcoming={upcoming}
              nextYear={nextYear}
              top10Movies={top10Movies}
              top10Series={top10Series}
              setBottomSheetVisible={handlePresentModalPress}
              setBottomSheetValues={setBottomSheetValues}
            />
          </ScrollView>
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
                    backgroundColor: Colors.dark.cGradient2,
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
              <ExploreBottomSheet bottomSheetValues={bottomSheetValues} />
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Explore;
