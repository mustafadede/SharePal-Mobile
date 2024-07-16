import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";

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
    <View className="relative flex flex-row items-center w-4/5 h-12 mb-4 rounded-lg">
      <TextInput
        style={{ backgroundColor: Colors.dark.cGradient1, color: Colors.dark.cWhite, borderRadius: 10 }}
        placeholderTextColor={Colors.dark.tColor1}
        className={visibility ? "w-full h-12 pl-4 pr-10" : "w-full h-12 px-4"}
        placeholder={t(placeholder)}
        selectionColor={Colors.dark.cFuc6}
        secureTextEntry={visible}
        onChangeText={(text) => setInput(text)}
      />
      {visibility && (
        <TouchableOpacity className="absolute text-center right-2 text-fuchsia-600" onPress={() => setVisible(!visible)}>
          {visible ? (
            <MaterialIcons name="visibility" size={32} color={Colors.dark.tColor1} />
          ) : (
            <MaterialIcons name="visibility-off" size={32} color={Colors.dark.tColor1} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PrimaryInput;
