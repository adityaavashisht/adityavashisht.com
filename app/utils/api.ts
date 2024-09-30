export interface GetGeoLocationResType {
  city: string;
  country: string;
  flag: string;
  countryRegion: string;
  region: string;
  latitude: string;
  longitude: string;
}

export const GetGeoLocation = async (): Promise<
  GetGeoLocationResType | undefined
> => {
  return (await fetch("/api/geolocation")).json();
};
