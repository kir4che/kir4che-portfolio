import { useTranslation } from "react-i18next";

import Paragraphs from "@/components/Paragraphs";

interface ProjectCardProps {
  project: string;
}

const TitleBlock: React.FC<{
  subtitle: string;
  title: string;
  className?: string;
}> = ({ subtitle, title, className }) => (
  <div className={`mb-4 ${className}`}>
    <p className="text-sm text-pink-700">{subtitle}</p>
    <h3 className="text-1.5xl/10 font-medium">{title}</h3>
  </div>
);

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useTranslation();

  const techStack = t(`projects.${project}.techStack`, { returnObjects: true });
  const features = t(`projects.${project}.features`, { returnObjects: true });

  const projectLinks = ["website", "demoVideo", "github"] as const;

  return (
    <section key={project}>
      <TitleBlock
        subtitle={t(`projects.${project}.subtitle`)}
        title={t(`projects.${project}.title`)}
        className="px-8 lg:hidden"
      />
      <div className="flex max-w-screen-xl flex-col gap-x-4 px-8 lg:flex-row lg:gap-x-8">
        <div className="space-y-3 lg:max-w-xl">
          <img
            src={`/images/${project}.webp`}
            alt={project}
            className="w-full rounded-md shadow"
          />
          <ul className="flex flex-wrap gap-x-3">
            {Object.entries(techStack).map(([key, item]) => (
              <li key={key} className="text-sm/6 text-pink-600">
                #{item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <TitleBlock
            subtitle={t(`projects.${project}.subtitle`)}
            title={t(`projects.${project}.title`)}
            className="hidden lg:block"
          />
          <div className="mt-4 space-y-3">
            <Paragraphs text={t(`projects.${project}.description`)} />
            <ul className="list-disc space-y-1 pl-5 leading-8 marker:text-pink-800">
              {Object.entries(features).map(([key, item]) => (
                <li key={key}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex justify-end gap-2.5">
            {projectLinks
              .filter((linkType) => !!t(`projects.${project}.${linkType}`))
              .map((linkType) => {
                const linkData = t(`projects.${project}.${linkType}`);
                return (
                  <a
                    key={linkType}
                    href={linkData}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-fit rounded-md px-4 py-2 text-sm hover:no-underline ${linkType === "website" ? "bg-pink-700 text-white" : "border border-pink-700 bg-white text-pink-700"}`}
                  >
                    <span>{t(`projects.${linkType}`)} </span>
                    <span className="text-xs opacity-85">
                      {project === "stocklight" &&
                        linkType === "website" &&
                        " (已無維護)"}
                      {project === "stocklight" &&
                        linkType === "github" &&
                        " (FE)"}
                    </span>
                  </a>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCard;
