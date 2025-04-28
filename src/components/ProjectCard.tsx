import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import Paragraphs from "@/components/Paragraphs";

interface ProjectCardProps {
  project: string;
}

interface TitleBlockProps {
  subtitle: string;
  title: string;
  className?: string;
}

type ProjectData = {
  subtitle: string;
  title: string;
  description: string;
  techStack: Record<string, string>;
  features: Record<string, string>;
  [key: string]: string | Record<string, string> | undefined;
};

const TitleBlock: React.FC<TitleBlockProps> = ({
  subtitle,
  title,
  className,
}) => (
  <div className={cn("mb-4", className)}>
    <p className="text-sm text-pink-700">{subtitle}</p>
    <h3 className="text-1.5xl/10 font-medium">{title}</h3>
  </div>
);

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useTranslation();

  const projectData = t(`projects.projectsList.${project}`, {
    returnObjects: true,
  }) as ProjectData;
  const linkLabels = t("projects.links", { returnObjects: true }) as Record<
    string,
    string
  >;

  return (
    <section key={project}>
      <TitleBlock
        subtitle={projectData.subtitle}
        title={projectData.title}
        className="px-8 lg:hidden"
      />
      <div className="flex max-w-screen-xl flex-col gap-x-4 px-8 lg:flex-row lg:gap-x-8">
        <div className="space-y-3 lg:max-w-xl">
          <img
            src={`images/projects/${project}.webp`}
            alt={project}
            className="w-full rounded-md shadow"
          />
          <ul className="flex flex-wrap gap-x-3">
            {Object.entries(projectData.techStack).map(([key, item]) => (
              <li key={key} className="text-sm/6 text-pink-600">
                #{item}
              </li>
            ))}
          </ul>
        </div>
        {/* 作品介紹 */}
        <div>
          <TitleBlock
            subtitle={projectData.subtitle}
            title={projectData.title}
            className="hidden lg:block"
          />
          <div className="mt-4 space-y-3">
            <Paragraphs text={projectData.description} />
            <ul className="list-disc space-y-1 pl-5 leading-8 marker:text-pink-800">
              {Object.entries(projectData.features).map(([key, feature]) => (
                <li key={key}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex justify-end gap-2.5">
            {Object.keys(linkLabels).map((linkKey) => {
              const link = projectData[linkKey];
              if (typeof link !== "string") return null;

              const isWebsite = linkKey === "website";
              const extraNote =
                project === "stocklight"
                  ? isWebsite
                    ? " (已無維護)"
                    : linkKey === "github"
                      ? " (FE)"
                      : ""
                  : "";

              return (
                <a
                  key={linkKey}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-fit rounded-md px-4 py-2 text-sm hover:no-underline",
                    isWebsite
                      ? "bg-pink-700 text-white"
                      : "border border-pink-700 bg-white text-pink-700",
                  )}
                >
                  <span>{linkLabels[linkKey]}</span>
                  {extraNote && (
                    <span className="text-xs opacity-85">{extraNote}</span>
                  )}
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
