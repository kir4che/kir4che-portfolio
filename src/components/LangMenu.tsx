import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = ["tw", "en"] as const;
type Language = (typeof LANGUAGES)[number];

const LangMenu: React.FC = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<Language>("tw");

  const changeLang = (newLang: Language) => {
    if (i18n.language !== newLang) {
      i18n.changeLanguage(newLang);
      setLang(newLang);
    }

    const pathSegments = window.location.pathname.split("/").filter(Boolean);

    if (LANGUAGES.includes(pathSegments[0] as Language))
      pathSegments[0] = newLang;
    else pathSegments.unshift(newLang);

    const newPath =
      "/" +
      pathSegments.join("/") +
      window.location.search +
      window.location.hash;
    window.location.replace(newPath);
  };

  useEffect(() => {
    const pathLang = window.location.pathname.split("/")[1] as Language;
    const currentLang = LANGUAGES.includes(pathLang) ? pathLang : "tw";
    i18n.changeLanguage(currentLang);
    setLang(currentLang);
  }, [i18n]);

  return (
    <div className="flex items-center">
      <select
        value={lang}
        onChange={(e) => changeLang(e.target.value as Language)}
        className="cursor-pointer px-2 text-sm focus:outline-none"
      >
        <option value="tw">繁體中文</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};

export default LangMenu;
