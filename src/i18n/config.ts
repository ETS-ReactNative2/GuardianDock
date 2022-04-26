import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationFR from "./fr/translation.json";

export const resources = {
    fr: {
        translation: translationFR,
    }
} as const;

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        lng: 'fr',
        fallbackLng: 'fr',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources,
    });