import { useTranslation } from "react-i18next";
import { Play } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Paragraphs from "@/components/Paragraphs";

interface ProjectCardProps {
  project: string;
}

type ProjectData = {
  subtitle: string;
  title: string;
  maintain: string;
  description: string;
  techStack: Record<string, string>;
  features: Record<string, string>;
  [key: string]: string | Record<string, string> | undefined;
};

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
    <section
      key={project}
      className="space-y-1.5 md:max-w-lg lg:max-w-xl 2xl:max-w-2xl"
    >
      <div>
        <p className="text-xs text-pink-500">{projectData.subtitle}</p>
        <div className="flex items-center justify-between">
          <h3 className="text-1.5xl/9 font-medium">{projectData.title}</h3>
          {projectData.maintain && (
            <Badge className="rounded-full bg-red-100/30 font-normal text-red-700/60">
              {t(`projects.maintain.${projectData.maintain}`)}
            </Badge>
          )}
        </div>
      </div>
      {projectData.hasVideo ? (
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative cursor-pointer transition-transform duration-300 hover:scale-[102%]">
              <img
                src={`images/projects/${project}.webp`}
                alt={project}
                className="aspect-video w-full rounded-md shadow"
                loading="lazy"
              />
              <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-md bg-pink-950/10 transition-opacity duration-300">
                <Play
                  fill="currentColor"
                  className="h-14 w-14 rounded-full bg-white/85 p-4 text-pink-500 shadow"
                />
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="aspect-video w-full min-w-full border-none p-0 md:max-w-4xl md:min-w-auto lg:max-w-5xl xl:max-w-6xl [&>button]:hidden">
            <video
              preload="auto"
              autoPlay
              muted
              controls
              className="h-full w-full focus:outline-none md:rounded-xl"
            >
              <source src={`videos/projects/${project}.mp4`} type="video/mp4" />
            </video>
          </DialogContent>
        </Dialog>
      ) : (
        <img
          src={`images/projects/${project}.webp`}
          alt={project}
          className="aspect-video w-full rounded-md shadow"
        />
      )}
      <ul className="flex flex-wrap gap-x-3">
        {Object.entries(projectData.techStack).map(([key, item]) => (
          <li key={key} className="text-sm/5.5 text-pink-700/80">
            ＃{item}
          </li>
        ))}
      </ul>
      {/* 作品介紹 */}
      <div className="space-y-3">
        <Paragraphs text={projectData.description} />
        <ul className="list-disc space-y-1 pl-5 leading-8 text-zinc-900 marker:text-pink-800">
          {Object.entries(projectData.features).map(([key, feature]) => (
            <li key={key}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex justify-end gap-2.5">
        {Object.keys(linkLabels).map((linkKey) => {
          const link = projectData[linkKey];
          if (typeof link !== "string") return null;

          return (
            <a
              key={linkKey}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "w-fit rounded-md px-4 py-2 text-sm hover:no-underline",
                linkKey === "website"
                  ? "bg-pink-700 !text-white"
                  : "border border-pink-700 bg-white !text-pink-700",
                projectData.suspended &&
                  linkKey === "website" &&
                  "cursor-not-allowed bg-gray-400/65",
              )}
              onClick={(e) => {
                if (projectData.suspended && linkKey === "website")
                  e.preventDefault();
              }}
            >
              <span>{linkLabels[linkKey]}</span>
              <span className="text-xs opacity-85">
                {projectData.suspended &&
                  linkKey === "website" &&
                  ` (${projectData.suspended})`}
                {project === "stocklight" && linkKey === "code" && " (FE)"}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectCard;
