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
import { profileActions } from "@/store/profileSlice";

import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const [tabs, setTabs] = React.useState(0);
  const dispatch = useDispatch();
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
        (item) => item.mediaType === "movie"
      );
      dispatch(profileActions.setTotalSeries(filteredTVData.length));
      dispatch(profileActions.setTotalFilms(filteredMovieData.length));
      dispatch(profileActions.setStatus("done"));
    });
  }, []);

  return (
    <SafeAreaView
      className="flex-1 w-full h-full"
      style={{
        backgroundColor: Colors.dark.cGradient2,
        paddingTop: 80,
      }}
    >
      <View className="flex-1 bg-[#f2f2f2] dark:bg-cGradient2">
        <ProfileHeader />
        <FollowStats />
        <ProfileTabs tabs={tabs} setTabs={setTabs} />
        {tabs === 0 && <StatsCards />}
        {tabs === 1 && <ListsCard />}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
