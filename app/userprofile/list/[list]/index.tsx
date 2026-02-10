import PrimaryInput from "@/common/PrimaryInput";
import ListCard from "@/components/List/ListCard";
import StatusLabel from "@/components/StatusLabel/StatusLabel";
import { RootState } from "@/store";
import { scrollActions } from "@/store/scrollSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

const ListCardItem = ({
  item,
  index,
}: {
  item: [string, any];
  index: number;
}) => {
  const [key, movie] = item;
  return <ListCard movie={movie} index={index} itemKey={key} />;
};

const index = () => {
  const { id, list } = useLocalSearchParams();
  const navigation = useNavigation();
  const profile = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { scrollPosition } = useSelector((state: RootState) => state.scroll);
  const listRef = useRef<FlatList<[string, any]> | null>(null);
  useEffect(() => {
    navigation.setOptions({
      title: list,
    });
  }, [list]);

  const selectedList = profile.lists.find(
    (list: { id: string }) => list?.id === id,
  ) as { items: any[] } | undefined;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    dispatch(scrollActions.updateScrollPosition(scrollPosition));
  };

  return (
    <GestureHandlerRootView className="flex-1 dark:bg-cGradient2">
      {selectedList ? (
        <View className="flex-1 pt-4 bg-transparent w-full justify-center items-center">
          <View className="px-4">
            <PrimaryInput placeholder={t("explore.search")} />
          </View>
          <FlatList
            data={Object.entries(selectedList?.items ?? {}) as [string, any][]}
            keyExtractor={([key]) => key}
            className="flex-col flex-1 w-full h-full pb-6"
            ref={listRef}
            contentContainerStyle={{
              width: "100%",
              justifyContent: "center",
            }}
            onScroll={handleScroll}
            renderItem={({ item, index }) => (
              <ListCardItem item={item} index={index} />
            )}
          />
        </View>
      ) : (
        <StatusLabel />
      )}
      {scrollPosition > 16 && (
        <Animated.View
          entering={FadeIn.delay(100).duration(200)}
          exiting={FadeOut.duration(100)}
          layout={Layout.springify().damping(20).stiffness(90)}
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
    </GestureHandlerRootView>
  );
};

export default index;
