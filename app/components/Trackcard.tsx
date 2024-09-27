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
  const [averageColor, setAverageColor] = useState("");
  const calculateAverageColor = useCallback((img: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx) {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
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

      setAverageColor(`rgb(${r}, ${g}, ${b})`);
    }
  }, []);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgUrl;
    img.onload = () => calculateAverageColor(img);
    img.onerror = () =>
      console.error("Error loading image for color calculation");
  }, [imgUrl, calculateAverageColor]);

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
          <div className="music-bars">
            <svg
              className={"w-4 h-4"}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill={averageColor}
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            {Array(7)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="bar w-[0.25rem] rounded-lg"
                  style={{ background: averageColor, opacity: 0.9 }}
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
