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
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useDispatch, useSelector } from "react-redux";
import StatusLabel from "../StatusLabel/StatusLabel";

type ListItem = { title: string; [key: string]: any };

const ListsCard = ({ user = false }: { user?: boolean }) => {
  const otherProfile = useSelector((state: RootState) => state.userProfile);
  const yourProfile = useSelector((state: RootState) => state.profile);
  const [loading, setLoading] = useState(true);
  const profile = user ? otherProfile : yourProfile;
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(profileActions.setStatus("idle"));
        dispatch(userProfileActions.resetLists());
        dispatch(profileActions.resetLists());
        const list = await getSelectedUserLists(
          user ? String(id) : profile.userId
        );

        if (!list || list instanceof Error) {
          dispatch(profileActions.initilizeLists([]));
        } else {
          if (id) {
            dispatch(userProfileActions.initilizeLists(list));
          } else {
            dispatch(profileActions.initilizeLists(list));
          }
        }
        setLoading(false);
        dispatch(profileActions.setStatus("done"));
      } catch (error) {
        console.log("List fetch error:", error);
        dispatch(profileActions.initilizeLists([]));
        dispatch(profileActions.setStatus("done"));
      }
    };

    fetch();
  }, []);

  return (
    <GestureHandlerRootView>
      {user && (
        <TouchableOpacity
          activeOpacity={1}
          className="py-2 bg-fuchsia-600 items-center flex-row justify-between rounded-xl my-1 px-4 pt-4 pb-4"
        >
          <Text className="text-white">{t("profile.createlistforuser")}</Text>
          <Feather name="chevron-right" size={18} color={"white"} />
        </TouchableOpacity>
      )}
      {!user && (
        <View>
          {profile.status !== "done" ? (
            <View className="align-middle">
              <StatusLabel />
            </View>
          ) : (
            <>
              {profile?.lists?.map((list: ListItem, index: number) => (
                <Swipeable
                  key={index}
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
                        <MaterialIcons
                          name="delete"
                          size={23}
                          color="#b91c1c"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          // Handle delete action here
                        }}
                        className="ml-4 justify-center px-6 items-center rounded-xl"
                      >
                        <Feather
                          name="edit-3"
                          size={21}
                          color={Colors.dark.cFuc6}
                        />
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
                        params: { list: list.title, id: list.id },
                      })
                    }
                    className="py-2 border bg-white dark:bg-slate-900 flex-row justify-between border-slate-200 dark:border-slate-200/10 rounded-xl my-1 px-4 pt-4 pb-4"
                  >
                    <Text className="text-slate-700 dark:text-white">
                      {list.title}
                    </Text>
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
                </Swipeable>
              ))}
            </>
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
            className="py-2 border bg-white dark:bg-slate-900 flex-row justify-between border-slate-200 dark:border-slate-200/10 rounded-xl my-1 px-4 pt-4 pb-4"
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
        <InfoLabel status="Kullanıcıya ait bir liste yoktur" small />
      )}
    </GestureHandlerRootView>
  );
};

export default ListsCard;
