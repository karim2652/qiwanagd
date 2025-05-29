import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names and merges Tailwind CSS classes efficiently
 * Inspired by shadcn/ui utility pattern
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
