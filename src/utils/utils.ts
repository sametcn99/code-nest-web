import JSZip from "jszip";

/**
 * Generates a random number with the specified number of digits.
 * @param digitCount The number of digits in the generated random number.
 * @returns The generated random number.
 * @throws Error if digitCount is less than 1.
 */
export function generateRandomNumber(digitCount: number): number {
  if (digitCount < 1) {
    throw new Error("Digit count must be at least 1");
  }

  const min = Math.pow(10, digitCount - 1);
  const max = Math.pow(10, digitCount) - 1;

  return Math.floor(min + Math.random() * (max - min + 1));
}

/**
 * Formats a given date into a string representation.
 * @param date - The date to be formatted.
 * @returns The formatted date string.
 */
export const formatDate = (date: Date): string => {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffMinutes = diffMs / (60 * 1000);
  const diffHours = diffMinutes / 60;
  const diffDays = diffHours / 24;

  if (diffMs < 0) {
    const absDiffDays = Math.abs(diffDays);

    if (absDiffDays < 2) return "bir gün önce";
    if (absDiffDays < 3) return "iki gün önce";

    return date.toDateString();
  } else {
    if (diffMinutes <= 5) return "5 dakika içinde";
    if (diffMinutes <= 10) return "10 dakika içinde";
    if (diffMinutes <= 30) return "30 dakika içinde";
    if (diffHours <= 1) return "1 saat içinde";
    if (diffDays <= 1) return "1 gün içinde";

    return date.toDateString();
  }
};

/**
 * Handles the downloading of files.
 *
 * @param files An array of files to download.
 */
export const downloadFiles = (files: FileTypes[]): void => {
  if (files.length === 1) {
    downloadSingleFile(files[0]);
  } else {
    downloadMultipleFilesAsZip(files);
  }
};

/**
 * Downloads a single file.
 *
 * @param file The file to download.
 */
export const downloadSingleFile = (file: FileTypes): void => {
  const url = URL.createObjectURL(new Blob([file.value]));
  triggerDownload(url, file.filename);
};

/**
 * Downloads multiple files as a ZIP.
 *
 * @param files An array of files to download.
 */
export const downloadMultipleFilesAsZip = (files: FileTypes[]): void => {
  const zipName = `${new Date().toDateString()}_codenest_project.zip`;

  const zip = new JSZip();
  files.forEach((file) => {
    zip.file(file.filename, file.value);
  });
  zip.generateAsync({ type: "blob" }).then((content) => {
    const url = URL.createObjectURL(content);
    triggerDownload(url, "content.zip");
  });
};

/**
 * Triggers the download of a file.
 *
 * @param url The URL of the file to download.
 * @param filename The name of the file to use for the download.
 */
export const triggerDownload = (url: string, filename: string): void => {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a); // Append to body to ensure visibility in all browsers
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a); // Clean up
};

/**
 * Truncates a string if it exceeds a certain length.
 * If the input string is longer than 100 characters, it will be truncated and "..." will be appended.
 * If the input string is shorter than or equal to 100 characters, it will be returned as is.
 *
 * @param input - The string to truncate.
 * @returns The truncated string.
 */
export function truncateString(input: string): string {
  if (input.length > 100) {
    return input.substring(0, 100) + "...";
  } else {
    return input;
  }
}
