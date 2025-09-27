import SharePostComponent from "@/common/SharePostComponent";
import { RootState } from "@/store";
import { modalActions } from "@/store/modalSlice";
import { useFocusEffect } from "expo-router";
import * as Sharing from "expo-sharing";
import React, { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Switch,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import ViewShot, { captureRef } from "react-native-view-shot";
import { useDispatch, useSelector } from "react-redux";

const captureShot = (
  ref: React.RefObject<any>,
  handleShare: () => void,
  switchValue: boolean
) => {
  return (
    <ViewShot
      ref={ref}
      options={{ format: "png", quality: 1 }}
      onCapture={handleShare}
    >
      <SharePostComponent switchValue={switchValue} />
    </ViewShot>
  );
};

const postshare = () => {
  const viewRef = useRef(null);
  const { t } = useTranslation();
  const modal = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  const [shareWithSpoiler, setShareWithSpoiler] = useState(false);
  const colorScheme = useColorScheme();

  useFocusEffect(
    useCallback(() => {
      setShareWithSpoiler(modal.modalProps[0]?.modalProps.spoiler);
      return () => {
        dispatch(modalActions.closeModal());
      };
    }, [])
  );

  const handleShare = async () => {
    try {
      if (viewRef.current) {
        const uri = await captureRef(viewRef, {
          format: "png",
          result: "tmpfile",
        });

        const isAvailable = await Sharing.isAvailableAsync();

        if (isAvailable) {
          await Sharing.shareAsync(uri, {
            mimeType: "image/png",
            dialogTitle: "Share your content",
          });
        } else {
          console.log("Sharing not available");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="dark:bg-cGradient2 flex-1 items-center">
      <View className="relative">
        {captureShot(viewRef, handleShare, shareWithSpoiler)}
      </View>
      {modal.modalProps[0]?.modalProps.spoiler && (
        <View className="flex-row items-center relative bottom-2">
          <Text
            className="mr-2 text-md font-semibold"
            style={{ color: colorScheme === "dark" ? "#fff" : "#0E0B13" }}
          >
            {t("share.sharewithspoiler")}
          </Text>
          <Switch
            value={shareWithSpoiler}
            onValueChange={setShareWithSpoiler}
            trackColor={{ false: "#767577", true: "#a855f7" }}
            thumbColor={shareWithSpoiler ? "#f4f3f4" : "#f4f3f4"}
          />
        </View>
      )}
      <TouchableOpacity
        onPress={handleShare}
        style={{
          marginTop: 7,
          paddingHorizontal: 32,
          paddingVertical: 12,
          borderRadius: 9999,
          borderWidth: 2,
          borderColor: colorScheme === "dark" ? "#fff" : "#000",
          backgroundColor: colorScheme === "dark" ? "#0E0B13" : "#f8fafc",
        }}
      >
        <Text
          className="text-md font-semibold"
          style={{
            color: colorScheme === "dark" ? "#fff" : "#0E0B13",
          }}
        >
          {t("searchdetail.share")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default postshare;
