"use server";

import { getNowPlaying, getRecentlyPlayed } from "../utils/spotify";
import TrackCard from "./Trackcard";

export default async function Spotify() {
  const nowPlaying = await getNowPlaying();
  const recentlyPlayed = await getRecentlyPlayed();

  if (!nowPlaying && (!recentlyPlayed || recentlyPlayed.items.length === 0)) {
    return null;
  }

  const isPlaying = Boolean(nowPlaying);
  const track = isPlaying ? nowPlaying?.item : recentlyPlayed?.items[0].track;
  const imgUrl = track?.album.images[2]?.url || "";
  const trackName = track?.name || "";
  const artist = track?.artists[0]?.name || "";
  const trackUrl = track?.external_urls?.spotify || "#";
  const lastPlayedAt = isPlaying
    ? undefined
    : recentlyPlayed?.items[0].played_at;

  return (
    <TrackCard
      isPlaying={isPlaying}
      name={trackName}
      artist={artist}
      imgUrl={imgUrl}
      trackUrl={trackUrl}
      lastPlayedAt={lastPlayedAt}
    />
  );
}
