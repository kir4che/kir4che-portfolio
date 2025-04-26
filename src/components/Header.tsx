import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Github, Rss, Linkedin } from "lucide-react";

import LangMenu from "@/components/LangMenu";

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
  const navList = t("nav", { returnObjects: true });

  // 滾動到指定區域
  const handleScrollTo = useCallback((targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-white px-4 py-2.5 shadow shadow-pink-100 lg:px-6">
      <div className="flex w-full items-center gap-x-3 lg:justify-between lg:gap-x-0">
        <div className="flex items-center justify-start lg:w-1/3">
          <a href="/" className="flex items-center">
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
          </a>
        </div>
        <nav className="hidden justify-center sm:flex lg:w-1/3">
          <ul className="flex items-center justify-center gap-x-4 lg:gap-x-10">
            {Object.entries(navList).map(([key, label]) => (
              <li
                key={key}
                className="cursor-pointer text-sm text-nowrap hover:text-pink-600 lg:text-base lg:font-medium"
                onClick={() => handleScrollTo(key)}
                onKeyDown={(e) => e.key === "Enter" && handleScrollTo(key)}
                role="button"
                tabIndex={0}
              >
                {label}
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
