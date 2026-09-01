import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Providers from "@/components/Providers";
import {
  SITE_DESCRIPTION,
  SITE_DESCRIPTION_SHORT,
  SITE_LOCALE,
  SITE_LOCALE_ALTERNATE,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/data/site";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Matias Acosta",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Matias Acosta",
    "Full Stack Developer",
    "Consultor ERP",
    "ERP",
    "Odoo",
    "Odoo 18",
    "Odoo 19",
    "AFIP",
    "ARCA",
    "WSFE",
    "Facturación electrónica",
    "IIoT",
    "IoT industrial",
    "Telemetría",
    "MQTT",
    "PLC",
    "Laravel",
    "PHP",
    "Python",
    "Django",
    "Next.js",
    "TypeScript",
    "Docker",
    "Cooperativa Tera",
    "Rosario",
    "Santa Fe",
    "Argentina",
  ],
  authors: [{ name: "Matias Acosta", url: "https://www.linkedin.com/in/acostamati" }],
  creator: "Matias Acosta",
  publisher: "Cooperativa Tera",
  category: "technology",
  // Single URL serves both languages (client-side i18n toggle), so there are no
  // per-locale routes to declare as hreflang alternates.
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    alternateLocale: SITE_LOCALE_ALTERNATE,
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION_SHORT,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION_SHORT,
  },
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
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e17" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}