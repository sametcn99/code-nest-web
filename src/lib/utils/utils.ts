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
 * Formats a date into a human-readable string indicating how long ago it was.
 * @param date The date to format.
 * @returns A string representing the formatted date.
 */
export const formatDate = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = diffMs / (24 * 60 * 60 * 1000);

  if (diffDays < 1) {
    const diffHours = diffMs / (60 * 60 * 1000);
    if (diffHours < 1) {
      const diffMinutes = diffMs / (60 * 1000);
      return `${Math.floor(diffMinutes)} dakika önce`;
    }
    return `${Math.floor(diffHours)} saat önce`;
  }
  return date.toUTCString();
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
