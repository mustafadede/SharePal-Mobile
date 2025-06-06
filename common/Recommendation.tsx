import ExploreCard from "@/components/ExploreCard/ExploreCard";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const Recommendation = ({ title }: { title: string }) => {
  return (
    <View className="py-2 h-max">
      <Text className="mb-2 ml-2 text-xl text-slate-200">{title}</Text>
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 270,
        }}
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
    </View>
  );
};

export default Recommendation;
