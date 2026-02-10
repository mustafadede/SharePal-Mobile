import ExploreBanner from "@/common/ExploreBanner";
import Results from "@/components/Explore/Results";
import ExploreBottomSheet from "@/components/ExploreBottomSheet/ExploreBottomSheet";
import ExploreCollections from "@/components/ExploreCollections/ExploreCollections";
import ExploreListSection from "@/components/ExploreListSection/ExploreListSection";
import { Colors } from "@/constants/Colors";
import { ExploreSection } from "@/constants/Explore";
import { Movie } from "@/constants/MovieTypes";
import useNextYear from "@/hooks/useNextYear";
import useNowPlaying from "@/hooks/useNowPlaying";
import useSearch from "@/hooks/useSearch";
import useTop10 from "@/hooks/useTop10";
import useUpcoming from "@/hooks/useUpcoming";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
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
  FlatList,
  Platform,
  StatusBar as RNStatusBar,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

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
  const [bottomSheetValues, setBottomSheetValues] = useState<object>({
    title: "",
    release_date: "",
    poster_path: "",
    mediaType: "",
    id: 0,
    wanttowatch: false,
    watched: false,
    unfinished: false,
  });
  const [search, setSearch] = useState("");
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["20%", "25%", "45%"], []);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [loading, setLoading] = useState(false);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const openBottomSheet = useCallback(
    (values: {
      title: string;
      release_date: string;
      poster_path: string;
      mediaType: string;
      id: number;
      wanttowatch: boolean;
      watched: boolean;
      unfinished: boolean;
    }) => {
      setBottomSheetValues(values);

      requestAnimationFrame(() => {
        handlePresentModalPress();
      });
    },
    [handlePresentModalPress],
  );

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

  const debounceRef = useRef<NodeJS.Timeout | number | null>(null);

  const handleSearch = (search: string) => {
    setSearch(search);
    setLoading(true);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const type = filters[selectedFilter].label.toLowerCase();
      useSearch(search, setResults, type).then(() => setLoading(false));
    }, 400);
  };

  useEffect(() => {
    setResults([]);
    handleSearch(search);
  }, [selectedFilter]);

  const sections: ExploreSection[] = useMemo(
    () => [
      { type: "banner" },
      { type: "collections" },
      {
        type: "list",
        title: "explore.nowplaying",
        data: nowPlaying,
        sliderType: "movie",
      },
      {
        type: "list",
        title: "explore.upcoming",
        data: upcoming,
        sliderType: "movie",
      },
    ],
    [nowPlaying, upcoming],
  );

  const memoBottomSheet = useMemo(
    () => (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={0}
            appearsOnIndex={1}
            opacity={0.7}
          />
        )}
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
          <ExploreBottomSheet
            handleSheetChanges={handleSheetChanges}
            bottomSheetValues={bottomSheetValues}
            setBottomSheetValues={setBottomSheetValues}
            handlePresentModalClose={handlePresentModalClose}
          />
        </BottomSheetView>
      </BottomSheetModal>
    ),
    [colorScheme, bottomSheetValues],
  );

  const renderSection = useCallback(({ item }: { item: ExploreSection }) => {
    switch (item.type) {
      case "banner":
        return <ExploreBanner />;

      case "collections":
        return <ExploreCollections />;

      case "list":
        return (
          <ExploreListSection
            exploreTitle={item.title}
            data={item.data}
            sliderType={item.sliderType}
            openBottomSheet={openBottomSheet}
          />
        );

      default:
        return null;
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          colorScheme === "dark" ? Colors.dark.cGradient2 : "transparent",
        paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 60,
      }}
    >
      <View className="flex-row">
        <TextInput
          placeholder={t("explore.search")}
          className="flex-1 px-4 mt-2 mb-2 ml-2 h-12 mr-2 text-lg bg-white dark:bg-slate-800 dark:text-slate-400 rounded-2xl"
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
        <FlatList
          data={sections}
          renderItem={renderSection}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={50}
          windowSize={5}
          initialNumToRender={5}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
        />
      )}
      {memoBottomSheet}
    </View>
  );
};

export default Explore;
