import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: 'SwapLive — Deviens qui tu veux, en direct.',
    template: '%s | SwapLive',
  },
  description: 'Transformation faciale en temps réel propulsée par IA. Live Swap, Photo en Vidéo, 500+ avatars. Compatible OBS, Twitch, TikTok, Zoom.',
  keywords: ['face swap', 'live swap', 'deepfake', 'transformation faciale', 'streaming', 'OBS', 'TikTok', 'twitch'],
  openGraph: {
    title: 'SwapLive — Deviens qui tu veux, en direct.',
    description: 'Transformation faciale en temps réel propulsée par IA.',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SwapLive',
    description: 'Transformation faciale en temps réel propulsée par IA.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
