"use client";

import { useEffect } from "react";
import i18n from "@/lib/i18n";

function I18nInitializer() {
  useEffect(() => {
    const savedLanguage = localStorage.getItem("@browserLanguage") || "en";
    i18n.changeLanguage(savedLanguage);
  }, []);

  return null;
}

export { I18nInitializer };
