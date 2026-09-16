import type { Metadata } from "next";
import "./globals.css";
import "../index.css";
import "../App.css";

export const metadata: Metadata = {
  title: "The Two Planner | Premium Wedding & Event Planning",
  description: "At The Two Planner, we believe every great wedding begins with two souls in love and two planners who truly care.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mrs+Saint+Delafield&family=Mulish:ital,wght@0,300..900;1,300..900&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&subset=vietnamese,latin-ext&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
