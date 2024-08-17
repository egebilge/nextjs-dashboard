"use client";

import { Button } from "@/components/ui/button";
import i18n, { LANGUAGE } from "@/lib/i18n";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

function SettingsList() {
  const { t } = useTranslation("settings");

  const handleLanguageSelection = useCallback(async (val: string) => {
    localStorage.setItem("@browserLanguage", val);
    await i18n.changeLanguage(val);
  }, []);

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <h1>{t("title")}</h1>
        <p>{t("description")}</p>

        <div className="flex gap-2 mt-4">
          <Button onClick={() => handleLanguageSelection(LANGUAGE.EN)}>
            {t("english")}
          </Button>
          <Button onClick={() => handleLanguageSelection(LANGUAGE.TR)}>
            {t("turkish")}
          </Button>
        </div>
      </main>
    </div>
  );
}

export { SettingsList };
