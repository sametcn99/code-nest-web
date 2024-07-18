import { MetadataRoute } from "next";

/**
 * Returns the manifest object for the CodeNest application.
 * @returns The manifest object containing metadata for the application.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CodeNest",
    short_name: "CodeNest",
    dir: "auto",
    description: "En sevdiğiniz projeleri paylaşın, kaydedin ve keşfedin.",
    categories: ["personal"],
    theme_color: "#000000",
    background_color: "#000000",
    display: "standalone",
    scope: "/",
    lang: "en_US",
    start_url: "/",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/favicon-300x300.png",
        sizes: "300x300",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/favicon-300x300.png",
        sizes: "300x300",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
