import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SwapLive — Deviens qui tu veux, en direct.",
  description: "Transformation faciale en temps réel propulsée par IA. Live Swap, Photo en Vidéo, 500+ avatars.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
