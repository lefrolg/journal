import { createI18n } from "vue-i18n/index";
import i18nEn from "./locales/en.json";
import i18nRu from "./locales/ru.json";
import config from "./config";

const datetimeFormats = {
  en: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    },
  },
  ru: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    },
  },
};

const numberFormats = {
  en: {
    currency: {
      style: "currency",
      currency: "BYN",
    },
  },
  ru: {
    currency: {
      style: "currency",
      currency: "BYN",
      currencyDisplay: "symbol",
    },
  },
};

let locale = window.localStorage.language || navigator.language || "ru";
let fallbackLocale = process.env.VUE_APP_I18N_FALLBACK_LOCALE || "ru";
if (config.supported_languages.indexOf(locale) === -1) {
  locale = "ru";
}
if (config.supported_languages.indexOf(fallbackLocale) === -1) {
  fallbackLocale = "ru";
}

export default createI18n({
  datetimeFormats,
  numberFormats,
  locale: locale,
  fallbackLocale: fallbackLocale,
  messages: {
    en: i18nEn,
    ru: i18nRu,
  },
  pluralizationRules: {
    ru: function (choice, choicesLength) {
      if (choice === 0) {
        return 0;
      }

      const teen = choice > 10 && choice < 20;
      const endsWithOne = choice % 10 === 1;

      if (choicesLength < 4) {
        return !teen && endsWithOne ? 1 : 2;
      }
      if (!teen && endsWithOne) {
        return 1;
      }
      if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
        return 2;
      }

      return choicesLength < 4 ? 2 : 3;
    },
  },
});
