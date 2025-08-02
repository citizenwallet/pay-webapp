export function getBaseUrl(): string {
  // Check for environment variable first
  if (typeof window !== "undefined") {
    // Client-side: use window.location.origin as fallback
    return process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
  }

  // Server-side: use environment variable with fallback
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}

export function getFullUrl(path: string): string {
  const baseUrl = getBaseUrl();
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
