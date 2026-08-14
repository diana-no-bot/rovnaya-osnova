import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rovnaya-osnova.pages.dev"),
  title: "Ровная Основа — механизированная штукатурка и стяжка пола",
  description: "Механизированная штукатурка и стяжка пола для частных домов и коттеджей.",
  openGraph: {
    title: "Ровная Основа — штукатурка и стяжка",
    description: "Механизированная штукатурка и стяжка пола. Связь с Евгением.",
    images: [{ url: "/og.png" }],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
