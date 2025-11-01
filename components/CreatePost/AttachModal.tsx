import AttachItem from "@/common/AttachItem";
import { Colors } from "@/constants/Colors";
import useSearch from "@/hooks/useSearch";
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useColorScheme, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const AttachModal = () => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const handleSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <BottomSheetView className="flex-1 px-4">
      <BottomSheetTextInput
        placeholder={t("modal.attachtitle")}
        value={search}
        onChangeText={handleSearch}
        onSubmitEditing={() => useSearch(search, setResults, "movie")}
        style={{
          backgroundColor:
            colorScheme === "dark"
              ? Colors.dark.cGradient1
              : Colors.light.cWhite,
          borderRadius: 12,
          height: 48,
          padding: 12,
          color: Colors.dark.cWhite,
        }}
        placeholderTextColor={Colors.dark.icon}
        clearButtonMode="while-editing"
        returnKeyType="search"
      />
      <View className="h-full">
        {results.length > 0 && (
          <FlatList
            className="flex-1 mt-4 bg-white"
            data={results}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item, index }) => (
              <AttachItem {...item} key={index} />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </BottomSheetView>
  );
};

export default AttachModal;
