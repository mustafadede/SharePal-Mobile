import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onWatched: () => void;
  onWantToWatch: () => void;
  onHalfWatched: () => void;
};

const CreatePostBottom = ({
  visible,
  onClose,
  onWatched,
  onWantToWatch,
  onHalfWatched,
}: Props) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/40 justify-end" onPress={onClose}>
        <View className="bg-zinc-900 rounded-t-3xl p-6 gap-4">
          <Text className="text-white text-lg font-semibold mb-2">
            Film Durumu Seç
          </Text>

          <Pressable onPress={onWatched} className="bg-zinc-800 p-4 rounded-xl">
            <Text className="text-white text-base">İzledim</Text>
          </Pressable>

          <Pressable
            onPress={onWantToWatch}
            className="bg-zinc-800 p-4 rounded-xl"
          >
            <Text className="text-white text-base">İzlemek İstiyorum</Text>
          </Pressable>

          <Pressable
            onPress={onHalfWatched}
            className="bg-zinc-800 p-4 rounded-xl"
          >
            <Text className="text-white text-base">Yarıda Bıraktım</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default CreatePostBottom;
