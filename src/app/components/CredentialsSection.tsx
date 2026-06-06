"use client";

import Image from "next/image";
import FadeUp from "./FadeUp";
import { useLang } from "@/contexts/LanguageContext";
import { t, tx } from "../translations";
import { TbExternalLink } from "react-icons/tb";

const { education, certifications, label } = t.credentials;

const TimelineDot = () => (
  <span
    aria-hidden="true"
    className="absolute -left-6 top-1.5 size-2 rounded-full bg-accent border-2 border-paper"
  />
);

const ExternalLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center text-[0.8rem] xl:text-[0.9rem] gap-1 hover:text-accent transition-colors duration-200 group"
  >
    （{label}
    <TbExternalLink
      aria-hidden="true"
      className="opacity-50 group-hover:opacity-100 transition-opacity shrink-0 mb-px"
      size={16}
    />
    ）
  </a>
);

const HighlightDesc = ({
  text,
  highlight,
}: {
  text: readonly string[];
  highlight: string;
}) => {
  return (
    <>
      {text.map((line, i) => {
        const [before, after] = line.split(highlight);
        return (
          <span key={i}>
            {i > 0 && <br />}
            {after === undefined ? (
              line
            ) : (
              <>
                {before}
                <span className="text-accent-green font-medium">{highlight}</span>
                {after}
              </>
            )}
          </span>
        );
      })}
    </>
  );
};

const TimelineSection = ({
  label,
  delay,
  children,
}: {
  label: string;
  delay: number;
  children: React.ReactNode;
}) => (
  <div>
    <FadeUp
      as="p"
      delay={delay}
      className="text-[10px] xl:text-[11.5px] tracking-[0.22em] text-accent mb-5"
    >
      {label}
    </FadeUp>
    <div className="relative pl-5 border-l border-line">{children}</div>
  </div>
);

export default function CredentialsSection() {
  const { lang } = useLang();

  return (
    <div
      aria-label="Credentials"
      className="flex-1 px-8 md:pl-[8vw] md:pr-[4vw] flex flex-col gap-6 md:gap-8"
    >
      <FadeUp
        as="p"
        delay={0}
        className="text-xs xl:text-sm tracking-[0.28em] text-accent"
      >
        {tx(label, lang)}
      </FadeUp>
      <TimelineSection label={tx(education.sectionLabel, lang)} delay={0.06}>
        {education.items.map((item, i) => (
          <FadeUp key={i} delay={0.1 + i * 0.08} className="relative mb-0 pb-0">
            <TimelineDot />
            <div className="flex items-center gap-2 mb-2">
              <Image
                src={item.logo}
                alt={tx(item.name, lang)}
                width={30}
                height={30}
                className="object-contain shrink-0"
              />
              <p className="xl:text-[1.05rem] font-semibold leading-snug">
                {tx(item.name, lang)}
              </p>
            </div>
            <div className="flex justify-between items-baseline mb-3">
              <p className="text-xs xl:text-sm text-ink-muted">
                {tx(item.dept, lang)}
              </p>
              <p className="text-[10.5px] xl:text-xs text-ink-faint">
                {item.period}
              </p>
            </div>
            {"award" in item && (
              <div className="pl-2.5 border-l-2 border-accent/30">
                <p className="text-xs xl:text-sm font-medium text-ink-muted leading-relaxed mb-0.5">
                  {tx(item.award.title, lang)}
                  <ExternalLink
                    href={item.award.href}
                    label={tx(item.award.linkLabel, lang)}
                  />
                </p>
                <p className="text-[10.5px] xl:text-xs text-ink-faint leading-relaxed">
                  <HighlightDesc
                    text={item.award.desc[lang]}
                    highlight={tx(item.award.highlight, lang)}
                  />
                </p>
              </div>
            )}
          </FadeUp>
        ))}
      </TimelineSection>
      <TimelineSection
        label={tx(certifications.sectionLabel, lang)}
        delay={0.18}
      >
        {certifications.items.map((item, i) => (
          <FadeUp
            key={i}
            delay={0.22 + i * 0.08}
            className="relative pb-6 last:pb-0"
          >
            <TimelineDot />
            <div className="flex items-center gap-2 mb-1.5">
              <Image
                src={item.logo}
                alt={item.issuer}
                width={25}
                height={25}
                className="object-contain shrink-0"
              />
              <p className="xl:text-[1.05rem] font-semibold leading-snug">
                {tx(item.name, lang)}{" "}
                <ExternalLink
                  href={item.href}
                  label={tx(certifications.linkLabel, lang)}
                />
              </p>
            </div>
            <div className="flex justify-between items-baseline">
              <p className="text-xs xl:text-sm text-ink-muted">{item.issuer}</p>
              <p className="text-[10.5px] xl:text-xs text-ink-faint">
                {tx(item.date, lang)}
              </p>
            </div>
          </FadeUp>
        ))}
      </TimelineSection>
      <Image
        src="/images/deco-binder-clip.webp"
        alt=""
        width={68}
        height={80}
        className="absolute top-[-3vh] left-[36vw] max-md:hidden rotate-15 opacity-80"
      />
    </div>
  );
}
