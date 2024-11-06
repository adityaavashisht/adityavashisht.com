import formatDate from "../utils/formatDate";
import AudioWave from "./AudioWave";
import Speaker from "./Speaker";
import BlurImage from "./BlurImage";

interface TrackCardProps {
  lastPlayedAt: string | undefined;
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
  return (
    <div className="w-full rounded-xl bg-card flex flex-col space-y-1">
      <div className="w-full rounded-xl flex items-center justify-between shadow-sm p-1 pr-2 border border-decoration  bg-[#141415] h-16 ">
        <div className="flex space-x-2 h-full items-center">
          <BlurImage
            src={imgUrl}
            alt={`Album cover for ${name} by ${artist}`}
            width={54}
            height={54}
            className="rounded-lg shadow-sm"
          />
          <div className="flex flex-col justify-center h-full gap-y-1 ">
            <div className="flex flex-row space-x-1 items-baseline ">
              <a
                className="text-sm truncate max-w-48 sm:max-w-80 underline underline-offset-4 decoration-decoration cursor-pointer hover:text-saturated"
                href={trackUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {name}
              </a>
            </div>
            <span className="text-sm opacity-65">{artist}</span>
          </div>
        </div>
        {isPlaying && <Speaker />}
      </div>
      <div className="flex justify-between items-center px-2 pb-2">
        <div className="flex space-x-1 items-center">
          <span
            className={`h-2 w-2 rounded-full shadow-sm ${
              isPlaying ? "bg-green-500" : "bg-gray-400"
            }`}
          />
          <span className="text-xs font-light">
            {isPlaying
              ? "Listening now"
              : lastPlayedAt
              ? `Last played on ${formatDate(lastPlayedAt)}`
              : null}
          </span>
        </div>
        {isPlaying && <AudioWave />}
      </div>
    </div>
  );
}
