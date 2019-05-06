import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';
i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'kr',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: false,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default'
    },
    resources: {
      kr: {
        translation: {
          'top-menu-dear101': 'Dear 101 순위',
        }
      },
      en: {
        translation: {
          'top-menu-dear101': 'Dear 101 Rank',
        }
      }
    }
  });
export default i18n;
