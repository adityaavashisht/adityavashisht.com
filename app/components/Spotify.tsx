"use Server";

import { getNowPlaying, getRecentlyPlayed } from "../utils/spotify";
import TrackCard from "./Trackcard";

export default async function Spotify() {
  const nowPlaying = await getNowPlaying();
  const recentlyPlayed = await getRecentlyPlayed();

  if (!nowPlaying && !recentlyPlayed) {
    return null;
  }
  return (
    <TrackCard
      isPlaying={nowPlaying}
      name={
        nowPlaying ? nowPlaying.item.name : recentlyPlayed.items[0].track.name
      }
      artist={
        nowPlaying
          ? nowPlaying.item.artists[0].name
          : recentlyPlayed.items[0].track.artists[0].name
      }
      imgUrl={
        nowPlaying
          ? nowPlaying.item.album.images[2].url
          : recentlyPlayed.items[0].track.album.images[2].url
      }
      trackUrl={
        nowPlaying
          ? nowPlaying.item.external_urls.spotify
          : recentlyPlayed.items[0].href
      }
      lastPlayedAt={recentlyPlayed.items[0].played_at}
    />
  );
}
