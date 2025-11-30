import { Colors } from "@/constants/Colors";
import { getSelectedUserLists } from "@/services/firebaseActions";
import { RootState } from "@/store";
import { profileActions } from "@/store/profileSlice";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import StatusLabel from "../StatusLabel/StatusLabel";

type ListItem = { title: string; [key: string]: any };

const ListsCard = ({ user = false }: { user?: boolean }) => {
  const otherProfile = useSelector((state: RootState) => state.userProfile);
  const yourProfile = useSelector((state: RootState) => state.profile);
  const profile = user ? otherProfile : yourProfile;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileActions.setStatus("idle"));
    getSelectedUserLists(profile.userId).then((list) => {
      dispatch(profileActions.initilizeLists(list));
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
      <GestureHandlerRootView>
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
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default ListsCard;
