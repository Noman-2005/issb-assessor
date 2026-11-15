"use client";

import { useEffect } from "react";
import { preloadWhenIdle } from "@/lib/preloadImages";

export default function ImagePreloader({ urls }: { urls: string[] }) {
  useEffect(() => {
    preloadWhenIdle(urls);
  }, [urls]);

  return null;
}