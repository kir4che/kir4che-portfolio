"use client";

import HorizontalScroll from "@/components/HorizontalScroll";
import Header from "@/components/Header";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import ExperienceSection from "@/components/ExperienceSection";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import WorksSection from "@/components/WorksSection";

export default function Home() {
  return (
    <HorizontalScroll header={<Header />}>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <WorksSection />
      <ExperienceSection />
      <ContactSection />
    </HorizontalScroll>
  );
}
