// i18n/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import en from "./locales/en.json";
import tr from "./locales/tr.json";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3", // Use this if you face compatibility issues
  lng: Localization.locale,
  fallbackLng: "en",
  resources: {
    en: {
      translation: en,
    },
    tr: {
      translation: tr,
    },
  },
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;
