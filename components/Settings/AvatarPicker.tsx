import ImageComponent from "@/common/ImageComponent";
import { Colors } from "@/constants/Colors";
import { RootState } from "@/store";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { toast } from "sonner-native";

const AvatarPicker = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const [image, setImage] = useState<string | null>(null);
  const { t } = useTranslation();

  const handlePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      toast.error(t("profileSettings.items.profile.permission", {}));
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  console.log(profile.photoURL);

  return (
    <View className="items-center mb-6">
      {profile?.photoURL ? (
        <TouchableOpacity
          className="w-28 h-28 rounded-full overflow-hidden"
          onPress={() => handlePicker()}
        >
          <ImageComponent url={image || profile.photoURL} />
          <BlurView
            intensity={7}
            experimentalBlurMethod="dimezisBlurView"
            style={[StyleSheet.absoluteFill, { borderRadius: 999 }]}
            tint="dark"
          />
          <MaterialIcons
            name="photo-library"
            size={32}
            color={Colors.dark.cFuc6}
            className="absolute z-3 items-center justify-center align-middle top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70"
          />
        </TouchableOpacity>
      ) : (
        <View className="w-28 h-28 rounded-full border-4 bg-cFuchsia600 border-cFuchsia600 items-center justify-center"></View>
      )}
    </View>
  );
};

export default AvatarPicker;
