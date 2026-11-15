// Keeps preloaded images alive so the browser cache serves them instantly.
const kept: HTMLImageElement[] = [];

export function preloadImages(urls: string[]) {
  if (typeof window === "undefined") return;

  urls.forEach((url) => {
    const img = new window.Image();
    img.decoding = "async";
    img.src = url;
    kept.push(img);
  });
}

// Preloads without blocking anything the user is doing right now.
export function preloadWhenIdle(urls: string[]) {
  if (typeof window === "undefined") return;

  const run = () => preloadImages(urls);

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(run, { timeout: 1500 });
  } else {
    setTimeout(run, 300);
  }
}