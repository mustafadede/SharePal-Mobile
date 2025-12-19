import StatusLabel from "@/components/StatusLabel/StatusLabel";
import {
  isUserItem,
  SearchDetailParams,
  UserItem,
} from "@/constants/SearchDetail";
import {
  getSelectedUserUnfinished,
  getSelectedUserWantToWatch,
  getSelectedUserWatched,
} from "@/services/firebaseActions";
import { RootState } from "@/store";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";

type Props = {
  title: string;
  icon?: React.ReactNode;
};

const PeopleRow = ({ title, icon }: Props) => {
  const { id } = useLocalSearchParams() as SearchDetailParams;
  const { followingList } = useSelector((state: RootState) => state.profile);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUsers([]);
    setLoading(true);

    if (!followingList || followingList.length === 0) {
      setLoading(false);
      return;
    }

    const mediaId = Number(id);

    const fetcher =
      title === "Want to Watch"
        ? getSelectedUserWantToWatch
        : title === "Watched"
          ? getSelectedUserWatched
          : getSelectedUserUnfinished;

    Promise.all(
      followingList.map(async (following) => {
        const res = await fetcher(following.uid);

        const hasThisMedia = res.some((item) => item.id === mediaId);

        if (hasThisMedia) {
          return {
            uid: following.uid,
            name: res[0].name,
            photoURL: res[0].photoURL,
          };
        }

        return null;
      })
    ).then((results) => {
      setUsers(results.filter(isUserItem));
      setLoading(false);
    });
  }, [followingList, id, title]);

  return (
    <View className="mt-6">
      <View className="flex-row px-4 justify-start items-center gap-2 mb-3">
        {icon}
        <Text className="text-2xl text-black dark:text-slate-300 mt-1">
          {title}
        </Text>
        <Text className="text-sm text-slate-500 mt-2">({users.length})</Text>
      </View>
      {loading && <StatusLabel />}
      {!loading && users && (
        <View className="flex-row gap-3">
          {users.length === 0 ? (
            <Text className="text-md px-4 text-slate-500 dark:text-slate-400">
              No activity yet
            </Text>
          ) : (
            <FlatList
              data={users.slice(0, 8)}
              keyExtractor={(item, index) => item.uid + index}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View className="items-center w-16 ml-3">
                  <Avatar
                    uid={item.uid}
                    photoURL={item.photoURL}
                    name={item.name}
                  />
                </View>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default PeopleRow;
