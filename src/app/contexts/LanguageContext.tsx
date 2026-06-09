"use client";

import { createContext, useContext, useState } from "react";

type Lang = "zh" | "en";

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh");
  const toggleLang = () => setLang((l) => (l === "zh" ? "en" : "zh"));
  return (
    <LanguageContext value={{ lang, toggleLang }}>
      {children}
    </LanguageContext>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider!");
  return ctx;
}
