"use client";

import { useEffect, useState } from "react";
import { GetGeoLocation, GetGeoLocationResType } from "../utils/api";

export default async function LastVisitor() {
  const [geodata, setGeoData] = useState<GetGeoLocationResType | undefined>();

  useEffect(() => {
    GetGeoLocation()
      .then((data) => {
        setGeoData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <span className="font-light ml-1">
      {geodata?.city}
      {geodata?.countryRegion && " " + geodata?.countryRegion + ","}
      {geodata?.country && " " + geodata?.country}
    </span>
  );
}
