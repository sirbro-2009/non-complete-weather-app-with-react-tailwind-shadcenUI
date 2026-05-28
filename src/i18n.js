import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// استيراد ملفات الـ JSON
import translationEN from './locales/en.json';
import translationAR from './locales/ar.json';

const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR }
};

i18n
  .use(LanguageDetector) // يكتشف لغة متصفح المستخدم تلقائياً كخيار افتراضي
  .use(initReactI18next) // يربطها مع React
  .init({
    resources,
    fallbackLng: 'en', // اللغة الاحتياطية في حال فشل التحديد
    interpolation: {
      escapeValue: false // React يحمي من الـ XSS تلقائياً
    }
  });

export default i18n;