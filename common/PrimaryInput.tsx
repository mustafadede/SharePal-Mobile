import { Colors } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const PrimaryInput = ({
  placeholder,
  visibility,
  setInput,
}: {
  placeholder: string;
  visibility?: boolean;
  setInput?: (text: string) => void;
}) => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const [visible, setVisible] = React.useState(visibility);
  return (
    <View className="relative flex flex-row-reverse items-center w-4/5 h-12 mb-4 rounded-lg">
      <TextInput
        style={{
          backgroundColor:
            colorScheme === "dark"
              ? Colors.dark.cGradient1
              : Colors.light.cWhite,
          color:
            colorScheme === "dark" ? Colors.dark.cWhite : Colors.light.cBlack,
          borderRadius: 10,
        }}
        placeholderTextColor={Colors.dark.tColor1}
        className={visibility ? "w-full h-12 pl-4" : "w-full h-12 px-4"}
        placeholder={t(placeholder)}
        selectionColor={Colors.dark.cFuc6}
        clearButtonMode="while-editing"
        secureTextEntry={visible}
        onChangeText={setInput}
        autoCapitalize="none"
      />
      {visibility && (
        <TouchableOpacity
          className="absolute text-center mr-2 right-2 text-fuchsia-600"
          onPress={() => setVisible(!visible)}
        >
          {visible ? (
            <MaterialIcons
              name="visibility"
              size={32}
              color={Colors.dark.tColor1}
            />
          ) : (
            <MaterialIcons
              name="visibility-off"
              size={32}
              color={Colors.dark.tColor1}
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PrimaryInput;
