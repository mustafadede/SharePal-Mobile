import ProvidersList from "@/components/SearchDetail/ProviderList";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  SectionList,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
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
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 0,
        borderRadius: 20,
        backgroundColor:
          colorScheme === "dark" ? Colors.dark.cGradient2 : Colors.dark.cWhite,
        overflow: "hidden",
        marginHorizontal: 16,
        marginTop: 18,
        marginBottom: 8,
      }}
    >
      <SectionList
        sections={[{ title: "", data: countryCodes }]}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderSectionHeader={() => null}
        renderItem={({ item: code }) => {
          const isSelected = selectedCountry === code;
          return (
            <TouchableOpacity
              key={code}
              onPress={() => setSelectedCountry(code)}
              activeOpacity={0.85}
              style={{
                marginRight: 8,
                marginLeft: 0,
                marginVertical: 2,
                paddingVertical: 8,
                paddingHorizontal: 20,
                borderRadius: 18,
                backgroundColor: isSelected
                  ? colorScheme === "dark"
                    ? Colors.dark.cGradient2
                    : Colors.dark.cWhite
                  : colorScheme === "dark"
                    ? "rgba(255,255,255,0.10)"
                    : "rgba(124,58,237,0.10)",
                borderWidth: isSelected ? 2 : 2,
                borderColor: isSelected ? Colors.dark.cFuc6 : "transparent",
                minWidth: 44,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: isSelected
                    ? colorScheme === "dark"
                      ? Colors.dark.cWhite
                      : Colors.dark.cFuc6
                    : colorScheme === "dark"
                      ? Colors.dark.cWhite
                      : Colors.dark.cDarkGray,
                  fontWeight: isSelected ? "700" : "500",
                  fontSize: 15,
                  letterSpacing: 0.5,
                }}
              >
                {code}
              </Text>
            </TouchableOpacity>
          );
        }}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      />
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          colorScheme === "dark"
            ? Colors.dark.cGradient2
            : Colors.dark.cBackgroundLight,
      }}
    >
      <SectionList
        sections={[
          {
            title: "",
            data: [
              {
                key: "providersList",
                render: () => (
                  <Animated.View
                    key={selectedCountry}
                    entering={FadeInDown.springify().delay(60)}
                    style={{
                      marginTop: 0,
                      marginHorizontal: 0,
                      borderRadius: 28,
                      paddingVertical: 16,
                      paddingHorizontal: 8,
                      minHeight: 180,
                      marginBottom: 16,
                      borderWidth: 0,
                    }}
                  >
                    <ProvidersList
                      movieId={movieId?.toString()}
                      mediaType={String(mediaType)}
                      selectedCountry={selectedCountry}
                    />
                  </Animated.View>
                ),
              },
            ],
          },
        ]}
        keyExtractor={(item) => item.key}
        renderSectionHeader={() => (
          <View
            style={{
              backgroundColor:
                colorScheme === "dark"
                  ? Colors.dark.cGradient2
                  : Colors.dark.cBackgroundLight,
              zIndex: 10,
              paddingTop: Platform.OS === "ios" ? 26 : 40,
              paddingBottom: 0,
            }}
          >
            {renderCountrySelector()}
          </View>
        )}
        renderItem={({ item }) => item.render()}
        stickySectionHeadersEnabled
        contentContainerStyle={{
          paddingBottom: 60,
          paddingHorizontal: 0,
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ProvidersPage;
