import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type TabKey = "overview" | "activities";

type Props = {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  onTabChange?: (tab: TabKey) => void;
};

type TabButtonProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const TabButton = ({ label, active, onPress }: TabButtonProps) => {
  const { t } = useTranslation();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(active ? "#c026d3" : "rgba(0,0,0,0)", {
        duration: 180,
      }),
    };
  }, [active]);

  return (
    <AnimatedPressable
      onPress={onPress}
      style={animatedStyle}
      className="py-2 flex-1 mt-7 items-center h-12 rounded-full"
    >
      <Text
        className={`text-lg font-medium ${
          active ? "text-white" : "text-slate-400"
        }`}
      >
        {t(label)}
      </Text>
    </AnimatedPressable>
  );
};

const ContentSwitcher = ({ activeTab, setActiveTab, onTabChange }: Props) => {
  const handlePress = useCallback(
    (tab: TabKey) => {
      if (tab === activeTab) return;
      setActiveTab(tab);
      onTabChange?.(tab);
    },
    [activeTab, onTabChange, setActiveTab],
  );

  return (
    <View className="flex-row gap-2 px-4">
      <TabButton
        label="searchdetail.overview"
        active={activeTab === "overview"}
        onPress={() => handlePress("overview")}
      />
      <TabButton
        label="searchdetail.activities"
        active={activeTab === "activities"}
        onPress={() => handlePress("activities")}
      />
    </View>
  );
};

export default ContentSwitcher;
