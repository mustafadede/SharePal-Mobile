import { TextInput, FlatList, Text, View, Image, TouchableOpacity, ImageBackground, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import PrimaryTitle from "@/components/Registration/PrimaryTitle";
import useNowPlaying from "../../../hooks/useNowPlaying";
import ExploreCard from "@/components/ExploreCard/ExploreCard";
import useUpcoming from "@/hooks/useUpcoming";
import { Movie } from "@/constants/Movie";
import useNextYear from "@/hooks/useNextYear";
import useTop10 from "@/hooks/useTop10";
import BottomSheetSkeleton from "@/components/BottomSheetSkeleton/BotomSheetSkeleton";
import ExploreBottomSheet from "@/components/ExploreBottomSheet/ExploreBottomSheet";
import Collection from "@/utils/explore-collection.json";
import ExploreCollection from "@/common/ExploreCollection";
import ExploreListSection from "@/components/ExploreListSection/ExploreListSection";

const Explore = () => {
  const [nowPlaying, setNowPlaying] = useState<Object[]>();
  const [upcoming, setUpcoming] = useState<Object[]>();
  const [nextYear, setNextYear] = useState<Object[]>();
  const [top10Movies, setTop10Movies] = useState<Object[]>();
  const [top10Series, setTop10Series] = useState<Object[]>();
  const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false);
  const [bootomSheetValues, setBootomSheetValues] = useState<object>({});
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row h-24 mb-3">
          <FlatList
            key={"Collection"}
            data={Collection}
            horizontal
            renderItem={({ item }) => <ExploreCollection title={item.title} photo={item.uri} />}
            keyExtractor={(item, index) => item.id.toString()}
          />
        </ScrollView>
        <ExploreListSection
          exploreTitle="Now Playing"
          data={nowPlaying}
          setBottomSheetVisible={setBottomSheetVisible}
          setBootomSheetValues={setBootomSheetValues}
        />
        <ExploreListSection
          exploreTitle="Upcoming"
          data={upcoming}
          setBottomSheetVisible={setBottomSheetVisible}
          setBootomSheetValues={setBootomSheetValues}
        />
        <ExploreListSection
          exploreTitle="Next Year"
          data={nextYear}
          setBottomSheetVisible={setBottomSheetVisible}
          setBootomSheetValues={setBootomSheetValues}
        />
        <ExploreListSection
          exploreTitle="Top 10 Movies"
          data={top10Movies}
          setBottomSheetVisible={setBottomSheetVisible}
          setBootomSheetValues={setBootomSheetValues}
        />
        <ExploreListSection
          exploreTitle="Top 10 Series"
          data={top10Series}
          setBottomSheetVisible={setBottomSheetVisible}
          setBootomSheetValues={setBootomSheetValues}
        />
      </ScrollView>
      {bottomSheetVisible && (
        <BottomSheetSkeleton setBottomSheetVisible={setBottomSheetVisible}>
          <ExploreBottomSheet bootomSheetValues={bootomSheetValues} />
        </BottomSheetSkeleton>
      )}
    </GestureHandlerRootView>
  );
};

export default Explore;
