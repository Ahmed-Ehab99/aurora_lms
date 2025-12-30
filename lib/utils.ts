import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const IMAGE_MAX_SIZE = 5 * 1024 * 1024; // 5MB
export const VIDEO_MAX_SIZE = 5 * 1024 * 1024 * 1024; // 5GB

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatFileSize = (bytes: number) => {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(0)}GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(0)}MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${bytes}B`;
};
