import React from "react";

interface TitleProps {
  text: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ text, className }) => (
  <h2
    className={`mx-auto mb-6 w-fit border-b-4 border-pink-500 pb-1 text-2xl font-medium tracking-wider ${className}`}
  >
    {text}
  </h2>
);

export default Title;
