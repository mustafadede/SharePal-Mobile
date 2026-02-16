import InfoLabel from "@/common/InfoLabel";
import { Colors } from "@/constants/Colors";
import { getSelectedUserLists } from "@/services/firebaseActions";
import { RootState } from "@/store";
import { profileActions } from "@/store/profileSlice";
import { userProfileActions } from "@/store/userProfileSlice";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useDispatch, useSelector } from "react-redux";
import StatusLabel from "../StatusLabel/StatusLabel";

export type ListItem = { title: string; [key: string]: any };

const ListsCard = ({ user = false }: { user?: boolean }) => {
  const otherProfile = useSelector((state: RootState) => state.userProfile);
  const yourProfile = useSelector((state: RootState) => state.profile);
  const [loading, setLoading] = useState(true);
  const profile = user ? otherProfile : yourProfile;
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(profileActions.setStatus("idle"));
        dispatch(userProfileActions.resetLists());
        dispatch(profileActions.resetLists());
        const selectedUserId = user ? String(id) : profile.userId;
        const list = await getSelectedUserLists(selectedUserId);

        if (!list || list instanceof Error) {
          dispatch(profileActions.initilizeLists([]));
          dispatch(userProfileActions.initilizeLists([]));
        } else {
          if (user) {
            dispatch(userProfileActions.initilizeLists(list));
            dispatch(userProfileActions.setStatus("done"));
          } else {
            dispatch(profileActions.initilizeLists(list));
            dispatch(profileActions.setStatus("done"));
          }
        }
        setLoading(false);
      } catch (error) {
        console.log("List fetch error:", error);
        dispatch(profileActions.initilizeLists([]));
        dispatch(userProfileActions.initilizeLists([]));
        dispatch(profileActions.setStatus("done"));
        dispatch(userProfileActions.setStatus("done"));
      }
    };

    fetch();
  }, []);

  const renderItem = useCallback(({ item }: { item: ListItem }) => {
    return (
      <Swipeable
        onSwipeableWillOpen={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        }}
        renderRightActions={() => (
          <>
            <TouchableOpacity
              onPress={() => {
                // Handle delete action here
              }}
              className="ml-4 justify-center px-6 items-center rounded-xl"
            >
              <MaterialIcons name="delete" size={23} color="#b91c1c" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // Handle edit action here
              }}
              className="ml-4 justify-center px-6 items-center rounded-xl"
            >
              <Feather name="edit-3" size={21} color={Colors.dark.cFuc6} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.navigate("/explore");
              }}
              className="ml-4 justify-center px-6 items-center rounded-xl"
            >
              <Ionicons
                name="add-outline"
                size={28}
                color={Colors.dark.cFuc6}
              />
            </TouchableOpacity>
          </>
        )}
        friction={2}
        rightThreshold={40}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            router.push({
              pathname: "/profile/[list]",
              params: { list: item.title, id: item.id },
            })
          }
          className="py-2 mx-4 px-4 border bg-white dark:bg-slate-900 flex-row justify-between border-slate-200 dark:border-slate-200/10 rounded-xl my-1 pt-4 pb-4"
        >
          <Text className="text-slate-700 dark:text-white">{item.title}</Text>
          {item.isPinned && (
            <MaterialIcons
              name="push-pin"
              size={18}
              color={Colors.dark.cFuc6}
            />
          )}
        </TouchableOpacity>
      </Swipeable>
    );
  }, []);

  return (
    <View className="flex-1 h-full">
      {user && (
        <TouchableOpacity
          activeOpacity={1}
          className="rounded-xl px-5 py-4 flex flex-row mb-2 justify-between"
        >
          <Text className="text-slate-600 dark:text-slate-200">
            {t("profile.createlistforuser")}
          </Text>
          <Feather
            name="chevron-right"
            size={18}
            color={colorScheme === "dark" ? "#e2e8f0" : "#475569"}
          />
        </TouchableOpacity>
      )}
      {!user && (
        <View>
          {profile.status !== "done" ? (
            <View className="align-middle">
              <StatusLabel />
            </View>
          ) : (
            <FlatList
              data={profile?.lists}
              keyExtractor={(item, index) =>
                item.id ? item.id.toString() : index.toString()
              }
              renderItem={renderItem}
              scrollEnabled={false}
              removeClippedSubviews={false}
            />
          )}
        </View>
      )}
      {user && loading ? (
        <View className="align-middle">
          <StatusLabel />
        </View>
      ) : (
        otherProfile.lists?.map((list: ListItem, index: number) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            onPress={() =>
              router.push({
                pathname: "/userprofile/list/[list]",
                params: { list: list.title, id: list.id },
              })
            }
            className="py-2 mx-4 border bg-white dark:bg-slate-900 flex-row justify-between border-slate-200 dark:border-slate-200/10 rounded-xl my-1 px-4 pt-4 pb-4"
          >
            <Text className="text-slate-700 dark:text-white">{list.title}</Text>
            {list.isPinned && (
              <MaterialIcons
                name="push-pin"
                size={18}
                color={Colors.dark.cFuc6}
                style={{
                  transform: [{ rotate: "45deg" }],
                }}
              />
            )}
          </TouchableOpacity>
        ))
      )}
      {!loading && id && !otherProfile.lists.length && (
        <View className="mt-2">
          <InfoLabel status="Kullanıcıya ait bir liste yoktur" small />
        </View>
      )}
    </View>
  );
};

export default ListsCard;
