const ACCEPTABLE_IMAGE_CONTENT_TYPES = [
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/apng",
];
const ACCEPTABLE_IMAGE_EXTENSIONS = [".gif", ".jpeg", ".jpg", ".png"];
const ACCEPTABLE_IMAGE_SOURCES: URL[] = [
  new URL("https://cdn.discordapp.com"),
  new URL("https://nextui.org"),
  new URL("https://i.giphy.com"),
  new URL("https://unsplash.com"),
  new URL("https://imgur.com"),
  new URL("https://i.imgur.com"),
  new URL("https://tenor.com"),
  new URL("https://media1.tenor.com"),
  new URL("https://c.tenor.com"),
  new URL("https://media.giphy.com"),
  new URL("https://flickr.com"),
  new URL("https://photobucket.com"),
  new URL("https://pixabay.com"),
  new URL("https://staticflickr.com"),
  new URL("https://media.tenor.com"),
  new URL("https://pinimg.com"),
  new URL("https://images.unsplash.com"),
  new URL("https://s1.imgyukle.com"),
  new URL("https://hizliresim.com"),
  new URL("https://upload.wikimedia.org"),
];

/**
 * Validates whether a given URL points to a valid image.
 * @param url - The URL to validate.
 * @returns A promise that resolves to true if the URL points to a valid image, otherwise false.
 */
export async function isValidBannerUrl(url: string = ""): Promise<boolean> {
  try {
    validateUrlFormat(url);

    const urlObj = new URL(url);
    validateImageSource(urlObj);

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
 * Validates the image source URL.
 * @param urlObj - The URL object representing the image source.
 * @throws {Error} If the image source is invalid.
 */
function validateImageSource(urlObj: URL): void {
  if (!ACCEPTABLE_IMAGE_SOURCES.some((source) => urlObj.host === source.host)) {
    throw new Error(
      `Invalid source\nAccepted sources: ${ACCEPTABLE_IMAGE_SOURCES.map((source) => source.origin).join(", ")}`,
    );
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
