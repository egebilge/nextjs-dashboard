import { authModuleTranslations } from "@/modules/auth";
import { dashboardModuleTranslations } from "@/modules/dashboard";
import { settingsModuleTranslations } from "@/modules/settings";
import { usersModuleTranslations } from "@/modules/users";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export enum LANGUAGE {
  EN = "en",
  TR = "tr",
}

type Translation = {
  [key: string]: string | Translation;
};

type ModuleTranslation = Record<Module, Translation>;
type Module = "auth" | "dashboard" | "users" | "settings";

const modules: Record<Module, any> = {
  auth: authModuleTranslations,
  dashboard: dashboardModuleTranslations,
  users: usersModuleTranslations,
  settings: settingsModuleTranslations,
};

const resources = Object.values(LANGUAGE).reduce(
  (acc, language) => ({
    ...acc,
    [language]: Object.entries(modules).reduce(
      (acc, [module, translations]) => ({
        ...acc,
        [module]: translations[language] || {},
      }),
      {}
    ),
  }),
  {} as Record<LANGUAGE, ModuleTranslation>
);

let browserLanguage = "en"; // default language

if (typeof window !== "undefined") {
  const savedLanguage = localStorage.getItem("@browserLanguage");
  browserLanguage = savedLanguage || navigator.language.split("-")[0];
  localStorage.setItem("@browserLanguage", browserLanguage);
}

i18n.use(initReactI18next).init({
  resources,
  compatibilityJSON: "v3",
  fallbackLng: "en",
  lng: browserLanguage,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
