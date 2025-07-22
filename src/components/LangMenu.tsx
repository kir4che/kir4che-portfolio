import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

const LANGUAGES = ["tw", "en"] as const;
type Language = (typeof LANGUAGES)[number];

const languageMap: Record<Language, string> = {
  tw: "zh-TW",
  en: "en",
};

const LangMenu: React.FC = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [lang, setLang] = useState<Language>("tw");

  const changeLang = (newLang: Language) => {
    const i18nLang = languageMap[newLang];
    if (i18n.language !== i18nLang) {
      i18n.changeLanguage(i18nLang);
      setLang(newLang);
    }

    const pathSegments = location.pathname.split("/").filter(Boolean);
    pathSegments[0] = newLang;

    navigate(`/${pathSegments.join("/")}${location.hash}`, {
      replace: true,
    });
  };

  useEffect(() => {
    const pathLang = location.pathname.split("/")[1] as Language;
    const curLang = LANGUAGES.includes(pathLang) ? pathLang : "tw";
    i18n.changeLanguage(curLang);
    setLang(curLang);
  }, [location.pathname, i18n]);

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
