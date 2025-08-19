import i18next, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import heCommon from './locales/he/common.json';
import enCommon from './locales/en/common.json';

const resources = {
  he: { common: heCommon },
  en: { common: enCommon },
} as const;

const fallback = 'he';
const deviceLang = RNLocalize.getLocales?.()[0]?.languageCode ?? fallback;

const i18n = i18next.createInstance();

const options: InitOptions = {
  resources,
  lng: deviceLang,
  fallbackLng: fallback,
  ns: ['common'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  returnNull: false,
};

i18n.use(initReactI18next).init(options);

export default i18n;
