import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Subsurface",
  description:
    "A participatory framework that enables people to build, deploy, and use low-cost underwater cameras to observe and document aquatic environments.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=1200" />
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://use.typekit.net/wdn6pox.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
