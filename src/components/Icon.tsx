import { useState } from "react";

interface IconProps {
  src: string;
  alt: string;
}

const Icon: React.FC<IconProps> = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className="xs:h-12 xs:w-12 h-9 w-9"
      onError={() => setImgSrc("/icons/no-image.svg")}
      tabIndex={0}
      aria-describedby={`${alt}-tooltip`}
    />
  );
};

export default Icon;
