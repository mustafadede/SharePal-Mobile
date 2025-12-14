import { Movie } from "@/constants/Movie";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";
import ExploreCard from "../ExploreCard/ExploreCard";
import PrimaryTitle from "../Registration/PrimaryTitle";

const ExploreListSection = ({
  exploreTitle,
  data,
  sliderType,
  openBottomSheet,
}: {
  exploreTitle: string;
  data: object[];
  sliderType: string;
  openBottomSheet: (values: any) => void;
}) => {
  const { t } = useTranslation();

  const renderItem = useCallback(
    ({ item }: { item: Movie }) => (
      <ExploreCard
        item={item}
        sliderType={sliderType}
        openBottomSheet={openBottomSheet}
      />
    ),
    [sliderType, openBottomSheet]
  );

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
            <ExploreCard
              loading={true}
              sliderType={sliderType}
              openBottomSheet={openBottomSheet}
            />
          )}
          keyExtractor={(item) => item.toString()}
        />
      )}
      {data && (
        <FlatList
          className="flex-1 px-4 mb-2 h-72"
          data={data}
          key={exploreTitle}
          horizontal
          removeClippedSubviews
          showsHorizontalScrollIndicator={false}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
          renderItem={renderItem}
          keyExtractor={(item: Movie) => item.id.toString()}
        />
      )}
    </>
  );
};

export default ExploreListSection;
