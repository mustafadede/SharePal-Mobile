import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

type TrailerCardProps = {
  thumbnailUrl: string;
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary";
};

const TrailerCard: React.FC<TrailerCardProps> = ({
  thumbnailUrl,
  title,
  onPress,
}) => {
  const theme = useColorScheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-40 h-24 mr-3 rounded-xl overflow-hidden"
    >
      <Image
        source={{ uri: thumbnailUrl }}
        className="w-full h-full"
        resizeMode="cover"
      />

      <View
        className={`absolute inset-0 justify-center items-center dark:bg-black/40 bg-white/40`}
      >
        <Feather
          name="play"
          size={24}
          style={{
            marginBottom: 24,
          }}
          color={theme === "dark" ? "white" : "black"}
        />
      </View>

      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        className="absolute bottom-1 left-2 text-xs text-white font-semibold"
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TrailerCard;
