import Navbar from "@/components/Navbar";
import { BackgroundCellCore } from "@/components/ui/BackgroundRippleEffect";
import { NextUIProvider } from "@nextui-org/system";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/Footer";
import { FloatingNavbar } from "@/components/ui/FloatingNavbar";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  title: {
    template: "%s | CodeNest",
    default: "CodeNest",
  },
  description: "Projeleri Keşfet, Paylaş ve İş Birliği Yap.",
  applicationName: "CodeNest",
  keywords:
    "code nest, share code, collaborate, projects, code, coding, programming, development, developer, web development, web developer, full stack, front end, back end, software, software engineer, software developer, software development, open source, github, git, gitlab, bitbucket, repository, repositories, version control, version control system, vcs, versioning, versioning system, versioning control system, versioning control",
  creator: "sametcn99",
  publisher: "sametcn99",
  robots: "index, follow",
  openGraph: {
    title: {
      template: "%s | GPV",
      default: "CodeNest",
    },
    description: "Projeleri Keşfet, Paylaş ve İş Birliği Yap.",
    type: "website",
    url: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
    images: ["/icons/favicon-512x512.png"],
    locale: "tr_TR",
    siteName: "CodeNest",
    emails: "sametcn99@gmail.com",
  },
  icons: {
    icon: "/icons/favicon-512x512.png",
    shortcut: "/icons/favicon-512x512.png",
    apple: "/icons/favicon-512x512.png",
    username: "sametcn99",
  },
  twitter: {
    site: "CodeNest",
    title: "CodeNest",
    description: "Projeleri Keşfet, Paylaş ve İş Birliği Yap.",
    card: "summary_large_image",
    images: ["/icons/favicon-512x512.png"],
    creator: "sametcn99",
    creatorId: "@sametcn99",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} dark`}>
        <NextUIProvider>
          <BackgroundCellCore />
          <section className="flex h-screen flex-col place-items-center gap-20">
            <Navbar />
            {children}
            <Footer />
          </section>
        </NextUIProvider>
      </body>
    </html>
  );
}
