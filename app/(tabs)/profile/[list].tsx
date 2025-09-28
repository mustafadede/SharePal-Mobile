import PrimaryInput from "@/common/PrimaryInput";
import ListCard from "@/components/List/ListCard";
import StatusLabel from "@/components/StatusLabel/StatusLabel";
import { RootState } from "@/store";
import { scrollActions } from "@/store/scrollSlice";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

const list = () => {
  const { id, list } = useLocalSearchParams();
  const navigation = useNavigation();
  const profile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      title: list,
    });
  }, [list]);
  const selectedList = profile.lists.find((list) => list?.id === id) as
    | { items: any[] }
    | undefined;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    dispatch(scrollActions.updateScrollPosition(scrollPosition));
  };

  return (
    <GestureHandlerRootView className="flex-1">
      {selectedList ? (
        <View className="flex-1 pt-4 bg-transparent w-full justify-center items-center dark:bg-cGradient2">
          <View className="px-4">
            <PrimaryInput placeholder="Search in list" />
          </View>
          <FlatList
            data={Object.entries(selectedList.list)} // returns [key, value]
            keyExtractor={([key]) => key} // unique firebase-like key
            className="flex-col flex-1 w-full h-full"
            updateCellsBatchingPeriod={50}
            contentContainerStyle={{
              width: "100%",
              justifyContent: "center",
              marginLeft: 12,
            }}
            removeClippedSubviews={true}
            windowSize={10}
            onScroll={handleScroll}
            initialNumToRender={10}
            renderItem={({ item, index }) => {
              const [key, movie] = item;
              return <ListCard movie={movie} index={index} itemKey={key} />;
            }}
          />
        </View>
      ) : (
        <StatusLabel />
      )}
    </GestureHandlerRootView>
  );
};

export default list;
