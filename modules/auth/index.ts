import { SignInContainer } from "./containers/sign-in";
import { authModuleTranslationsTR } from "./language/tr";
import { authModuleTranslationsEN } from "./language/en";

const authModuleTranslations = {
  en: authModuleTranslationsEN,
  tr: authModuleTranslationsTR,
};

export { SignInContainer, authModuleTranslations };
