import { useTranslation } from "react-i18next";

import ProjectCard from "@/components/ProjectCard";
import Title from "@/components/Title";

const Projects: React.FC = () => {
  const { t } = useTranslation();

  const projectsList = t("projects.projectsList", { returnObjects: true });

  return (
    <section
      id="projects"
      className="mx-auto bg-yellow-50/20 pt-16 pb-8 lg:py-24"
    >
      <Title className="mb-8" text={t("projects.title")} />
      <div className="mx-auto w-fit space-y-20">
        {Object.keys(projectsList).map((project) => (
          <ProjectCard key={project} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
