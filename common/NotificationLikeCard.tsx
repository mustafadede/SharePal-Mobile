import { Colors } from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import React from "react";
import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
const NotificationLikeCard = () => {
  const colorScheme = useColorScheme();
  return (
    <GestureHandlerRootView>
      <Swipeable
        onSwipeableWillOpen={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        }}
        renderRightActions={() => (
          <>
            <TouchableOpacity
              onPress={() => {}}
              className="justify-center px-6 items-center rounded-xl"
            >
              <MaterialIcons name="delete" size={23} color="#b91c1c" />
            </TouchableOpacity>
          </>
        )}
        friction={2}
        rightThreshold={40}
      >
        <Pressable
          className="h-24 flex-row rounded-2xl mx-4 items-center border justify-between px-4 w-96 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-200/10 mb-4"
          onPress={() => {
            console.log("pressed");
          }}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <View className="flex-row justify-center items-center">
            <TouchableOpacity>
              <Image
                src="https://avatars.githubusercontent.com/u/95627279?v=4"
                className="w-16 h-16 rounded-full bg-cGradient2"
              />
            </TouchableOpacity>
            <Text className="text-slate-700 dark:text-white ml-4">
              Mustafa gönderinizi beğendi
            </Text>
          </View>
          <View className="flex-row justify-center items-center">
            <FontAwesome
              name="heart-o"
              size={18}
              color={colorScheme === "dark" ? Colors.dark.tColor1 : "black"}
            />
            <Feather
              name="chevron-right"
              size={24}
              color={colorScheme === "dark" ? Colors.dark.tColor1 : "black"}
            />
          </View>
        </Pressable>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default NotificationLikeCard;
