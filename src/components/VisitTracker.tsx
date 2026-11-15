"use client";

import { useEffect } from "react";

export default function VisitTracker() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("issb-hit-counted")) return;
      sessionStorage.setItem("issb-hit-counted", "1");
    } catch {
      // storage blocked: still count this visit
    }

    fetch("/api/hits", { method: "POST" }).catch(() => {});
  }, []);

  return null;
}