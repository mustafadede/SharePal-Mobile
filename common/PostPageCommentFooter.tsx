import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Keyboard,
  Platform,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import PrimaryButton from "./PrimaryButton";
import PrimaryInput from "./PrimaryInput";

const PostPageCommentFooter = ({
  isKeyboardVisible,
  setIsKeyboardVisible,
}: {
  isKeyboardVisible: boolean;
  setIsKeyboardVisible: (value: boolean) => void;
}) => {
  const colorScheme = useColorScheme();
  const BottomDetection =
    Platform.OS === "android" && !isKeyboardVisible
      ? 40
      : Platform.OS === "android" && isKeyboardVisible
        ? 87
        : 30;
  const { t } = useTranslation();
  return (
    <>
      {!isKeyboardVisible ? (
        <View
          className="border-t border-slate-600"
          style={{
            position: "absolute",
            paddingTop: 20,
            paddingHorizontal: 20,
            bottom: BottomDetection,
            flex: 1,
            backgroundColor:
              colorScheme === "dark" ? Colors.dark.cGradient2 : "#fff",
          }}
        >
          <PrimaryInput placeholder={t("modal.writecomment")} />
        </View>
      ) : (
        <View
          className="border-t border-slate-600"
          style={{
            position: "absolute",
            paddingTop: 20,
            paddingHorizontal: 20,
            bottom: BottomDetection,
            flex: 1,
            backgroundColor:
              colorScheme === "dark" ? Colors.dark.cGradient2 : "#fff",
          }}
        >
          <PrimaryInput placeholder="Add a comment" />
          <View
            style={{
              flexDirection: "row",
              marginTop: 4,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 12,
              }}
            >
              {/* <TouchableOpacity
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    colorScheme === "dark"
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.06)",
                }}
              >
                <Feather
                  name="image"
                  size={20}
                  color={colorScheme === "dark" ? "#fff" : "#333"}
                />
              </TouchableOpacity> */}

              <TouchableOpacity
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    colorScheme === "dark"
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.06)",
                }}
              >
                <MaterialIcons
                  name="gif"
                  size={22}
                  color={colorScheme === "dark" ? "#fff" : "#333"}
                />
              </TouchableOpacity>
            </View>
            <View className="w-24">
              <PrimaryButton
                onClickHandler={() => {
                  setIsKeyboardVisible(false);
                  Keyboard.dismiss();
                }}
                title={t("feedCard.send")}
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default PostPageCommentFooter;
