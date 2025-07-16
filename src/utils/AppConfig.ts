
const localePrefix = 'as-needed' as const;

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'SaaS HHI',
  locales: [
    {
      id: 'en',
      name: 'English',
    },
  ],
  defaultLocale: 'en',
  localePrefix,
};

export const AllLocales = AppConfig.locales.map(locale => locale.id);

// Subskrypcje zostały wyłączone
export const PLAN_ID = {
  FREE: 'free',
} as const;

export const PricingPlanList = {};
