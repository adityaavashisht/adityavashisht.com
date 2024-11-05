"use server";

interface SpotifyImage {
  url: string;
}

interface SpotifyArtist {
  id: string;
  name: string;
  external_urls: {
    spotify: string;
  };
}

interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
}

interface SpotifyTrack {
  id: string;
  name: string;
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  external_urls: {
    spotify: string;
  };
}

export interface NowPlayingResponse {
  is_playing: boolean;
  item: SpotifyTrack;
  progress_ms: number;
  timestamp: number;
}

// Interface for getRecentlyPlayed response
export interface RecentlyPlayedResponse {
  items: {
    track: SpotifyTrack;
    played_at: string;
  }[];
  href: string;
}

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const BASIC_TOKEN = Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString(
  "base64"
);
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
const CURRENTLY_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

export const getAccessToken = async () => {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${BASIC_TOKEN}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN ? REFRESH_TOKEN : "",
    }),
    cache: "no-cache",
  });

  const data = await res.json();
  return data.access_token;
};

export const getNowPlaying = async (): Promise<NowPlayingResponse | null> => {
  try {
    const access_token = await getAccessToken();
    const res = await fetch(CURRENTLY_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (res.status === 204 || !res.ok) {
      return null;
    }
    return await res.json();
  } catch (error) {
    return null;
  }
};

export const getRecentlyPlayed =
  async (): Promise<RecentlyPlayedResponse | null> => {
    try {
      const access_token = await getAccessToken();
      const res = await fetch(RECENTLY_PLAYED_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (!res.ok) {
        return null;
      }
      return await res.json();
    } catch (error) {
      return null;
    }
  };
