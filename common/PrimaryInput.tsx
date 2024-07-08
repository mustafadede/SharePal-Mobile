import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const PrimaryInput = ({
  placeholder,
  visibility,
  setInput,
}: {
  placeholder: string;
  visibility?: boolean;
  setInput: (text: string) => void;
}) => {
  const { t } = useTranslation();
  const [visible, setVisible] = React.useState(visibility);
  return (
    <View className="relative flex flex-row items-center w-4/5 h-12 mb-4 bg-white rounded-lg">
      <TextInput
        className={visibility ? "w-full h-12 pl-4 pr-10" : "w-full h-12 px-4"}
        placeholder={t(placeholder)}
        secureTextEntry={visible}
        onChangeText={(text) => setInput(text)}
      />
      {visibility && (
        <TouchableOpacity className="absolute text-center right-2 text-fuchsia-600" onPress={() => setVisible(!visible)}>
          {visible ? (
            <MaterialIcons name="visibility" size={32} color="black" />
          ) : (
            <MaterialIcons name="visibility-off" size={32} color="black" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PrimaryInput;
