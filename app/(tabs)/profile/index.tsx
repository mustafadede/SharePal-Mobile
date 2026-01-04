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
import { Feather } from "@expo/vector-icons";

import React, { useEffect, useMemo } from "react";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  FadeInDown,
  FadeOutDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const colorScheme = useColorScheme();
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

  const fabScale = useSharedValue(1);

  const fabAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: fabScale.value }],
    };
  });

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
            bottom: 110,
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
          fabAnimatedStyle,
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
          onPress={() => {}}
        >
          <Feather name="plus" size={32} color={Colors.dark.cWhite} />
        </TouchableOpacity>
      </Animated.View>
    ),
    [colorScheme]
  );

  return (
    <View className="flex-1 pt-2 bg-[#f2f2f2] dark:bg-cGradient2">
      <ScrollView className="flex-1 relative top-24 bg-[#f2f2f2] dark:bg-cGradient2 max-h-full px-4">
        <ProfileHeader />
        <FollowStats />
        <ProfileTabs tabs={tabs} setTabs={setTabs} />
        {tabs === 0 && <StatsCards />}
        {tabs === 1 && <ListsCard />}
      </ScrollView>
      {tabs === 1 && floatingActionButton}
    </View>
  );
};

export default Profile;
