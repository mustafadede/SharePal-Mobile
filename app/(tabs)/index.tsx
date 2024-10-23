import { View, Text, RefreshControl, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllPosts, getSelectedUser } from "@/services/firebaseActions";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { profileActions } from "@/store/profileSlice";
import { ProfileHeader } from "@/constants/Profile";
import { Colors } from "@/constants/Colors";
import FeedCard from "@/components/FeedPage/FeedCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Index = () => {
  const { userId } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [status, setStatus] = useState("loading");
  useEffect(() => {}, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    getAllPosts().then((res) => {
      setData(res);
      setIsRefreshing(false);
      setStatus("done");
    });
  };

  useEffect(() => {
    if (userId) {
      getSelectedUser(userId).then((user: ProfileHeader) => {
        dispatch(
          profileActions.updateProfile({
            ...user,
          })
        );

        getAllPosts().then((res) => {
          setData(res);
          setStatus("done");
        });
      });
    }
  }, [userId, isRefreshing]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className={"flex-1 w-full h-full px-3 pt-10"} style={{ backgroundColor: Colors.dark.cGradient2 }}>
        {status === "done" && (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl
                colors={["#9F23B3"]}
                refreshing={isRefreshing}
                progressBackgroundColor={"#0E0B13"}
                onRefresh={onRefresh}
                tintColor={"#9F23B3"}
              />
            }
            data={data || []}
            showsVerticalScrollIndicator={false}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            renderItem={({ item, index }) => <FeedCard data={item} index={index} />}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
};

export default Index;
