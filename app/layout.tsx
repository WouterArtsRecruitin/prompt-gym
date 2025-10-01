import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Prompt Gym | AI Training voor Recruiters",
  description: "Interactive training game - leer prompt engineering in 6 levels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
