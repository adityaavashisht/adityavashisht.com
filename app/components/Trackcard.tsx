"use client";

import Image from "next/image";
import formatDate from "../utils/formatDate";
import { useEffect, useRef, useState } from "react";

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
  const [averageColor, setAverageColor] = useState("");
  const imgRef = useRef<HTMLImageElement | null>(null);

  console.log(trackUrl);
  useEffect(() => {
    if (imgRef.current) {
      const image = imgRef.current;

      image.crossOrigin = "Anonymous";

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (ctx) {
          const width = image.width;
          const height = image.height;
          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(image, 0, 0, width, height);

          const imageData = ctx.getImageData(0, 0, width, height);
          const { data } = imageData;
          let r = 0,
            g = 0,
            b = 0;

          for (let i = 0; i < data.length; i += 4) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
          }

          const pixelCount = data.length / 4;
          r = Math.floor(r / pixelCount);
          g = Math.floor(g / pixelCount);
          b = Math.floor(b / pixelCount);

          const averageColor = `rgb(${r}, ${g}, ${b})`;
          setAverageColor(averageColor);
        }
      };
    }
  }, []);
  return (
    <div className="w-full rounded-lg py-1 px-1 bg-card flex flex-col space-y-1">
      <div className="w-full border rounded-lg flex bg-background items-center justify-between shadow-sm p-1">
        <div className="flex space-x-2">
          <Image
            ref={imgRef}
            src={imgUrl}
            alt=""
            width={54}
            height={54}
            className="rounded-lg shadow-sm"
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
          <div className="music-bars">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="bar w-[0.3rem] rounded-lg"
                  style={{ background: averageColor, opacity: 0.9 }}
                />
              ))}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-1 pl-1">
        <span
          className={`h-2 w-2 rounded-full shadow-sm ${
            isPlaying ? "bg-green-500" : "bg-gray-400"
          }`}
        />
        <span className="text-xs text-gray-400">
          {isPlaying
            ? "Listening now"
            : lastPlayedAt
            ? `Last played at ${formatDate(lastPlayedAt)}`
            : null}
        </span>
      </div>
    </div>
  );
}
