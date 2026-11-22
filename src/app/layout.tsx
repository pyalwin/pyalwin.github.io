import type { Metadata } from "next";
import "./globals.css";

const title = "Arun Venkataramanan | Software Engineer";
const description =
  "Software engineer at Harvey. I build backend platforms, developer tools, and systems that help AI agents find the right context.";

export const metadata: Metadata = {
  metadataBase: new URL("https://pyalwin.github.io"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", title, description, url: "/" },
  twitter: { card: "summary", title, description },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
