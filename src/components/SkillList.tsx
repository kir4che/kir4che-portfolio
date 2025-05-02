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
      <Title text={t("skill.title")} className="mb-4" />
      <p className="mb-2 text-center text-zinc-900">{t("skill.subtitle")}</p>
      <p className="mb-5 text-center text-xs text-zinc-900/50">
        {t("skill.tip")}
      </p>
      <div className="xs:ounded-lg bg-pink-200 py-5">
        <div className="relative mx-auto max-w-screen-md space-y-4 bg-white px-2 pt-8 pb-2 sm:space-y-6 sm:px-0 md:rounded-xl">
          {categories.map((cat) => {
            const skills = t(`skill.${cat}`, { returnObjects: true });

            return (
              <div
                key={cat}
                className="xs:gap-x-0 flex flex-wrap items-center justify-center gap-x-6 gap-y-4"
              >
                {Object.entries(skills).map(([key, skill]) => (
                  <TooltipProvider key={key}>
                    <Tooltip>
                      <TooltipTrigger className="xs:px-4 flex flex-col items-center gap-1.5">
                        <Icon src={`icons/${key}.svg`} alt={skill.name} />
                        <span className="text-center text-sm text-zinc-900">
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
            className="absolute -bottom-3 z-30 hidden max-h-40 max-w-40 rotate-3 sm:block lg:-left-16"
          />
        </div>
      </div>
    </div>
  );
};

export default SkillList;
