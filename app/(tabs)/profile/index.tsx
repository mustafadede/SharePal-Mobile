import ListsCard from "@/components/Profile/ListsCard";
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
import { Image, ImageBackground, SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const [tabs, setTabs] = React.useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileActions.setStatus("Loading"));
    getSelectedUser(profile.userId).then((user) => {
      dispatch(profileActions.updateProfile(user));
    });
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
        <ImageBackground
          className="flex items-center justify-center px-4 mx-4 mt-4 mb-2 h-52 bg-slate-800 rounded-2xl"
          source={
            profile.banner
              ? { uri: profile.banner }
              : require("@/assets/images/react-logo.png")
          }
          imageStyle={{ borderRadius: 20, opacity: 0.6 }}
        >
          <View className="flex-row items-center justify-start gap-4">
            <Image
              className="w-24 h-24 rounded-full"
              source={
                profile.photoURL
                  ? { uri: `${profile.photoURL}` }
                  : require("@/assets/images/react-logo.png")
              }
            />
            <View>
              <Text className="text-2xl text-white">{profile.nick}</Text>
              <Text className="text-sm italic font-bold text-slate-400">
                {profile.quote}
              </Text>
            </View>
          </View>
        </ImageBackground>

        <ProfileTabs tabs={tabs} setTabs={setTabs} />
        {tabs === 0 && <StatsCards />}
        {tabs === 1 && <ListsCard />}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
