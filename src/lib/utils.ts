import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getURL() {
  let url =
    process.env.NEXT_PUBLIC_APP_URL ?? // Set this to your site URL in production env.
    process.env.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000";

  // Prioritize window.location.origin if available (client-side)
  // This ensures that redirects work correctly on localhost and preview deployments
  // without needing to manually set NEXT_PUBLIC_APP_URL every time.
  if (typeof window !== "undefined") {
    url = window.location.origin;
  }

  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;

  // Protocol Check: Force https:// in non-localhost environments
  if (!url.includes("http://localhost") && url.includes("http://")) {
    url = url.replace("http://", "https://");
  }

  return url;
}
