import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import te from "./locales/te.json";
import hi from "./locales/hi.json";
import en from "./locales/en.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      te: { translation: te },
      hi: { translation: hi },
      en: { translation: en },
    },
    fallbackLng: "te",
    supportedLngs: ["te", "hi", "en"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "kisanseva_lang",
    },
  });

export default i18n;
export { te, hi, en };
