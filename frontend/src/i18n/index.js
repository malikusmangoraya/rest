import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Dynamically import all locale files
const loadLocales = () => {
  const context = import.meta.glob('./locales/*.json', { eager: true });
  const resources = {};
  for (const path in context) {
    const lang = path.replace('./locales/', '').replace('.json', '');
    resources[lang] = { translation: context[path].default || context[path] };
  }
  return resources;
};

// RTL languages
export const RTL_LANGUAGES = ['ar', 'ur'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: loadLocales(),
    fallbackLng: 'en',
    supportedLngs: [
      'ar',
      'de',
      'en',
      'es',
      'fr',
      'hi',
      'id',
      'ja',
      'ko',
      'pt',
      'ru',
      'tr',
      'ur',
      'zh',
    ],
    defaultNS: 'translation',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

// Apply RTL direction when language changes
i18n.on('languageChanged', (lng) => {
  const isRtl = RTL_LANGUAGES.includes(lng);
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
});

export default i18n;
