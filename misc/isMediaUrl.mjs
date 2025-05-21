export function isMediaUrl(url) {
  const validUrls = [
    "https://www.youtube.com/watch?v=",
    "https://www.tiktok.com/",
    "https://www.instagram.com/",
    "https://www.facebook.com/",
    "https://www.twitter.com/",
  ];

  return validUrls.some((validUrl) => url.startsWith(validUrl));
}
