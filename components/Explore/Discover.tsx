import React from "react";
import ExploreBanner from "@/common/ExploreBanner";
import ExploreCollections from "../ExploreCollections/ExploreCollections";
import ExploreListSection from "../ExploreListSection/ExploreListSection";
import Animated, { FadeInUp } from "react-native-reanimated";

const Discover = ({
  nowPlaying,
  upcoming,
  nextYear,
  top10Movies,
  top10Series,
  setBottomSheetVisible,
  setBottomSheetValues,
}: {
  nowPlaying: Object[];
  upcoming: Object[];
  nextYear: Object[];
  top10Movies: Object[];
  top10Series: Object[];
  setBottomSheetVisible: () => void;
  setBottomSheetValues: (value: object) => void;
}) => {
  return (
    <Animated.View entering={FadeInUp.delay(100).duration(200)}>
      <ExploreBanner />
      <ExploreCollections />
      <ExploreListSection
        exploreTitle="Now Playing"
        data={nowPlaying}
        sliderType="movie"
        setBottomSheetVisible={setBottomSheetVisible}
        setBottomSheetValues={setBottomSheetValues}
      />
      <ExploreListSection
        exploreTitle="Upcoming"
        data={upcoming}
        sliderType="movie"
        setBottomSheetVisible={setBottomSheetVisible}
        setBottomSheetValues={setBottomSheetValues}
      />
      <ExploreListSection
        exploreTitle="Next Year"
        data={nextYear}
        sliderType="movie"
        setBottomSheetVisible={setBottomSheetVisible}
        setBottomSheetValues={setBottomSheetValues}
      />
      <ExploreListSection
        exploreTitle="Top 10 Movies"
        data={top10Movies}
        sliderType="movie"
        setBottomSheetVisible={setBottomSheetVisible}
        setBottomSheetValues={setBottomSheetValues}
      />
      <ExploreListSection
        exploreTitle="Top 10 Series"
        data={top10Series}
        sliderType="tv"
        setBottomSheetVisible={setBottomSheetVisible}
        setBottomSheetValues={setBottomSheetValues}
      />
    </Animated.View>
  );
};

export default Discover;
