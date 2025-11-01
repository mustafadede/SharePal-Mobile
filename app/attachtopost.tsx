import AttachItem from "@/common/AttachItem";
import { Colors } from "@/constants/Colors";
import useSearch from "@/hooks/useSearch";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";

const filters = [
  { label: "Movie", id: 0 },
  { label: "TV", id: 1 },
];

const attachtopost = () => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState(0);

  const handleSearch = (text: string) => setSearch(text);
  const performSearch = () => {
    const type = filters[selectedFilter].label.toLowerCase();
    useSearch(search, setResults, type);
  };

  useEffect(() => {
    setResults([]);
    handleSearch(search);
  }, [selectedFilter]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 px-4 dark:bg-cGradient2">
        <TextInput
          placeholder={t("modal.attachtitle")}
          value={search}
          onChangeText={handleSearch}
          onSubmitEditing={performSearch}
          style={{
            backgroundColor:
              colorScheme === "dark"
                ? Colors.dark.cGradient1
                : Colors.light.cWhite,
            color:
              colorScheme === "dark" ? Colors.dark.cWhite : Colors.light.cBlack,
            borderRadius: 12,
            height: 48,
            padding: 12,
          }}
          placeholderTextColor={Colors.dark.icon}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
        <View className="flex flex-row my-4">
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              onPress={() => setSelectedFilter(filter.id)}
              className={
                selectedFilter === filter.id
                  ? "items-center justify-center flex-1 py-1 mx-1 rounded-lg bg-fuchsia-600 dark:bg-transparent border-fuchsia-600"
                  : "items-center justify-center flex-1 py-1 mx-1 rounded-lg bg-slate-900"
              }
              style={{ borderWidth: 0.5 }}
            >
              <Text className="text-center text-md text-slate-200">
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="h-full">
          {results.length > 0 && (
            <FlatList
              className="flex-1 mt-4"
              data={results}
              keyExtractor={(_, index) => String(index)}
              renderItem={({ item, index }) => (
                <AttachItem
                  backdrop={item.backdrop_path || item.poster_path}
                  poster={item.poster_path || item.backdrop_path}
                  title={item.title || item.name}
                  release_date={item.release_date || item.first_air_date}
                  key={index}
                  attached={true}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default attachtopost;
