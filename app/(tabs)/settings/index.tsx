import StatusLabel from "@/components/StatusLabel/StatusLabel";
import { Colors } from "@/constants/Colors";
import useSearchWithYear from "@/hooks/useSearchWithYear";
import { getSelectedUserWatched } from "@/services/firebaseActions";
import { RootState } from "@/store";
import { profileActions } from "@/store/profileSlice";
import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  StatusBar as RNStatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Settings = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const [tabs, setTabs] = React.useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileActions.setStatus("Loading"));
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
  const handleCurrentlyWatching = () => {
    useSearchWithYear(
      profile.currentlyWatching.title,
      profile.currentlyWatching.releaseDate?.slice(0, 4)
    ).then((item) => {
      router.push({
        pathname: "/searchdetail",
        params: {
          title: item.title || item.name,
          release_date: item.release_date || item.first_air_date,
          poster_path: item.poster_path || item.backdrop_path,
          mediaType: "Movie" || item.media_type,
          id: item.id,
          backdrop_path:
            item.backdrop_path || item.poster_path || item.backdrop_path,
        },
      });
    });
  };

  return (
    <SafeAreaView
      className="flex-1 w-full h-full"
      style={{
        backgroundColor: Colors.dark.cGradient2,
        paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0, // Sadece Android için padding ekler
      }}
    >
      <View className="flex-1 bg-[#f2f2f2] dark:bg-cGradient2">
        <ImageBackground
          className="flex items-center justify-center px-4 mx-4 mt-4 mb-2 h-52 bg-slate-800 rounded-2xl"
          source={profile.banner && { uri: profile.banner }}
          imageStyle={{ borderRadius: 20, opacity: 0.6 }}
        >
          <View className="flex-row items-center justify-start gap-4">
            <Image
              className="w-24 h-24 rounded-full"
              source={profile.photoURL && { uri: profile.photoURL }}
            />
            <View>
              <Text className="text-2xl text-white">{profile.nick}</Text>
              <Text className="text-sm italic font-bold text-slate-400">
                {profile.quote}
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View className="flex-row items-center justify-center gap-4 py-4 mx-4 my-2 rounded-2xl bg-slate-900">
          <View className="items-center flex-1">
            <Text className="text-lg text-white">{profile.followers}</Text>
            <Text className="text-lg text-white">Followers</Text>
          </View>
          <View className="border-l-2 border-slate-700"></View>
          <View className="items-center flex-1">
            <Text className="text-lg text-white">{profile.following}</Text>
            <Text className="text-lg text-white">Following</Text>
          </View>
          <View className="border-l-2 border-slate-700"></View>
          <View className="items-center flex-1 mr-4">
            <Text className="text-lg text-fuchsia-600">#1</Text>
            <Text className="text-lg text-white">{profile.topOne}</Text>
          </View>
        </View>
        <View className="flex-row justify-center gap-2 pb-4 mx-4 my-1 rounded-2xl">
          <TouchableOpacity
            className={
              tabs === 0
                ? "px-1 flex-1 justify-center bg-fuchsia-600 rounded-xl"
                : "px-1 justify-center flex-1 py-2 bg-transparent"
            }
            onPress={() => setTabs(0)}
          >
            <Text
              className={
                tabs === 0
                  ? "text-slate-50 dark:text-slate-950 text-center"
                  : "dark:text-white text-center"
              }
            >
              Stats
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={
              tabs === 1
                ? "px-1 flex-1 justify-center bg-fuchsia-600 rounded-xl"
                : "px-1 justify-center flex-1 py-2 bg-transparent"
            }
            onPress={() => setTabs(1)}
          >
            <Text
              className={
                tabs === 1
                  ? "text-slate-50 dark:text-slate-950 text-center"
                  : "dark:text-white text-center"
              }
            >
              Lists
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={
              tabs === 2
                ? "px-1 flex-1 justify-center bg-fuchsia-600 rounded-xl"
                : "px-1 justify-center flex-1 py-2 bg-transparent"
            }
            onPress={() => setTabs(2)}
          >
            <Text
              className={
                tabs === 2
                  ? "text-slate-50 dark:text-slate-950 text-center"
                  : "dark:text-white text-center"
              }
            >
              Posts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={
              tabs === 3
                ? "px-1 flex-1 justify-center bg-fuchsia-600 rounded-xl"
                : "px-1 justify-center flex-1 py-2 bg-transparent"
            }
            onPress={() => setTabs(3)}
          >
            <Text
              className={
                tabs === 3
                  ? "text-slate-50 dark:text-slate-950 text-center"
                  : "dark:text-white text-center"
              }
            >
              Activities
            </Text>
          </TouchableOpacity>
        </View>
        {tabs === 0 && (
          <View className="items-center flex-1 pb-4 mx-6">
            <View className="items-start justify-center w-full px-4 py-2 h-fit bg-slate-900 rounded-2xl">
              <Text className="mb-3 text-2xl font-bold text-white">
                Currently Watching
              </Text>
              <TouchableOpacity
                className="flex-row items-center gap-4"
                onPress={() => handleCurrentlyWatching()}
              >
                <Image
                  className="rounded-lg w-28 h-36"
                  source={{
                    uri: `https://image.tmdb.org/t/p/original/${profile.currentlyWatching.poster}`,
                  }}
                />
                <View className="gap-1">
                  <Text className="text-lg text-white">
                    {profile.currentlyWatching.title}
                  </Text>
                  <Text className="text-lg text-slate-400">
                    ({profile.currentlyWatching.releaseDate?.slice(0, 4)})
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View className="flex-row gap-4 my-1">
              <View className="flex-1 px-4 pb-4 rounded-2xl bg-slate-900 h-fit">
                <Text className="mt-4 text-xl font-bold text-white">
                  Total Films
                </Text>

                {profile.status === "done" ? (
                  <Text className="text-2xl text-slate-400">
                    {profile.totalFilms}
                  </Text>
                ) : (
                  <StatusLabel />
                )}
              </View>
              <View className="flex-1 px-4 pb-4 rounded-2xl bg-slate-900 h-fit">
                <Text className="mt-4 text-xl font-bold text-white">
                  Total Series
                </Text>
                {profile.status === "done" ? (
                  <Text className="text-2xl text-slate-400">
                    {profile.totalSeries}
                  </Text>
                ) : (
                  <StatusLabel />
                )}
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Settings;
