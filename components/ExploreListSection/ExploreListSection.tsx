import { Movie } from "@/constants/Movie";
import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";
import ExploreCard from "../ExploreCard/ExploreCard";
import PrimaryTitle from "../Registration/PrimaryTitle";

const renderExploreItem =
  (
    sliderType: string,
    setBottomSheetVisible: () => void,
    setBottomSheetValues: (value: object) => void
  ) =>
  ({ item }: { item: Movie }) =>
    (
      <ExploreCard
        item={item}
        sliderType={sliderType}
        setBottomSheetVisible={setBottomSheetVisible}
        setBottomSheetValues={setBottomSheetValues}
      />
    );

const ExploreListSection = ({
  exploreTitle,
  data,
  sliderType,
  setBottomSheetVisible,
  setBottomSheetValues,
}: {
  exploreTitle: string;
  data: object[];
  sliderType: string;
  setBottomSheetVisible: () => void;
  setBottomSheetValues: (value: object) => void;
}) => {
  const { t } = useTranslation();
  return (
    <>
      <PrimaryTitle title={t(exploreTitle)} additionalClassnames="pl-4" />
      {!data && (
        <FlatList
          key={"nowPlaying"}
          className="flex-1 px-4 mb-2 h-72 gap-10"
          showsHorizontalScrollIndicator={false}
          data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          horizontal
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
          renderItem={({ item }: { item: number }) => (
            <ExploreCard loading={true} />
          )}
          keyExtractor={(item) => item}
        />
      )}
      {data && (
        <FlatList
          className="flex-1 px-4 mb-2 h-72"
          data={data}
          key={exploreTitle}
          horizontal
          showsHorizontalScrollIndicator={false}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
          renderItem={renderExploreItem(
            sliderType,
            setBottomSheetVisible,
            setBottomSheetValues
          )}
          keyExtractor={(item: Movie) => item.id.toString()}
        />
      )}
    </>
  );
};

export default ExploreListSection;
