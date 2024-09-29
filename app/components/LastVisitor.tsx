"use client";

import { useEffect } from "react";

export default function LastVisitor() {
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch("/api/geolocation");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching geolocation:", error);
      }
    };

    fetchLocation();
  }, []);

  return <></>;
}
