import React from "react";
import { useTranslation } from "react-i18next";

const Banner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="flex items-center justify-center gap-12 bg-pink-100/50 px-8 py-16 sm:px-16 md:ml-12 md:gap-12 md:rounded-s-full md:py-20 lg:ml-20 lg:gap-20 lg:px-0">
      <img
        src="/images/banner.webp"
        alt="Illustration of portfolio banner"
        className="hidden w-64 md:block lg:w-72"
      />
      <div className="flex flex-col items-center text-center md:items-start md:text-left">
        <span className="mb-2.5 inline-block w-fit rounded-full rounded-bl-none bg-pink-500 px-3 py-1 text-sm text-white">
          {t("banner.heading")}
        </span>
        <h1 className="font-rubik-doodle mb-6 text-6xl font-bold">
          {t("banner.name")}
        </h1>
        <p className="mb-10 text-sm/8 text-zinc-600">
          {t("banner.description")}
        </p>
        <div className="w-fit">
          <a
            href="mailto:mollydcxxiil@gmail.com"
            className="relative z-10 text-xl font-medium tracking-wide hover:no-underline"
          >
            mollydcxxiil@gmail.com
          </a>
          <hr className="relative bottom-2 w-full border-4 border-pink-300" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
