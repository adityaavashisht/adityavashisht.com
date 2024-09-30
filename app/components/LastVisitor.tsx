"use client";

import { useEffect, useState } from "react";
import { GetGeoLocation, GetGeoLocationResType } from "../utils/api";

export default function LastVisitor() {
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
    <>
      {geodata && geodata.city && (
        <p>
          Current visitor from:{" "}
          <span className="font-light">
            {geodata?.city}
            {geodata.countryRegion && " " + geodata?.countryRegion + ","}
            {geodata.country && " " + geodata?.country}
          </span>
        </p>
      )}
    </>
  );
}
