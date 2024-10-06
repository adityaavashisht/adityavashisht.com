"use client";

import NextImage from "next/image";
import { useEffect, useState, useCallback } from "react";
import formatDate from "../utils/formatDate";

interface TrackCardProps {
  lastPlayedAt: string;
  isPlaying: boolean;
  name: string;
  imgUrl: string;
  artist: string;
  trackUrl: string;
}

export default function TrackCard({
  isPlaying,
  name,
  artist,
  imgUrl,
  trackUrl,
  lastPlayedAt,
}: TrackCardProps) {
  const [dominantColors, setDominantColors] = useState<string[]>([]);

  const calculateDominantColors = useCallback((img: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const regions = 3;
      const regionColors: string[] = [];

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      for (let i = 0; i < regions; i++) {
        const startY = (img.height / regions) * i;
        const imageData = ctx.getImageData(
          0,
          startY,
          img.width,
          img.height / regions
        );
        const data = imageData.data;
        let r = 0,
          g = 0,
          b = 0;
        let pixelCount = 0;

        for (let j = 0; j < data.length; j += 4) {
          const pixelR = data[j];
          const pixelG = data[j + 1];
          const pixelB = data[j + 2];

          const brightness = (pixelR + pixelG + pixelB) / 3;
          if (brightness > 30) {
            r += pixelR;
            g += pixelG;
            b += pixelB;
            pixelCount++;
          }
        }

        if (pixelCount > 0) {
          r = Math.floor(r / pixelCount);
          g = Math.floor(g / pixelCount);
          b = Math.floor(b / pixelCount);

          regionColors.push(`rgb(${r}, ${g}, ${b})`);
        }
      }

      setDominantColors(regionColors);
    }
  }, []);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgUrl;
    img.onload = () => calculateDominantColors(img);
    img.onerror = () =>
      console.error("Error loading image for color calculation");
  }, [imgUrl, calculateDominantColors]);

  return (
    <div className="w-full rounded-lg py-1 px-1 bg-card flex flex-col space-y-1">
      <div className="w-full border rounded-lg flex bg-background items-center justify-between shadow-sm p-1">
        <div className="flex space-x-2">
          <NextImage
            src={imgUrl}
            alt={`Album cover for ${name} by ${artist}`}
            width={54}
            height={54}
            className="rounded-lg shadow-sm"
            unoptimized
          />
          <div className="flex flex-col justify-center gap-y-1">
            <a
              className="text-sm truncate max-w-48 sm:max-w-64 md:max-w-80 underline decoration-decoration cursor-pointer hover:text-muted transition-all"
              href={trackUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {name}
            </a>
            <p className="text-sm text-muted">{artist}</p>
          </div>
        </div>
        {isPlaying && (
          <div className="music-bars flex gap-x-[0.13rem] h-[0.2rem]">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="bar h-full w-[0.13rem] rounded-[0.03rem]"
                  style={{
                    background: `linear-gradient(180deg, ${
                      dominantColors[0]
                    }, ${dominantColors[dominantColors.length - 1]})`,
                  }}
                />
              ))}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex space-x-1 pl-1 items-center">
          <span
            className={`h-2 w-2 rounded-full shadow-sm ${
              isPlaying ? "bg-green-500" : "bg-gray-400"
            }`}
          />
          <span className="text-xs text-gray-400">
            {isPlaying
              ? "Listening now"
              : lastPlayedAt
              ? `Last played on ${formatDate(lastPlayedAt)}`
              : null}
          </span>
        </div>
      </div>
    </div>
  );
}
