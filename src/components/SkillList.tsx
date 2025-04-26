import { useTranslation } from "react-i18next";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Icon from "@/components/Icon";
import Title from "@/components/Title";
import Paragraphs from "@/components/Paragraphs";

const SkillList: React.FC = () => {
  const { t } = useTranslation();

  const categories = ["frontend", "backend", "languages", "others"] as const;

  return (
    <div id="skill" className="mx-auto pt-6">
      <Title text={t("skill.title")} />
      <p className="mb-2 text-center">{t("skill.subtitle")}</p>
      <p className="text-text-zinc-light mb-5 text-center text-xs">
        {t("skill.tip")}
      </p>
      <div className="xs:ounded-lg bg-pink-200 py-5">
        <div className="relative mx-auto max-w-screen-md space-y-4 bg-white pt-8 pb-2 sm:space-y-6 md:rounded-xl">
          {categories.map((cat) => {
            const skills = t(`skill.${cat}`, { returnObjects: true });

            return (
              <div
                key={cat}
                className="xs:gap-x-0 flex flex-wrap items-center justify-center gap-x-6 gap-y-4"
              >
                {Object.entries(skills).map(([key, skill]) => (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex flex-col items-center gap-1.5 px-4">
                        <Icon src={`icons/${key}.svg`} alt={skill.name} />
                        <span className="xs:block hidden text-center text-sm">
                          {skill.name}
                        </span>
                      </TooltipTrigger>
                      {skill.level && (
                        <TooltipContent>
                          <Paragraphs
                            text={skill.level}
                            className="text-sm/6 text-nowrap"
                          />
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            );
          })}
          <img
            src="images/beaver.webp"
            alt="Beaver illustration"
            className="absolute -bottom-3 z-50 hidden max-h-40 max-w-40 rotate-3 sm:block lg:-left-16"
          />
        </div>
      </div>
    </div>
  );
};

export default SkillList;
