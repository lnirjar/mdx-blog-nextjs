import Image, { StaticImageData } from "next/image";

import BlueCarImage from "@/content/images/blue-car.jpg";
import BlackCarImage from "@/content/images/black-car.jpg";

type ImageFileName = "black-car.jpg" | "blue-car.jpg";

interface MdxImageProps {
  src: ImageFileName;
  alt: string;
}

const imageMap: Record<ImageFileName, StaticImageData> = {
  "black-car.jpg": BlackCarImage,
  "blue-car.jpg": BlueCarImage,
};

export const MdxImage = ({ src, alt }: MdxImageProps) => {
  if (!imageMap[src]) {
    throw new Error(
      `Invalid image path: ${src}. Valid paths must be of type ImageFileName.`
    );
  }

  return <Image src={imageMap[src]} alt={alt} placeholder="blur" />;
};
