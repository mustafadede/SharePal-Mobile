import Discover from "@/components/Explore/Discover";
import Results from "@/components/Explore/Results";
import ExploreBottomSheet from "@/components/ExploreBottomSheet/ExploreBottomSheet";
import { Colors } from "@/constants/Colors";
import { Movie } from "@/constants/MovieTypes";
import useNextYear from "@/hooks/useNextYear";
import useNowPlaying from "@/hooks/useNowPlaying";
import useSearch from "@/hooks/useSearch";
import useTop10 from "@/hooks/useTop10";
import useUpcoming from "@/hooks/useUpcoming";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
  Platform,
  StatusBar as RNStatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const filters = [
  { label: "Movie", id: 0 },
  { label: "TV", id: 1 },
  { label: "Users", id: 2 },
  { label: "People", id: 3 },
];

const Explore = () => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [nextYear, setNextYear] = useState<Movie[]>([]);
  const [top10Movies, setTop10Movies] = useState<Movie[]>([]);
  const [top10Series, setTop10Series] = useState<Movie[]>([]);
  const [results, setResults] = useState<object[]>([]);
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
    }, 1000);
    setTimeout(() => {
      useTop10("movies", setTop10Movies);
    }, 1000);
    setTimeout(() => {
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
        backgroundColor:
          colorScheme === "dark" ? Colors.dark.cGradient2 : "transparent",
        paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0, // Sadece Android için padding ekler
      }}
    >
      <GestureHandlerRootView className="flex-1">
        <View className="flex-row">
          <TextInput
            placeholder={t("explore.search")}
            className="flex-1 px-4 pb-2 mt-2 mb-2 ml-2 h-12 mr-2 text-lg bg-white dark:bg-slate-800 dark:text-slate-400 rounded-2xl"
            placeholderTextColor={Colors.dark.slate600}
            value={search}
            style={{
              borderWidth: colorScheme === "dark" ? 0.5 : 0,
              textAlign: "center",
            }}
            onChange={(e) => handleSearch(e.nativeEvent.text)}
          />
          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearch("")}
              className="items-center justify-center mx-2"
            >
              <EvilIcons
                name="close"
                size={34}
                style={{ color: colorScheme === "dark" ? "#94a3b8" : "black" }}
              />
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
          <ScrollView className="flex-1 dark:bg-cGradient2">
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
