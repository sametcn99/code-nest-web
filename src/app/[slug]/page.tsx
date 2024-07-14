import NotFound from "@/app/not-found";
import { permanentRedirect } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  if (
    params.slug === "community" ||
    params.slug === "discord" ||
    params.slug === "support" ||
    params.slug === "destek"
  ) {
    permanentRedirect("https://discord.gg/PtP372mA");
  } else {
    return <NotFound />;
  }
  return <></>;
}
