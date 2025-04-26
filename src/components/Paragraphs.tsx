import React from "react";

interface ParagraphsProps {
  text: string;
  className?: string;
}

const Paragraphs: React.FC<ParagraphsProps> = ({ text, className }) =>
  text.split("\n").map((line, index) => (
    <p key={index} className={`text-base/8 ${className}`}>
      {line}
    </p>
  ));

export default Paragraphs;
