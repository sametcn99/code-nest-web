const ACCEPTABLE_IMAGE_CONTENT_TYPES = [
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/apng",
];

/**
 * Validates whether a given URL points to a valid image.
 * @param url - The URL to validate.
 * @returns A promise that resolves to true if the URL points to a valid image, otherwise false.
 */
export async function isValidBannerUrl(url: string = ""): Promise<boolean> {
  try {
    validateUrlFormat(url);
    const response = await fetch(url, { method: "HEAD" });
    validateResponse(response);

    return true;
  } catch (error) {
    alert(error);
    console.error("Error:", error);
    return false;
  }
}

/**
 * Validates the format of a URL.
 *
 * @param url - The URL to be validated.
 * @throws Error if the URL is empty.
 */
function validateUrlFormat(url: string): void {
  if (!url) {
    throw new Error("URL cannot be empty");
  }
}

/**
 * Validates the response received from an HTTP request for an image resource.
 * Throws an error if the response is not OK or if the content type is not acceptable.
 *
 * @param response - The response object received from the HTTP request.
 * @throws Error - If the response is not OK or if the content type is not acceptable.
 */
function validateResponse(response: Response): void {
  if (!response.ok) throw new Error("Invalid resource");

  const contentType = response.headers.get("Content-Type");
  if (!contentType || !ACCEPTABLE_IMAGE_CONTENT_TYPES.includes(contentType))
    throw new Error("Invalid file type");
}
