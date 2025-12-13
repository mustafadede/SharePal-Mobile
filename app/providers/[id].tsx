import ProvidersList from "@/components/SearchDetail/ProviderList";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const countryCodes = [
  "TR",
  "US",
  "GB",
  "DE",
  "FR",
  "CA",
  "AU",
  "JP",
  "KR",
  "IT",
  "ES",
  "NL",
  "SE",
  "NO",
  "DK",
  "FI",
  "BE",
  "CH",
  "AT",
  "IE",
];

const ProvidersPage = () => {
  const { id: movieIdRaw, mediaType } = useLocalSearchParams();
  const movieId = movieIdRaw !== undefined ? movieIdRaw : "0";
  const [selectedCountry, setSelectedCountry] = useState("TR");
  const colorScheme = useColorScheme();

  const renderCountrySelector = () => (
    <View
      className="bg-white dark:bg-cGradient2"
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        backdropFilter: "blur(10px)",
        paddingVertical: 6,
        marginBottom: 24,
        borderRadius: 16,
      }}
    >
      {countryCodes.map((code) => {
        const isSelected = selectedCountry === code;
        return (
          <TouchableOpacity
            key={code}
            onPress={() => setSelectedCountry(code)}
            style={{
              margin: 4,
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 12,
              backgroundColor: isSelected
                ? colorScheme === "dark"
                  ? "#bb86fc"
                  : "#7c3aed"
                : colorScheme === "dark"
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.05)",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: isSelected ? 0.4 : 0.15,
              shadowRadius: isSelected ? 4 : 2,
              elevation: isSelected ? 5 : 1,
            }}
          >
            <Text
              style={{
                color: isSelected
                  ? "#fff"
                  : colorScheme === "dark"
                    ? "#ddd"
                    : "#333",
                fontWeight: "600",
                fontSize: 14,
              }}
            >
              {code}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          colorScheme === "dark" ? Colors.dark.cGradient2 : "white",
      }}
    >
      <FlatList
        style={{
          backgroundColor:
            colorScheme === "dark" ? Colors.dark.cGradient2 : "white",
        }}
        className={`flex-1 p-4 dark:bg-cGradient2 pt-16`}
        data={[{ key: "providersList" }]}
        keyExtractor={(item) => item.key}
        ListHeaderComponent={renderCountrySelector}
        renderItem={() => (
          <ProvidersList
            movieId={movieId?.toString()}
            mediaType={String(mediaType)}
            selectedCountry={selectedCountry}
          />
        )}
        contentContainerStyle={{
          paddingBottom: 60,
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ProvidersPage;
