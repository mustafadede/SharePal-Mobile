import ExploreBanner from "@/common/ExploreBanner";
import React from "react";
import Animated, { FadeInUp } from "react-native-reanimated";
import ExploreCollections from "../ExploreCollections/ExploreCollections";
import ExploreListSection from "../ExploreListSection/ExploreListSection";

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
        exploreTitle="explore.nowplaying"
        data={nowPlaying}
        sliderType="movie"
        setBottomSheetVisible={setBottomSheetVisible}
        setBottomSheetValues={setBottomSheetValues}
      />
      <ExploreListSection
        exploreTitle="explore.upcoming"
        data={upcoming}
        sliderType="movie"
        setBottomSheetVisible={setBottomSheetVisible}
        setBottomSheetValues={setBottomSheetValues}
      />
      <ExploreListSection
        exploreTitle="explore.nextyear"
        data={nextYear}
        sliderType="movie"
        setBottomSheetVisible={setBottomSheetVisible}
        setBottomSheetValues={setBottomSheetValues}
      />
      <ExploreListSection
        exploreTitle="explore.topmovies"
        data={top10Movies}
        sliderType="movie"
        setBottomSheetVisible={setBottomSheetVisible}
        setBottomSheetValues={setBottomSheetValues}
      />
      <ExploreListSection
        exploreTitle="explore.topseries"
        data={top10Series}
        sliderType="tv"
        setBottomSheetVisible={setBottomSheetVisible}
        setBottomSheetValues={setBottomSheetValues}
      />
    </Animated.View>
  );
};

export default Discover;
