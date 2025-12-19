import PrimaryInput from "@/common/PrimaryInput";
import ListCard from "@/components/List/ListCard";
import StatusLabel from "@/components/StatusLabel/StatusLabel";
import { RootState } from "@/store";
import { scrollActions } from "@/store/scrollSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

const ITEM_HEIGHT = 96 + 16;

const ListCardItem = React.memo(
  ({ item, index }: { item: [string, any]; index: number }) => {
    const [key, movie] = item;
    return <ListCard movie={movie} index={index} itemKey={key} />;
  }
);

const list = () => {
  const { id, list } = useLocalSearchParams();
  const navigation = useNavigation();
  const profile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { scrollPosition } = useSelector((state: RootState) => state.scroll);
  const listRef = useRef<FlatList<[string, any]> | null>(null);
  useEffect(() => {
    navigation.setOptions({
      title: list,
    });
  }, [list]);
  const selectedList = profile.lists.find((list) => list?.id === id) as
    | { items: any[] }
    | undefined;

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = event.nativeEvent.contentOffset.y;
      if (y > 16 && scrollPosition <= 16) {
        dispatch(scrollActions.updateScrollPosition(20));
      } else if (y <= 16 && scrollPosition > 16) {
        dispatch(scrollActions.updateScrollPosition(0));
      }
    },
    [dispatch, scrollPosition]
  );

  const selectedListEntries = React.useMemo(
    () =>
      selectedList?.list
        ? (Object.entries(selectedList.list) as [string, any][])
        : [],
    [selectedList]
  );

  const renderItem = useCallback(
    ({ item, index }) => <ListCardItem item={item} index={index} />,
    []
  );

  return (
    <View className="flex-1">
      {selectedList ? (
        <View className="flex-1 pt-4 bg-transparent w-full justify-center items-center dark:bg-cGradient2">
          <View className="px-4">
            <PrimaryInput placeholder={t("explore.search")} />
          </View>
          <FlatList
            getItemLayout={(_, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            data={selectedListEntries}
            keyExtractor={([key]) => key}
            className="flex-col flex-1 w-full h-full"
            ref={listRef}
            contentContainerStyle={{
              width: "100%",
              justifyContent: "center",
              paddingBottom: 65,
            }}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            removeClippedSubviews
            windowSize={5}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={50}
            renderItem={renderItem}
          />
        </View>
      ) : (
        <StatusLabel />
      )}
      {scrollPosition > 16 && (
        <Animated.View
          entering={FadeIn.duration(150)}
          exiting={FadeOut.duration(100)}
          style={{ elevation: 5 }}
          pointerEvents="box-none"
          accessible={true}
          accessibilityLabel="Scroll to top"
          accessibilityHint="Navigates to the top of the list"
          accessibilityRole="button"
          accessibilityState={{ disabled: false }}
          importantForAccessibility="yes"
          testID="scroll-to-top-button"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          className="shadow-lg absolute bottom-8 right-4 rounded-2xl mx-auto z-50 bg-fuchsia-600"
          onStartShouldSetResponder={() => true}
        >
          <TouchableOpacity
            onPress={() => {
              if (selectedList && selectedList.list) {
                listRef.current?.scrollToOffset({
                  animated: true,
                  offset: 0,
                });
              }
            }}
            className="w-12 h-12 flex-row rounded-full bg-cFuc6 justify-center items-center shadow-lg"
          >
            <Ionicons name="arrow-up" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default list;
