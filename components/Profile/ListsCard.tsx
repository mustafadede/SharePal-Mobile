import { getSelectedUserLists } from "@/services/firebaseActions";
import { RootState } from "@/store";
import { profileActions } from "@/store/profileSlice";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import StatusLabel from "../StatusLabel/StatusLabel";

type ListItem = { title: string; [key: string]: any };

const ListsCard = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileActions.setStatus("idle"));
    getSelectedUserLists(profile.userId).then((list) => {
      dispatch(profileActions.initilizeLists(list));
      dispatch(profileActions.setStatus("done"));
    });
  }, []);

  return (
    <View className="mx-6">
      {profile.status !== "done" ? (
        <View className="align-middle">
          <StatusLabel />
        </View>
      ) : (
        <>
          {profile?.lists?.map((list: ListItem, index: number) => (
            <TouchableOpacity
              key={index}
              className="py-2 border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-200/10 rounded-xl my-1 px-4 pt-4 pb-4"
            >
              <Text className="text-slate-700 dark:text-white">
                {list.title}
              </Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </View>
  );
};

export default ListsCard;
