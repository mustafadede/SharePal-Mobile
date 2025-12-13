import {
  getSelectedUserUnfinished,
  getSelectedUserWantToWatch,
  getSelectedUserWatched,
  updateCurrentUserData,
  updateUnfinished,
  updateWantToWatch,
  updateWatched,
} from "@/services/firebaseActions";
import { RootState } from "@/store";
import { profileActions } from "@/store/profileSlice";
import { shareSearchDetailActions } from "@/store/shareSearchDetail";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
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
  }: {
    bottomSheetValues: ExploreBottomSheetProps;
    setBottomSheetValues: Dispatch<SetStateAction<ExploreBottomSheetProps>>;
    handlePresentModalClose: () => void;
  }) => {
    const thisYear = new Date().getFullYear();
    const { t } = useTranslation();
    const profile = useSelector((state: RootState) => state.profile);
    const shareSearchDetail = useSelector(
      (state: RootState) => state.shareSearchDetail
    );
    const dispatch = useDispatch();
    const colorScheme = useColorScheme();

    const userId = profile.userId;

    useEffect(() => {
      if (!bottomSheetValues.id) return;
      dispatch(shareSearchDetailActions.setStatus("loading"));
      Promise.all([
        getSelectedUserWatched(userId),
        getSelectedUserWantToWatch(userId),
        getSelectedUserUnfinished(userId),
      ]).then(([watchedList, wantList, unfinishedList]) => {
        const idString = bottomSheetValues.id.toString();

        setBottomSheetValues((prev) => ({
          ...prev,
          watched: watchedList.some((item) => item.id.toString() === idString),
          wanttowatch: wantList.some((item) => item.id.toString() === idString),
          unfinished: unfinishedList.some(
            (item) => item.id.toString() === idString
          ),
        }));
        dispatch(shareSearchDetailActions.setStatus("done"));
      });
    }, []);

    return (
      <View className="px-5 pb-40" style={{ gap: 24 }}>
        <View className="w-full">
          <Text className="text-3xl font-bold dark:text-slate-100 leading-snug">
            {bottomSheetValues.title + " "}
            <Text className="font-medium text-xl text-slate-800 dark:text-slate-300">
              {t("actions.title")}
            </Text>
          </Text>
        </View>

        {/* Movie-specific */}
        {bottomSheetValues.mediaType === "movie" &&
          bottomSheetValues.release_date.slice(0, 4) ===
            thisYear.toString() && (
            <TouchableOpacity className="flex-row items-center justify-between bg-slate-600 rounded-xl px-4 py-3">
              <Text className="text-slate-100 text-base">
                {t("actions.bestmovies")}
              </Text>
              <Entypo name="star" size={22} color="yellow" />
            </TouchableOpacity>
          )}

        {/* Series-specific */}
        {bottomSheetValues.mediaType === "tv" &&
          bottomSheetValues.release_date.slice(0, 4) ===
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
            {/* Want to Watch */}
            <TouchableOpacity
              onPress={() =>
                updateWantToWatch({
                  additionDate: Date.now(),
                  id: bottomSheetValues.id,
                  mediaType: bottomSheetValues.mediaType,
                  name: profile.displayName,
                  photoURL: profile.photoURL,
                }).then((res) => {
                  setBottomSheetValues((prev) => ({
                    ...prev,
                    wanttowatch: !prev.wanttowatch,
                  }));
                  handlePresentModalClose();
                  dispatch(
                    profileActions.updateCurrentlyWatching({
                      poster: bottomSheetValues.poster_path,
                      releaseDate: bottomSheetValues.release_date,
                      title: bottomSheetValues.title,
                    })
                  );

                  toast.warning(
                    res ? t("actions.updated") : t("actions.notupdated"),
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
                        backgroundColor: "transparent", // bg-white/5
                        borderWidth: 1,
                        borderColor: "rgba(255,255,255,0.1)", // border-black dark:border-white/10
                        paddingVertical: 10,
                        paddingHorizontal: 14,
                        borderRadius: 14,
                      },
                    }
                  );
                })
              }
              className={
                bottomSheetValues.wanttowatch
                  ? "flex-row items-center justify-between rounded-xl border px-4 py-3  border-fuchsia-600 bg-fuchsia-600/20"
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
              onPress={() =>
                updateWatched({
                  additionDate: Date.now(),
                  id: bottomSheetValues.id,
                  mediaType: bottomSheetValues.mediaType,
                  name: profile.displayName,
                  photoURL: profile.photoURL,
                }).then((res) => {
                  setBottomSheetValues((prev) => ({
                    ...prev,
                    watched: !prev.watched,
                  }));
                  handlePresentModalClose();
                  dispatch(
                    profileActions.updateCurrentlyWatching({
                      poster: bottomSheetValues.poster_path,
                      releaseDate: bottomSheetValues.release_date,
                      title: bottomSheetValues.title,
                    })
                  );

                  toast.warning(
                    res ? t("actions.updated") : t("actions.notupdated"),
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
                        backgroundColor: "transparent", // bg-white/5
                        borderWidth: 1,
                        borderColor: "rgba(255,255,255,0.1)", // border-black dark:border-white/10
                        paddingVertical: 10,
                        paddingHorizontal: 14,
                        borderRadius: 14,
                      },
                    }
                  );
                })
              }
              className={
                bottomSheetValues.watched
                  ? "flex-row items-center justify-between rounded-xl border px-4 py-3  border-fuchsia-600 bg-fuchsia-600/20"
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
                  handlePresentModalClose();
                  dispatch(
                    profileActions.updateCurrentlyWatching({
                      poster: bottomSheetValues.poster_path,
                      releaseDate: bottomSheetValues.release_date,
                      title: bottomSheetValues.title,
                    })
                  );

                  toast.warning(
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
                        backgroundColor: "transparent", // bg-white/5
                        borderWidth: 1,
                        borderColor: "rgba(255,255,255,0.1)", // border-black dark:border-white/10
                        paddingVertical: 10,
                        paddingHorizontal: 14,
                        borderRadius: 14,
                      },
                    }
                  );
                })
              }
              className={
                "flex-row items-center justify-between rounded-xl border px-4 py-3  border-black dark:border-white/10 bg-white dark:bg-white/5"
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
              onPress={() =>
                updateUnfinished({
                  additionDate: Date.now(),
                  id: bottomSheetValues.id,
                  mediaType: bottomSheetValues.mediaType,
                  name: profile.displayName,
                  photoURL: profile.photoURL,
                }).then((res) => {
                  setBottomSheetValues((prev) => ({
                    ...prev,
                    unfinished: !prev.unfinished,
                  }));
                  handlePresentModalClose();
                  dispatch(
                    profileActions.updateCurrentlyWatching({
                      poster: bottomSheetValues.poster_path,
                      releaseDate: bottomSheetValues.release_date,
                      title: bottomSheetValues.title,
                    })
                  );

                  toast.warning(
                    res ? t("actions.updated") : t("actions.notupdated"),
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
                        backgroundColor: "transparent", // bg-white/5
                        borderWidth: 1,
                        borderColor: "rgba(255,255,255,0.1)", // border-black dark:border-white/10
                        paddingVertical: 10,
                        paddingHorizontal: 14,
                        borderRadius: 14,
                      },
                    }
                  );
                })
              }
              className={
                bottomSheetValues.unfinished
                  ? "flex-row items-center justify-between rounded-xl border px-4 py-3  border-fuchsia-600 bg-fuchsia-600/20"
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
  }
);

export default ExploreBottomSheet;
