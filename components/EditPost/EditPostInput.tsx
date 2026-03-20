import AttachItem from "@/common/AttachItem";
import { Colors } from "@/constants/Colors";
import { PostOptionsValues } from "@/constants/Post";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Svg, { Circle } from "react-native-svg";

const MAX_LENGTH = 280;

const CircularProgress = ({
  progress,
  color,
}: {
  progress: number;
  color: string;
}) => {
  const radius = 12;
  const strokeWidth = 3;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Svg
      height={radius * 2}
      width={radius * 2}
      style={{ transform: [{ rotate: "-90deg" }] }}
    >
      <Circle
        stroke={color + "33"}
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <Circle
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        strokeLinecap="round"
      />
    </Svg>
  );
};

const EditPostInput = ({
  attachedData,
  setText,
  text,
}: {
  text: string;
  setText: (text: string) => void;
  attachedData?: PostOptionsValues;
}) => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const [length, setLength] = useState(text?.length || 0);
  const [isFocused, setIsFocused] = useState(false);
  const onChangeText = (text: string) => {
    setText(text);
    const currentLength = text.length;
    setLength(currentLength);
  };

  const progress = Math.min((length / MAX_LENGTH) * 100, 100);
  const progressColor = colorScheme === "dark" ? Colors.dark.cFuc6 : "#a855f7";

  return (
    <View>
      <View
        style={{
          backgroundColor: colorScheme === "dark" ? "#1e293b" : "white",
          borderRadius: 16,
          marginHorizontal: 12,
          padding: 12,
          marginTop: 14,
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 3,
          position: "relative",
        }}
      >
        <TextInput
          multiline
          numberOfLines={6}
          maxLength={MAX_LENGTH}
          textAlignVertical="top"
          clearButtonMode="while-editing"
          selectionColor={Colors.dark.cFuc6}
          placeholder={t("createpost.whats")}
          placeholderTextColor={
            colorScheme === "dark" ? "#ffffff" : Colors.dark.tColor1
          }
          style={{
            fontSize: 16,
            color:
              colorScheme === "dark" ? Colors.dark.cWhite : Colors.dark.tColor1,
            paddingRight: 40,
            height: isFocused ? 190 : 140,
          }}
          onChangeText={onChangeText}
          value={text}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {isFocused && (
          <View style={styles.progressContainer}>
            <Text className="text-slate-600 dark:text-slate-400">
              {length + " / 280"}
            </Text>
            <CircularProgress progress={progress} color={progressColor} />
          </View>
        )}
      </View>
      {attachedData && (
        <View className="px-4">
          <AttachItem
            id={attachedData.id || 0}
            backdrop={attachedData.backdrop}
            mediaType={attachedData.mediaType || ""}
            poster={attachedData.posterPath || attachedData.poster}
            title={attachedData.title}
            release_date={attachedData.release_date}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    bottom: 8,
    right: 8,
  },
});

export default EditPostInput;
