import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates the estimated read time in minutes for a given content
 * @param content The content to calculate read time for
 * @returns The estimated read time in minutes
 */
export function calculateReadTime(content) {
  // Average reading speed (words per minute)
  const WORDS_PER_MINUTE = 200;

  // Remove HTML tags and count words
  const textContent = content.replace(/<[^>]*>/g, "");
  const wordCount = textContent.trim().split(/\s+/).length;

  // Calculate read time in minutes
  const readTime = Math.ceil(wordCount / WORDS_PER_MINUTE);

  // Return at least 1 minute
  return Math.max(1, readTime);
}

export const getImageUrl = (image, size) => {
  if (!image) {
    return "";
  }
  if (!image.formats) {
    return "";
  }
  if (image.formats[size]) {
    return image.formats[size].url;
  }
  if (size === "large" && image.formats.medium) {
    return image.formats.medium.url;
  }
  if ((size === "large" || size === "medium") && image.formats.small) {
    return image.formats.small.url;
  }
  if (
    (size === "large" || size === "medium" || size === "small") &&
    image.formats.thumbnail
  ) {
    return image.formats.thumbnail.url;
  }
  if (image.url) {
    return image.url;
  }
  return "";
};
