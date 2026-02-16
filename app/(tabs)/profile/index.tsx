import CustomBottomSheet from "@/common/CustomBottomSheet";
import ActivitiesSection from "@/components/Profile/ActivitiesSection";
import FollowStats from "@/components/Profile/FollowStats";
import ListsCard from "@/components/Profile/ListsCard";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfileTabs from "@/components/Profile/ProfileTabs";
import StatsCards from "@/components/Profile/StatsCards";
import { Colors } from "@/constants/Colors";
import {
  getSelectedUser,
  getSelectedUserWatched,
} from "@/services/firebaseActions";
import { RootState } from "@/store";
import { modalActions } from "@/store/modalSlice";
import { profileActions } from "@/store/profileSlice";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  SectionList,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const colorScheme = useColorScheme();
  const profile = useSelector((state: RootState) => state.profile);
  const [tabs, setTabs] = React.useState(0);
  const dispatch = useDispatch();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    requestAnimationFrame(() => {
      bottomSheetModalRef.current?.present();
    });
  }, []);
  const handleSheetChanges = useCallback((index: number) => {}, []);
  const navigation = useNavigation();
  const [showCompactHeader, setShowCompactHeader] = useState(false);
  useEffect(() => {
    dispatch(profileActions.setStatus("Loading"));
    if (profile?.userId === "") {
      getSelectedUser(profile.userId).then((user) => {
        dispatch(profileActions.updateProfile(user));
      });
    }
    getSelectedUserWatched(profile.userId).then((watched) => {
      const filteredTVData = watched?.filter((item) => item.mediaType === "tv");
      const filteredMovieData = watched?.filter(
        (item) => item.mediaType === "movie",
      );
      dispatch(profileActions.setTotalSeries(filteredTVData.length));
      dispatch(profileActions.setTotalFilms(filteredMovieData.length));
      dispatch(profileActions.setStatus("done"));
    });
  }, []);

  const fabScale = useSharedValue(1);

  const floatingActionButton = useMemo(
    () => (
      <Animated.View
        entering={FadeInDown.springify()}
        exiting={FadeOutDown.springify()}
        style={[
          {
            position: "absolute",
            borderColor:
              colorScheme === "dark"
                ? Colors.dark.cDarkGray
                : Colors.dark.cFuc6,
            bottom: 15,
            right: 10,
            backgroundColor:
              colorScheme === "dark"
                ? Colors.dark.cGradient2
                : Colors.dark.cFuc6,
            borderRadius: 50,
            padding: 14,
            elevation: 1,
            zIndex: 10,
            borderWidth: 1,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPressIn={() => {
            fabScale.value = withSpring(0.92);
          }}
          onPressOut={() => {
            fabScale.value = withSpring(1);
          }}
          onPress={() => {
            dispatch(modalActions.updateModalType("create_list"));
            handlePresentModalPress();
          }}
        >
          <Feather name="plus" size={32} color={Colors.dark.cWhite} />
        </TouchableOpacity>
      </Animated.View>
    ),
    [colorScheme],
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: showCompactHeader
        ? () => (
            <Animated.View
              entering={FadeIn.duration(400)}
              exiting={FadeOut.duration(400)}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Image
                source={{ uri: profile.photoURL }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 16,
                  color: colorScheme === "dark" ? Colors.dark.cWhite : "black",
                }}
              >
                {profile.nick}
              </Text>
            </Animated.View>
          )
        : null,
    });
  }, [showCompactHeader]);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor:
          colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
      }}
    >
      <Animated.View className="flex-1 max-h-full">
        <SectionList
          onScroll={(event) => {
            const offsetY = event.nativeEvent.contentOffset.y;

            if (offsetY > 260 && !showCompactHeader) {
              setShowCompactHeader(true);
            }

            if (offsetY <= 260 && showCompactHeader) {
              setShowCompactHeader(false);
            }
          }}
          scrollEventThrottle={16}
          sections={[
            {
              title: "content",
              data:
                tabs === 0
                  ? ["stats"]
                  : tabs === 1
                    ? ["lists"]
                    : tabs === 3
                      ? ["activities"]
                      : [],
            },
          ]}
          keyExtractor={(item, index) => item + index}
          ListHeaderComponent={
            <View
              style={{
                minHeight: 270,
              }}
            >
              <ProfileHeader />
              <FollowStats />
            </View>
          }
          renderSectionHeader={() => (
            <View
              style={{
                backgroundColor:
                  colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
              }}
            >
              <ProfileTabs tabs={tabs} setTabs={setTabs} />
            </View>
          )}
          renderItem={({ item }) => {
            if (item === "stats") {
              return <StatsCards />;
            }

            if (item === "lists") {
              return <ListsCard />;
            }

            if (item === "activities") {
              return (
                <ActivitiesSection handleModal={handlePresentModalPress} />
              );
            }

            return null;
          }}
          stickySectionHeadersEnabled={true}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </Animated.View>
      {tabs === 1 && floatingActionButton}
      {tabs === 1 && (
        <CustomBottomSheet
          bottomSheetModalRef={bottomSheetModalRef}
          handleSheetChanges={handleSheetChanges}
        />
      )}
    </GestureHandlerRootView>
  );
};

export default Profile;
