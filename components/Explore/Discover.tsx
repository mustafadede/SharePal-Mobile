import React, { useEffect, useState } from "react";
import ExploreBanner from "@/common/ExploreBanner";
import ExploreCollections from "../ExploreCollections/ExploreCollections";
import ExploreListSection from "../ExploreListSection/ExploreListSection";
import { usePopular } from "@/hooks/usePopular";

const Discover = ({
  nowPlaying,
  upcoming,
  nextYear,
  top10Movies,
  top10Series,
  setBottomSheetVisible,
  setBootomSheetValues,
}: {
  nowPlaying: Object[];
  upcoming: Object[];
  nextYear: Object[];
  top10Movies: Object[];
  top10Series: Object[];
  setBottomSheetVisible: () => void;
  setBootomSheetValues: (value: object) => void;
}) => {
  const [popular, setPopular] = useState<Object[]>();
  useEffect(() => {
    usePopular("movie").then((data) => setPopular(data));
  }, []);

  return (
    <>
      <ExploreBanner data={popular} />
      <ExploreCollections />
      <ExploreListSection
        exploreTitle="Now Playing"
        data={nowPlaying}
        sliderType="movie"
        setBottomSheetVisible={setBottomSheetVisible}
        setBootomSheetValues={setBootomSheetValues}
      />
      <ExploreListSection
        exploreTitle="Upcoming"
        data={upcoming}
        sliderType="movie"
        setBottomSheetVisible={setBottomSheetVisible}
        setBootomSheetValues={setBootomSheetValues}
      />
      <ExploreListSection
        exploreTitle="Next Year"
        data={nextYear}
        sliderType="movie"
        setBottomSheetVisible={setBottomSheetVisible}
        setBootomSheetValues={setBootomSheetValues}
      />
      <ExploreListSection
        exploreTitle="Top 10 Movies"
        data={top10Movies}
        sliderType="movie"
        setBottomSheetVisible={setBottomSheetVisible}
        setBootomSheetValues={setBootomSheetValues}
      />
      <ExploreListSection
        exploreTitle="Top 10 Series"
        data={top10Series}
        sliderType="tv"
        setBottomSheetVisible={setBottomSheetVisible}
        setBootomSheetValues={setBootomSheetValues}
      />
    </>
  );
};

export default Discover;
