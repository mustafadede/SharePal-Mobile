import DummyImage from "@/common/DummyImage";
import ActivitiesSection from "@/components/Profile/ActivitiesSection";
import FollowStats from "@/components/Profile/FollowStats";
import ListsCard from "@/components/Profile/ListsCard";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfileTabs from "@/components/Profile/ProfileTabs";
import StatsCards from "@/components/Profile/StatsCards";
import UserProfileActions from "@/components/UserProfile/UserProfileActions";
import { Colors } from "@/constants/Colors";
import {
  getSelectedUser,
  getSelectedUserWatched,
} from "@/services/firebaseActions";
import { RootState } from "@/store";
import { userProfileActions } from "@/store/userProfileSlice";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Platform,
  SectionList,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
  const { id, username } = useLocalSearchParams();
  const [tabs, setTabs] = React.useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const profile = useSelector((state: RootState) => state.userProfile);
  const handlePresentModalPress = useCallback(() => {
    requestAnimationFrame(() => {
      bottomSheetModalRef.current?.present();
    });
  }, []);
  const [showCompactHeader, setShowCompactHeader] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: username,
    });
  }, [id]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: showCompactHeader
        ? () => (
            <Animated.View
              entering={FadeIn.duration(400)}
              exiting={FadeOut.duration(400)}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              {profile.photoURL ? (
                <Image
                  source={{ uri: profile.photoURL }}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    marginRight: 8,
                  }}
                />
              ) : (
                <View
                  style={{
                    marginRight: 8,
                  }}
                >
                  <DummyImage wide={32} />
                </View>
              )}
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 16,
                  color: colorScheme === "dark" ? Colors.dark.cWhite : "black",
                }}
              >
                {username}
              </Text>
            </Animated.View>
          )
        : null,
    });
  }, [showCompactHeader]);

  useLayoutEffect(() => {
    dispatch(userProfileActions.setStatus("Loading"));
    getSelectedUser(String(id)).then((user) => {
      dispatch(userProfileActions.updateProfile(user));
    });
    getSelectedUserWatched(String(id)).then((watched) => {
      const filteredTVData = watched?.filter((item) => item.mediaType === "tv");
      const filteredMovieData = watched?.filter(
        (item) => item.mediaType === "movie",
      );
      dispatch(userProfileActions.setTotalSeries(filteredTVData.length));
      dispatch(userProfileActions.setTotalFilms(filteredMovieData.length));
      dispatch(userProfileActions.setStatus("done"));
    });
  }, []);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        paddingTop: 90,
        backgroundColor:
          colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
      }}
    >
      <View className="flex-1 max-h-full">
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
                minHeight: id ? 325 : 270,
                marginTop: Platform.OS === "ios" ? 10 : 0,
              }}
            >
              <ProfileHeader user={true} />
              <FollowStats user={true} />
              <UserProfileActions userId={String(id)} />
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
              return <StatsCards user={true} />;
            }

            if (item === "lists") {
              return <ListsCard user={true} />;
            }

            if (item === "activities") {
              return (
                <ActivitiesSection
                  handleModal={handlePresentModalPress}
                  user={true}
                />
              );
            }
            return null;
          }}
          stickySectionHeadersEnabled={true}
          contentContainerStyle={{ paddingBottom: 60 }}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default UserProfile;
