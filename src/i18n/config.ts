import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from '../locales/en/common.json';
import enFood from '../locales/en/food.json';
import enAuth from '../locales/en/auth.json';
import enLanding from '../locales/en/landing.json';

import viCommon from '../locales/vi/common.json';
import viFood from '../locales/vi/food.json';
import viAuth from '../locales/vi/auth.json';
import viLanding from '../locales/vi/landing.json';

const resources = {
  en: {
    common: enCommon,
    food: enFood,
    auth: enAuth,
    landing: enLanding,
  },
  vi: {
    common: viCommon,
    food: viFood,
    auth: viAuth,
    landing: viLanding,
  },
};

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language
    defaultNS: 'common', // Default namespace
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'], // Check localStorage first, then browser
      caches: ['localStorage'], // Cache language preference
      lookupLocalStorage: 'i18nextLng', // localStorage key
    },
  });

export default i18n;