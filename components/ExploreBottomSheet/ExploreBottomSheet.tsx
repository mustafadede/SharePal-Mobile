import ImageComponent from "@/common/ImageComponent";
import {
  deleteUnfinished,
  deleteWantToWatch,
  deleteWatched,
  getSelectedUserUnfinished,
  getSelectedUserWantToWatch,
  getSelectedUserWatched,
  updateCurrentUserData,
  updateUnfinished,
  updateWantToWatch,
  updateWatched,
} from "@/services/firebaseActions";
import { RootState } from "@/store";
import { createPostsActions } from "@/store/createpostSlice";
import { modalActions } from "@/store/modalSlice";
import { profileActions } from "@/store/profileSlice";
import { shareSearchDetailActions } from "@/store/shareSearchDetail";
import { Feather } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner-native";
import StatusLabel from "../StatusLabel/StatusLabel";

type ExploreBottomSheetProps = {
  title: string;
  release_date: string;
  poster_path: string;
  mediaType: string;
  id: number;
  wanttowatch: boolean;
  watched: boolean;
  unfinished: boolean;
};

const ExploreBottomSheet = React.memo(
  ({
    bottomSheetValues,
    setBottomSheetValues,
    handlePresentModalClose,
    handleListPresentModalPress,
    feed,
  }: {
    bottomSheetValues: ExploreBottomSheetProps;
    setBottomSheetValues: Dispatch<SetStateAction<ExploreBottomSheetProps>>;
    handlePresentModalClose: () => void;
    handleListPresentModalPress?: () => void;
    feed?: boolean;
  }) => {
    const thisYear = new Date().getFullYear();
    const { t } = useTranslation();
    const profile = useSelector((state: RootState) => state.profile);
    const shareSearchDetail = useSelector(
      (state: RootState) => state.shareSearchDetail,
    );
    const dispatch = useDispatch();
    const colorScheme = useColorScheme();

    const userId = profile.userId;

    const [loadingSheetData, setLoadingSheetData] = React.useState(true);

    const fetchSheetData = async () => {
      if (!bottomSheetValues.id) return;
      setLoadingSheetData(true);
      dispatch(shareSearchDetailActions.setStatus("loading"));
      try {
        const [watchedList, wantList, unfinishedList] = await Promise.all([
          getSelectedUserWatched(userId),
          getSelectedUserWantToWatch(userId),
          getSelectedUserUnfinished(userId),
        ]);

        const idString = bottomSheetValues.id.toString();
        setBottomSheetValues((prev) => ({
          ...prev,
          watched: watchedList.some((item) => item.id.toString() === idString),
          wanttowatch: wantList.some((item) => item.id.toString() === idString),
          unfinished: unfinishedList.some(
            (item) => item.id.toString() === idString,
          ),
        }));
        dispatch(shareSearchDetailActions.setStatus("done"));
      } catch (error) {
        console.error("Error fetching bottom sheet data:", error);
        dispatch(shareSearchDetailActions.setStatus("error"));
      } finally {
        setLoadingSheetData(false);
      }
    };

    useEffect(() => {
      fetchSheetData();
    }, [bottomSheetValues.id]);

    const updateWantToWatchStatus = () => {
      if (!bottomSheetValues.wanttowatch) {
        updateWantToWatch({
          additionDate: Date.now(),
          id: bottomSheetValues.id,
          mediaType: bottomSheetValues.mediaType,
          name: profile.nick,
          photoURL: profile.photoURL,
        }).then((res) => {
          setBottomSheetValues((prev) => ({
            ...prev,
            wanttowatch: !prev.wanttowatch,
          }));
          toast(res ? t("actions.updated") : t("actions.notupdated"), {
            duration: 3000,
            closeButton: true,
            icon: (
              <FontAwesome
                name="eye"
                size={20}
                color={colorScheme === "dark" ? "#f8fafc" : "black"}
              />
            ),
            style: {
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.1)",
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: 14,
            },
          });
        });
      } else {
        deleteWantToWatch(bottomSheetValues.id).then((res) => {
          setBottomSheetValues((prev) => ({
            ...prev,
            wanttowatch: !prev.wanttowatch,
          }));
          toast(res ? t("actions.updated") : t("actions.notupdated"), {
            duration: 3000,
            closeButton: true,
            icon: (
              <FontAwesome
                name="eye-slash"
                size={20}
                color={colorScheme === "dark" ? "#f8fafc" : "black"}
              />
            ),
            style: {
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.1)",
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: 14,
            },
          });
          handlePresentModalClose();
        });
      }
    };

    const updateWatchedStatus = async () => {
      if (!bottomSheetValues.watched) {
        updateWatched({
          additionDate: Date.now(),
          id: bottomSheetValues.id,
          mediaType: bottomSheetValues.mediaType,
          name: profile.nick,
          photoURL: profile.photoURL,
        }).then((res) => {
          setBottomSheetValues((prev) => ({
            ...prev,
            watched: !prev.watched,
          }));
          if (bottomSheetValues.mediaType === "movie") {
            dispatch(profileActions.incrementTotalFilms());
          } else {
            dispatch(profileActions.incrementTotalSeries());
          }
          toast(res ? t("actions.updated") : t("actions.notupdated"), {
            duration: 3000,
            closeButton: true,
            icon: (
              <FontAwesome
                name="eye"
                size={20}
                color={colorScheme === "dark" ? "#f8fafc" : "black"}
              />
            ),
            style: {
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.1)",
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: 14,
            },
          });
        });
      } else {
        deleteWatched(bottomSheetValues.id).then((res) => {
          setBottomSheetValues((prev) => ({
            ...prev,
            watched: !prev.watched,
          }));
          if (bottomSheetValues.mediaType === "movie") {
            dispatch(profileActions.decrementTotalFilms());
          } else {
            dispatch(profileActions.decrementTotalSeries());
          }
          toast(res ? t("actions.updated") : t("actions.notupdated"), {
            duration: 3000,
            closeButton: true,
            icon: (
              <FontAwesome
                name="eye-slash"
                size={20}
                color={colorScheme === "dark" ? "#f8fafc" : "black"}
              />
            ),
            style: {
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.1)",
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: 14,
            },
          });
          handlePresentModalClose();
        });
      }
    };

    const updateUnfinishedStatus = () => {
      if (!bottomSheetValues.unfinished) {
        updateUnfinished({
          additionDate: Date.now(),
          id: bottomSheetValues.id,
          mediaType: bottomSheetValues.mediaType,
          name: profile.nick,
          photoURL: profile.photoURL,
        }).then((res) => {
          setBottomSheetValues((prev) => ({
            ...prev,
            unfinished: !prev.unfinished,
          }));
          toast(res ? t("actions.updated") : t("actions.notupdated"), {
            duration: 3000,
            closeButton: true,
            icon: (
              <FontAwesome
                name="eye"
                size={20}
                color={colorScheme === "dark" ? "#f8fafc" : "black"}
              />
            ),
            style: {
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.1)",
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: 14,
            },
          });
        });
      } else {
        deleteUnfinished(bottomSheetValues.id).then((res) => {
          setBottomSheetValues((prev) => ({
            ...prev,
            unfinished: !prev.unfinished,
          }));
          toast(res ? t("actions.updated") : t("actions.notupdated"), {
            duration: 3000,
            closeButton: true,
            icon: (
              <FontAwesome
                name="eye-slash"
                size={20}
                color={colorScheme === "dark" ? "#f8fafc" : "black"}
              />
            ),
            style: {
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.1)",
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: 14,
            },
          });
          handlePresentModalClose();
        });
      }
    };

    const handleCreatePostAction = () => {
      dispatch(
        createPostsActions.createPostAttachment({
          id: bottomSheetValues.id,
          backdrop: bottomSheetValues.poster_path,
          poster: bottomSheetValues.poster_path,
          title: bottomSheetValues.title,
          mediaType: bottomSheetValues.mediaType.toLocaleLowerCase(),
          releaseDate: bottomSheetValues.release_date,
        }),
      );
      handlePresentModalClose();
      router.push("/createpost");
    };

    const handleListAction = () => {
      handlePresentModalClose();
      dispatch(modalActions.updateModalType("create_list"));
      handleListPresentModalPress?.();
    };

    return (
      <View className="px-5 pb-40" style={{ gap: 20 }}>
        {feed ? (
          <View className="w-full h-24 border border-slate-400 rounded-2xl overflow-hidden">
            <ImageBackground
              source={{
                uri: `https://image.tmdb.org/t/p/w500${bottomSheetValues.backdrop_path || bottomSheetValues.poster_path}`,
              }}
              resizeMode="cover"
              className="flex-1 justify-end h-full"
            >
              <View className="bg-black/60 flex-row gap-4 px-4  h-full items-center">
                <View
                  className={"bg-slate-800"}
                  style={{ width: 48, height: 48, borderRadius: "50%" }}
                >
                  <ImageComponent
                    url={`https://image.tmdb.org/t/p/original${bottomSheetValues.poster_path}`}
                  />
                </View>
                <View>
                  <Text className="text-white text-2xl font-bold">
                    {bottomSheetValues.title}
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        ) : (
          <View className="w-full">
            <Text className="text-3xl font-bold dark:text-slate-100 leading-snug">
              {bottomSheetValues.title + " "}
              <Text className="font-medium text-xl text-slate-800 dark:text-slate-300">
                {t("actions.title")}
              </Text>
            </Text>
          </View>
        )}
        {/* Movie-specific */}
        {!feed &&
          bottomSheetValues.mediaType === "movie" &&
          bottomSheetValues.release_date?.slice(0, 4) ===
            thisYear.toString() && (
            <TouchableOpacity className="flex-row items-center justify-between bg-slate-600 rounded-xl px-4 py-3">
              <Text className="text-slate-100 text-base">
                {t("actions.bestmovies")}
              </Text>
              <Entypo name="star" size={22} color="yellow" />
            </TouchableOpacity>
          )}

        {!feed &&
          bottomSheetValues.mediaType === "tv" &&
          bottomSheetValues.release_date?.slice(0, 4) ===
            thisYear.toString() && (
            <TouchableOpacity className="flex-row items-center justify-between bg-slate-600 rounded-xl px-4 py-3">
              <Text className="text-slate-100 text-base">
                {t("actions.bestseries")}
              </Text>
              <Entypo name="star" size={22} color="yellow" />
            </TouchableOpacity>
          )}
        {shareSearchDetail.shareStatus === "loading" && <StatusLabel />}
        {shareSearchDetail.shareStatus === "done" && (
          <View className="w-full flex flex-col gap-3">
            {!feed && (
              <View className="h-20 flex-1 flex-row gap-4">
                <TouchableOpacity
                  onPress={handleCreatePostAction}
                  className="border border-black rounded-2xl flex-1 items-center justify-center dark:border-white/10 bg-white dark:bg-white/5"
                >
                  <Ionicons
                    name="create-outline"
                    size={30}
                    style={{ transform: [{ translateX: 2 }] }}
                    color={colorScheme === "dark" ? "#f8fafc" : "black"}
                  />
                  <Text className="text-md dark:text-slate-100 mt-1">
                    {t("createpost.title")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleListAction}
                  className="border border-black rounded-2xl flex-1 items-center justify-center dark:border-white/10 bg-white dark:bg-white/5"
                >
                  <Feather
                    name="plus"
                    size={32}
                    color={colorScheme === "dark" ? "#f8fafc" : "black"}
                  />

                  <Text className="text-md dark:text-slate-100 mt-1">
                    {t("myList.addtolist")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {/* Want to Watch */}
            <TouchableOpacity
              onPress={() => updateWantToWatchStatus()}
              className={
                bottomSheetValues.wanttowatch
                  ? "flex-row items-center justify-between rounded-xl border px-4 py-3  border-cFuchsia600 bg-cFuchsia600/20"
                  : "flex-row items-center justify-between rounded-xl border px-4 py-3  border-black dark:border-white/10 bg-white dark:bg-white/5"
              }
            >
              <Text className="dark:text-slate-100 text-base">
                {t("actions.wanttowatch")}
              </Text>
              <FontAwesome
                name="bookmark-o"
                size={22}
                color={colorScheme === "dark" ? "#f8fafc" : "black"}
              />
            </TouchableOpacity>

            {/* Watched */}
            <TouchableOpacity
              onPress={() => updateWatchedStatus()}
              className={
                bottomSheetValues.watched
                  ? "flex-row items-center justify-between rounded-xl border px-4 py-3  border-cFuchsia600 bg-cFuchsia600/20"
                  : "flex-row items-center justify-between rounded-xl border px-4 py-3  border-black dark:border-white/10 bg-white dark:bg-white/5"
              }
            >
              <Text className="text-black dark:text-slate-100 text-base">
                {t("actions.watched")}
              </Text>
              <FontAwesome
                name="bookmark"
                size={22}
                color={colorScheme === "dark" ? "#f8fafc" : "black"}
              />
            </TouchableOpacity>
            {/* Currently Watching */}
            <TouchableOpacity
              onPress={() =>
                updateCurrentUserData(profile.userId, {
                  currentlyWatching: {
                    poster: bottomSheetValues.poster_path,
                    releaseDate: bottomSheetValues.release_date,
                    title: bottomSheetValues.title,
                  },
                }).then((res) => {
                  dispatch(
                    profileActions.updateCurrentlyWatching({
                      poster: bottomSheetValues.poster_path,
                      releaseDate: bottomSheetValues.release_date,
                      title: bottomSheetValues.title,
                    }),
                  );

                  toast(
                    res
                      ? t("actions.updatecurrentlywatching")
                      : t("actions.notupdatecurrentlywatching"),
                    {
                      duration: 3000,
                      closeButton: true,
                      icon: (
                        <FontAwesome
                          name="eye"
                          size={20}
                          color={colorScheme === "dark" ? "#f8fafc" : "black"}
                        />
                      ),
                      style: {
                        backgroundColor: "transparent",
                        borderWidth: 1,
                        borderColor: "rgba(255,255,255,0.1)",
                        paddingVertical: 10,
                        paddingHorizontal: 14,
                        borderRadius: 14,
                      },
                    },
                  );
                })
              }
              className={
                profile.currentlyWatching &&
                profile.currentlyWatching.title === bottomSheetValues.title &&
                profile.currentlyWatching.releaseDate ===
                  bottomSheetValues.release_date
                  ? "flex-row items-center justify-between rounded-xl border px-4 py-3 border-cFuchsia600 bg-cFuchsia600/20"
                  : "flex-row items-center justify-between rounded-xl border px-4 py-3 border-black dark:border-white/10 bg-white dark:bg-white/5"
              }
            >
              <Text className="text-black dark:text-slate-100 text-base">
                {t("actions.currentlywatching")}
              </Text>
              <FontAwesome
                name="eye"
                size={22}
                color={colorScheme === "dark" ? "#f8fafc" : "black"}
              />
            </TouchableOpacity>

            {/* Unfinished */}
            <TouchableOpacity
              onPress={() => updateUnfinishedStatus()}
              className={
                bottomSheetValues.unfinished
                  ? "flex-row items-center justify-between rounded-xl border px-4 py-3  border-cFuchsia600 bg-cFuchsia600/20"
                  : "flex-row items-center justify-between rounded-xl border px-4 py-3  border-black dark:border-white/10 bg-white dark:bg-white/5"
              }
            >
              <Text className="dark:text-slate-100 text-base">
                {t("actions.unfinished")}
              </Text>
              <Ionicons
                name="pause-outline"
                size={22}
                color={colorScheme === "dark" ? "#f8fafc" : "black"}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  },
);

export default ExploreBottomSheet;
