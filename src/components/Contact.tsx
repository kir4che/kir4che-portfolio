import { useTranslation } from "react-i18next";

import Title from "@/components/Title";
import Paragraphs from "@/components/Paragraphs";

const Contact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="px-4 py-12 md:py-20">
      <Title text={t("contact.title")} className="mb-4" />
      <div className="mb-8">
        <Paragraphs text={t("contact.subtitle")} className="text-center" />
      </div>
      <a
        href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=mollydcxxiii@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group xs:w-56 relative mx-auto block overflow-hidden rounded-full border-2 border-pink-600 bg-white py-3 text-center font-medium tracking-widest !text-pink-600"
        aria-label="Contact me"
        aria-describedby="contact"
      >
        <span className="ease absolute top-0 left-0 h-0 w-0 border-t-2 border-pink-600 transition-all duration-200 group-hover:w-full" />
        <span className="ease absolute right-0 bottom-0 h-0 w-0 border-b-2 border-pink-600 transition-all duration-200 group-hover:w-full" />
        <span className="ease absolute top-0 left-0 h-0 w-full bg-pink-600 transition-all delay-200 duration-300 group-hover:h-full" />
        <span className="ease absolute bottom-0 left-0 h-0 w-full bg-pink-600 transition-all delay-200 duration-300 group-hover:h-full" />
        <span className="absolute inset-0 h-full w-full bg-pink-600 opacity-0 delay-300 duration-300 group-hover:opacity-100" />
        <span className="ease relative transition-colors delay-200 duration-300 group-hover:text-white">
          {t("contact.button")}
        </span>
      </a>
    </section>
  );
};

export default Contact;
