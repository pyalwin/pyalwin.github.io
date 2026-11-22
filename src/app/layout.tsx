import type { Metadata } from "next";
import "./globals.css";

const title = "Arun Venkataramanan | Infrastructure Engineer";
const description =
  "Arun Venkataramanan, software engineer on the infrastructure team at Harvey. Backend platforms, integrations, and developer tools.";

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
      <body id="top">{children}</body>
    </html>
  );
}
