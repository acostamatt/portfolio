import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Providers from "@/components/Providers";
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
  metadataBase: new URL("https://acostamatt.dev"),
  title: {
    default: "Matias Acosta | Full Stack Developer & Consultor ERP / IoT",
    template: "%s | Matias Acosta",
  },
  description:
    "Desarrollo Full Stack, ecosistemas ERP (Odoo 18/19 & AFIP/ARCA) y telemetría IIoT. Tech Lead Full Stack & Consultor ERP / IoT en Cooperativa Tera, Rosario, Argentina.",
  keywords: [
    "Full Stack",
    "ERP",
    "Odoo",
    "AFIP",
    "ARCA",
    "IIoT",
    "Telemetría",
    "Laravel",
    "Next.js",
    "Cooperativa Tera",
    "Rosario",
  ],
  authors: [{ name: "Matias Acosta", url: "https://www.linkedin.com/in/acostamati" }],
  creator: "Matias Acosta",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://acostamatt.dev",
    siteName: "Matias Acosta — Portfolio",
    title: "Matias Acosta | Full Stack Developer & Consultor ERP / IoT",
    description:
      "Desarrollo Full Stack, ecosistemas ERP (Odoo 18/19 & AFIP/ARCA) y telemetría IIoT en tiempo real.",
  },
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