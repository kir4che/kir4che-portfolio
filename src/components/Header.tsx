import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import { Github, Rss, Linkedin } from "lucide-react";

import LangMenu from "@/components/LangMenu";

const LANGUAGES = ["tw", "en"] as const;
type Language = (typeof LANGUAGES)[number];

interface SocialLink {
  label: string;
  href: string;
  icon: () => React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    label: "github",
    href: "https://github.com/kir4che/",
    icon: () => (
      <Github className="h-5 w-5 text-pink-600 transition-transform duration-200 hover:-translate-y-1 lg:h-6 lg:w-6" />
    ),
  },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/mollysu/",
    icon: () => (
      <Linkedin className="h-5 w-5 text-pink-600 transition-transform duration-200 hover:-translate-y-1 lg:h-6 lg:w-6" />
    ),
  },
  {
    label: "blog",
    href: "https://kir4che.com/",
    icon: () => (
      <Rss className="h-5 w-5 text-pink-600 transition-transform duration-200 hover:-translate-y-1 lg:h-6 lg:w-6" />
    ),
  },
];

const Header: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const pathLang = location.pathname.split("/")[1] as Language;
  const isSupportedLang = LANGUAGES.includes(pathLang);
  const langPrefix = isSupportedLang ? `/${pathLang}` : "/";

  const navList = t("nav", { returnObjects: true });

  return (
    <header className="sticky top-0 z-50 bg-white px-4 py-2.5 text-zinc-900 shadow shadow-pink-100 lg:px-6">
      <div className="flex w-full items-center gap-x-3 lg:justify-between lg:gap-x-0">
        <div className="flex items-center justify-start lg:w-1/3">
          <Link to={langPrefix} className="flex items-center">
            <img
              src="images/logo.webp"
              alt="kir4che logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="hidden text-xl font-semibold text-nowrap lg:flex">
              kir4che
            </span>
          </Link>
        </div>
        <nav className="hidden justify-center sm:flex lg:w-1/3">
          <ul className="flex items-center justify-center gap-x-4 lg:gap-x-10">
            {Object.entries(navList).map(([key, label]) => (
              <li key={key}>
                <Link
                  to={`#${key}`}
                  className="cursor-pointer text-sm text-nowrap hover:text-pink-600 lg:text-base lg:font-medium"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center justify-end lg:w-1/3">
          <div className="flex items-center justify-center gap-x-4">
            {socialLinks.map(({ label, href, icon }) => (
              <a
                href={href}
                key={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {icon()}
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
          <LangMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
