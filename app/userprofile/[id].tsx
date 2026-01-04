import FollowStats from "@/components/Profile/FollowStats";
import ListsCard from "@/components/Profile/ListsCard";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfileTabs from "@/components/Profile/ProfileTabs";
import StatsCards from "@/components/Profile/StatsCards";
import UserProfileActions from "@/components/UserProfile/UserProfileActions";
import { Colors } from "@/constants/Colors";
import {
  getSelectedUser,
  getSelectedUserFollowing,
  getSelectedUserWatched,
} from "@/services/firebaseActions";
import { RootState } from "@/store";
import { profileActions } from "@/store/profileSlice";
import { userProfileActions } from "@/store/userProfileSlice";
import { useLocalSearchParams, useNavigation } from "expo-router";

import React, { useEffect, useLayoutEffect } from "react";
import {
  Platform,
  StatusBar as RNStatusBar,
  useColorScheme,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const { id, username } = useLocalSearchParams();
  const [tabs, setTabs] = React.useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  useEffect(() => {
    navigation.setOptions({
      title: username,
    });
  }, [id]);

  useLayoutEffect(() => {
    dispatch(userProfileActions.setStatus("Loading"));
    getSelectedUser(String(id)).then((user) => {
      dispatch(userProfileActions.updateProfile(user));
    });
    getSelectedUserFollowing(profile.userId).then((followings) => {
      dispatch(profileActions.initilizeFollowingList(followings));
    });
    getSelectedUserFollowing(String(id)).then();
    getSelectedUserWatched(String(id)).then((watched) => {
      const filteredTVData = watched?.filter((item) => item.mediaType === "tv");
      const filteredMovieData = watched?.filter(
        (item) => item.mediaType === "movie"
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
        paddingTop:
          Platform.OS === "android"
            ? (RNStatusBar.currentHeight ?? 0) + 40
            : 90,
        backgroundColor:
          colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
      }}
    >
      <ScrollView className="flex-1 bg-[#f2f2f2] dark:bg-cGradient2 px-4">
        <ProfileHeader user={true} />
        <FollowStats user={true} />
        <UserProfileActions userId={String(id)} />
        <ProfileTabs tabs={tabs} setTabs={setTabs} />
        {tabs === 0 && <StatsCards user={true} />}
        {tabs === 1 && <ListsCard user={true} />}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default UserProfile;
