import React from "react";

import { cn } from "@/lib/utils";

interface ParagraphsProps {
  text: string;
  className?: string;
}

const Paragraphs: React.FC<ParagraphsProps> = ({ text, className }) =>
  text.split("\n").map((line, index) => (
    <p key={index} className={cn("text-base/8 text-zinc-900", className)}>
      {line}
    </p>
  ));

export default Paragraphs;
