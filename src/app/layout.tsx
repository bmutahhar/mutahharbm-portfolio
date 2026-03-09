import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PROFILE_CONTENT } from "../data/portfolio-content";
import { ThemeProvider } from "../components/theme-provider";
import { siteUrl } from "./site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${PROFILE_CONTENT.name} | Frontend Engineer & React Flow Expert`,
  description:
    "Mutahhar Bin Muzaffar is a Frontend Engineer and Frontend Developer specializing in React, Next.js, and complex React Flow systems.",
  keywords: [
    "Mutahhar Bin Muzaffar",
    "Frontend Engineer",
    "Frontend Developer",
    "React Flow",
    "React Flow Expert",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
  ],
  alternates: {
    canonical: "/",
  },
  authors: [{ name: PROFILE_CONTENT.name }],
  creator: PROFILE_CONTENT.name,
  publisher: PROFILE_CONTENT.name,
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `${PROFILE_CONTENT.name} | Frontend Engineer & React Flow Expert`,
    description:
      "Frontend Engineer and Frontend Developer portfolio focused on React, Next.js, and React Flow architecture.",
    url: siteUrl,
    siteName: `${PROFILE_CONTENT.name} Portfolio`,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${PROFILE_CONTENT.name} - Frontend Engineer & React Flow Expert`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFILE_CONTENT.name} | Frontend Engineer & React Flow Expert`,
    description:
      "Frontend Engineer and Frontend Developer portfolio with deep React Flow expertise.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="portfolio-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
