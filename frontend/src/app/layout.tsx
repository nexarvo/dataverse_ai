import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dataverse-ai-smoky.vercel.app";
const siteName = "Dataverse.ai";
const siteDescription =
  "Transform your raw data into instant insights. Upload CSV files and ask questions in plain English to get instant answers, tables, and charts. No login required. Perfect for startup founders and RevOps professionals.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dataverse.ai - AI-Powered Data Analysis Platform",
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "instant data analysis",
    "CSV analysis",
    "AI data analytics",
    "ask questions about CSV",
    "analyze CSV without code",
    "AI tool for data analysis",
    "AI-powered analytics",
    "ask data questions in plain English",
    "CSV to charts tool",
    "CSV dashboard generator",
    "automated CSV reporting",
    "upload CSV and get insights",
    "no login data analysis",
    "RevOps analytics",
    "startup analytics tool",
    "self serve analytics platform",
    "data analysis for non technical users",
    "AI business intelligence tool",
    "DuckDB data analysis",
    "Postgres analytics tool",
    "RAG analytics",
    "LLM analytics tool",
    "query CSV with natural language",
    "no-code analytics",
    "data insights dashboard",
    "business intelligence",
    "data visualization",
    "CSV to insights",
  ],
  authors: [{ name: "Dataverse.ai Team" }],
  creator: "Dataverse.ai",
  publisher: "Dataverse.ai",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: "Dataverse.ai - AI-Powered Data Analysis Platform",
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Dataverse.ai - Transform your data into instant insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dataverse.ai - AI-Powered Data Analysis Platform",
    description: siteDescription,
    images: [`${siteUrl}/og-image.png`],
    creator: "@dataverseai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
      "en-GB": siteUrl,
    },
  },
  category: "technology",
  classification: "Business Intelligence, Data Analytics",
  other: {
    "application-name": siteName,
    "apple-mobile-web-app-title": siteName,
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "mobile-web-app-capable": "yes",
    "theme-color": "#000000",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href={`${siteUrl}/og-image.png`} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
