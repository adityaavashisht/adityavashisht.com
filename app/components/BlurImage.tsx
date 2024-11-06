"use server";

import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

interface BlurImageProps {
  src: string;
  alt: string;
  height: number;
  width: number;
  className: string;
}

async function getBlurDataURL(imageUrl: string): Promise<string | null> {
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) {
      return null;
    }
    const buffer = await res.arrayBuffer();
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));
    return base64;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return null;
  }
}

export default async function BlurImage({
  src,
  alt,
  height,
  width,
  className,
}: BlurImageProps) {
  const blurDataURL = await getBlurDataURL(src);
  return (
    <div className="relative w-full aspect-video">
      <Image
        className={className}
        height={height}
        width={width}
        src={src}
        alt={alt}
        placeholder="blur"
        blurDataURL={blurDataURL || undefined}
      />
    </div>
  );
}
