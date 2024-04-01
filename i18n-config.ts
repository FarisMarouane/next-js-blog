// TODO: See why defaultLocale is not working as expected in the middleware
export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'fr'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
