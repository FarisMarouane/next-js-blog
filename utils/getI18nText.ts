import FR_JSON from '../i18n/fr/fr.json' assert { type: 'json' };
import EN_JSON from '../i18n/en/en.json' assert { type: 'json' };
import { Locale } from '../i18n-config';

type langKeyType = keyof typeof FR_JSON;

export const getI18nText = (key: langKeyType, locale: Locale) => {
  if (locale === 'en') return EN_JSON[key];
  return FR_JSON[key];
};
