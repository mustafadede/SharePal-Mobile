import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Language = () => {
  const { t, i18n } = useTranslation();
  const colorScheme = useColorScheme();

  const languages = [
    { code: "en", label: "English" },
    { code: "tr", label: "Türkçe" },
  ];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <SafeAreaView
      className="flex-1 px-6 pt-20"
      style={{
        backgroundColor: colorScheme === "dark" ? "#0E0B13" : "#F9FAFB",
      }}
    >
      <View className="gap-4">
        {languages.map((lang) => {
          const selected = i18n.language.includes(lang.code);
          return (
            <TouchableOpacity
              key={lang.code}
              onPress={() => changeLanguage(lang.code)}
              className={`p-5 rounded-2xl shadow-md flex-row items-center justify-between ${
                selected
                  ? "bg-fuchsia-600 shadow-fuchsia-400"
                  : "bg-white dark:bg-cGradient2"
              }`}
              style={{
                shadowOpacity: 0.2,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 2 },
              }}
            >
              <Text
                className="text-lg font-semibold"
                style={{
                  color: selected
                    ? "#fff"
                    : colorScheme === "dark"
                    ? "#fff"
                    : "#111827",
                }}
              >
                {lang.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default Language;
