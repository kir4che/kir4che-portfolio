import React from "react";
import { useTranslation } from "react-i18next";
import { SquareArrowOutUpRight, MapPin } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Title from "@/components/Title";

const Experience: React.FC = () => {
  const { t } = useTranslation();

  const contents = {
    sprout: t("experience.sprout.content", { returnObjects: true }),
    mrhost: t("experience.mrhost.content", { returnObjects: true }),
  };

  const skills = {
    sprout: t("experience.sprout.skills", { returnObjects: true }),
    mrhost: t("experience.mrhost.skills", { returnObjects: true }),
  };

  const experiences = ["sprout", "mrhost"] as const;

  console.log(contents, skills);

  return (
    <section
      id="experience"
      className="xs:px-8 mx-auto max-w-screen-md px-4 py-4 md:py-12 lg:px-0"
    >
      <Title text={t("experience.title")} />
      <Accordion
        type="single"
        collapsible
        defaultValue={experiences[0]}
        className="w-full space-y-3"
      >
        {experiences.map((key) => (
          <AccordionItem value={key} key={key}>
            <AccordionTrigger className="flex cursor-pointer flex-wrap items-center justify-between rounded-b-none bg-pink-600 p-4 text-base/7 text-white hover:no-underline">
              <span>{t(`experience.${key}.position`)}</span>
              <span className="ml-auto text-xs font-normal sm:text-sm">
                {t(`experience.${key}.date`)}
              </span>
            </AccordionTrigger>
            <AccordionContent className="border-x-2 border-b-2 border-pink-500 p-4">
              <div className="mb-3 flex items-center gap-x-2">
                <img
                  src={`/images/${key}.webp`}
                  alt={key}
                  className="h-auto w-12"
                />
                <div className="space-y-1.5">
                  <a
                    href={t(`${key}.link`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="xs:w-fit inline-flex items-center justify-end gap-x-1 hover:text-pink-700"
                  >
                    <span className="font-semibold">
                      {t(`experience.${key}.title`)}
                    </span>
                    <SquareArrowOutUpRight className="-mb-0.5 h-3.5 w-3.5" />
                  </a>
                  <div className="flex w-full items-center gap-x-1 font-normal text-zinc-400">
                    <MapPin className="h-3.5 w-3.5" />
                    <p className="text-xs text-nowrap">
                      {t(`experience.${key}.location`)}
                    </p>
                  </div>
                </div>
              </div>
              <ul className="list-disc pl-5 text-base leading-[1.85] marker:text-pink-800">
                {contents[key] && typeof contents[key] === "object"
                  ? Object.entries(
                      contents[key] as Record<string, unknown>,
                    ).map(([index, item]) =>
                      typeof item === "object" && item !== null ? (
                        <li key={index} className="list-none">
                          <ul className="pl-4">
                            {Object.values(
                              item as Record<string, React.ReactNode>,
                            ).map((subItem, subIndex) => (
                              <li
                                key={subIndex}
                                className="list-[circle] marker:text-pink-800"
                              >
                                {subItem}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ) : (
                        <li key={index}>{item as React.ReactNode}</li>
                      ),
                    )
                  : null}
              </ul>
              <ul className="mt-8 flex flex-wrap items-center gap-2">
                {skills[key] && typeof skills[key] === "object"
                  ? Object.values(skills[key] as Record<string, string>).map(
                      (skill, index) => (
                        <li
                          key={index}
                          className="rounded-full bg-pink-200/80 px-3 py-1 text-xs"
                        >
                          {skill}
                        </li>
                      ),
                    )
                  : null}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Experience;
