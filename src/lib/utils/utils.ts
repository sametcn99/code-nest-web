import JSZip from "jszip";
import acceptableImageSources from "../image-sources";

export function generateRandomNumber(digitCount: number): number {
  if (digitCount < 1) {
    throw new Error("Digit count must be at least 1");
  }

  const min = Math.pow(10, digitCount - 1);
  const max = Math.pow(10, digitCount) - 1;

  return Math.floor(min + Math.random() * (max - min + 1));
}

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

export async function isValidGifUrl(url = ""): Promise<boolean> {
  try {
    if (url === "") {
      throw new Error("URL Boş Olamaz");
    }
    // URL'nin doğru bir formatta olup olmadığını kontrol edin
    const urlObj = new URL(url);

    // URL'nin bir GIF dosyasına işaret edip etmediğini kontrol edin
    if (!urlObj.pathname.endsWith(".gif")) {
      throw new Error("Geçersiz dosya türü");
    }

    if (
      acceptableImageSources.some((source) => urlObj.origin !== source.origin)
    ) {
      throw new Error(
        "Geçesiz kaynak\nKabul edilen kaynaklar: " +
          acceptableImageSources.map((source) => source.origin).join(", "),
      );
    }

    // HTTP isteği yaparak dosyanın mevcut olup olmadığını ve türünü kontrol edin
    const response = await fetch(url, { method: "HEAD" });

    // Durum kodunu kontrol edin
    if (!response.ok) {
      throw new Error(
        "Geçesiz kaynak\nKabul edilen kaynaklar: " +
          acceptableImageSources.map((source) => source.origin).join(", "),
      );
    }

    // İçerik türünü kontrol edin
    const contentType = response.headers.get("Content-Type");
    if (contentType !== "image/gif") {
      throw new Error("Geçersiz dosya türü");
    }

    return true;
  } catch (error) {
    alert(error);
    console.error("Error:", error);
    return false;
  }
}
