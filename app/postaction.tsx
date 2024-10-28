import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import ExploreCard from "@/components/ExploreCard/ExploreCard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { postsActions } from "@/store/postSlice";
import { useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";

const postaction = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state: RootState) => state.profile);
  const { createdPost, createdPostLength, attachedFilm, status, error } = useSelector((state: RootState) => state.post);
  const navigation = useNavigation();
  useEffect(() => {
    console.log("createdPostLength", createdPostLength);

    navigation.setOptions({
      headerRight: () =>
        createdPostLength > 0 && createdPostLength <= 280 ? (
          <TouchableOpacity onPress={() => console.log("post")}>
            <Feather name="send" size={24} color={Colors.dark.cWhite} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled onPress={() => console.log("disable")}>
            <Feather name="send" size={24} color={Colors.dark.icon} />
          </TouchableOpacity>
        ),
    });
  }, [createdPostLength]);

  return (
    <ScrollView className="flex-1 p-4 bg-cGradient2">
      <TextInput
        autoFocus
        style={{ backgroundColor: "#1e293b", borderRadius: 12, padding: 8, color: Colors.dark.cWhite }}
        multiline
        textAlignVertical="top"
        numberOfLines={6}
        onChange={(e) => {
          dispatch(postsActions.createPostLength(e.nativeEvent.text.length));
        }}
        placeholderTextColor={"#ffffff"}
        placeholder="What's happening?"
      />
      <View className={"flex-row justify-around items-center pt-4 gap-2"}>
        <TouchableOpacity onPress={() => console.log("attach")} className="flex-row flex-1 px-4 py-2 rounded-md bg-slate-800">
          <Entypo name="attachment" size={18} color="white" />
          <Text className="ml-2 text-white">Attach Film/Series</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(postsActions.setSpoiler())}
          className={
            createdPost.spoiler ? "flex-row flex-1 px-4 py-2 rounded-md bg-slate-600" : "flex-row flex-1 px-4 py-2 rounded-md bg-slate-800"
          }
        >
          {!createdPost.spoiler ? <Feather name="unlock" size={18} color="white" /> : <Feather name="lock" size={18} color="white" />}
          <Text className="ml-2 text-white">Sshhh! Spoiler!</Text>
        </TouchableOpacity>
      </View>
      <View
        className="mt-4 border-slate-200"
        style={{
          borderWidth: 0.4,
        }}
      ></View>
      <View className="py-2">
        <Text className="mb-2 text-xl text-slate-200">Last search</Text>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexDirection: "row", justifyContent: "space-between", height: 270 }}
        >
          <ExploreCard
            item={{
              poster_path: "/r6q9wZK5a2K51KFj4LWVID6Ja1r.jpg",
              id: 207703,
              original_title: "Kingsman: The Secret Service",
              name: "Kingsman: The Secret Service",
              media_type: "movie",
              original_language: "en",
              genres: [28, 12, 35],
              first_air_date: "2015-01-24",
            }}
          />
          <ExploreCard
            item={{
              poster_path: "/34xBL6BXNYFqtHO9zhcgoakS4aP.jpg",
              id: 343668,
              original_title: "Kingsman: The Golden Circle",
              name: "Kingsman: The Golden Circle",
              media_type: "tv",
              original_language: "en",
              genres: [28, 12, 35],
              first_air_date: "2017-09-20",
            }}
          />
          <ExploreCard
            item={{
              poster_path: "/dMOpdkrDC5dQxqNydgKxXjBKyAc.jpg",
              id: 95557,
              original_title: "INVINCIBLE",
              name: "INVINCIBLE",
              media_type: "tv",
              original_language: "en",
              genres: [16, 10765, 10759, 18],
              first_air_date: "2021-03-25",
            }}
          />
          <ExploreCard
            item={{
              poster_path: "/xXKcfZE7ulYxgjjYv51s0zDG69s.jpg",
              id: 46786,
              original_title: "Bates Motel",
              name: "Bates Motel",
              media_type: "tv",
              original_language: "en",
              genres: [16, 10765, 10759, 18],
              first_air_date: "2013-03-18",
            }}
          />
        </ScrollView>
        {/* <View className="flex-row items-center justify-between py-2">
            <Text className="text-white">The Witcher</Text>
            <TouchableOpacity onPress={() => console.log("search")}>
              <Feather name="search" size={18} color="white" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center justify-between py-2">
            <Text className="text-white">Bates Motel</Text>
            <TouchableOpacity onPress={() => console.log("search")}>
              <Feather name="search" size={18} color="white" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center justify-between py-2">
            <Text className="text-white">Invincible</Text>
            <TouchableOpacity onPress={() => console.log("search")}>
              <Feather name="search" size={18} color="white" />
            </TouchableOpacity>
          </View> */}
      </View>
      <View className="py-2">
        <Text className={"text-xl text-slate-200 mb-2"}>Suggestions</Text>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexDirection: "row", justifyContent: "space-between", height: 270 }}
        >
          <ExploreCard
            item={{
              poster_path: "/dMOpdkrDC5dQxqNydgKxXjBKyAc.jpg",
              id: 95557,
              original_title: "INVINCIBLE",
              name: "INVINCIBLE",
              media_type: "tv",
              original_language: "en",
              genres: [16, 10765, 10759, 18],
              first_air_date: "2021-03-25",
            }}
          />
          <ExploreCard
            item={{
              poster_path: "/xXKcfZE7ulYxgjjYv51s0zDG69s.jpg",
              id: 46786,
              original_title: "Bates Motel",
              name: "Bates Motel",
              media_type: "tv",
              original_language: "en",
              genres: [16, 10765, 10759, 18],
              first_air_date: "2013-03-18",
            }}
          />
          <ExploreCard
            item={{
              poster_path: "/r6q9wZK5a2K51KFj4LWVID6Ja1r.jpg",
              id: 207703,
              original_title: "Kingsman: The Secret Service",
              name: "Kingsman: The Secret Service",
              media_type: "movie",
              original_language: "en",
              genres: [28, 12, 35],
              first_air_date: "2015-01-24",
            }}
          />
          <ExploreCard
            item={{
              poster_path: "/34xBL6BXNYFqtHO9zhcgoakS4aP.jpg",
              id: 343668,
              original_title: "Kingsman: The Golden Circle",
              name: "Kingsman: The Golden Circle",
              media_type: "tv",
              original_language: "en",
              genres: [28, 12, 35],
              first_air_date: "2017-09-20",
            }}
          />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default postaction;
