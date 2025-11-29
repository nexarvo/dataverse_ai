"use client";

import { motion } from "framer-motion";
import { Hero2 } from "@/components/ui/hero-2-1";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import { DataTools } from "@/components/ui/DataTools";
import { HowItWorks } from "@/components/ui/HowItWorks";
import { Footer7 } from "@/components/ui/Footer7";
import { PulseBeamsFirstDemo } from "@/components/ui/pulse-beams-demo";
import { Zap, TrendingUp, Shield, Brain, Target, Sparkles } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get answers in seconds, not hours or days",
  },
  {
    icon: Brain,
    title: "AI-Powered",
    description: "Advanced AI understands your business context",
  },
  {
    icon: Shield,
    title: "Enterprise Secure",
    description: "Bank-level security for your sensitive data",
  },
  {
    icon: TrendingUp,
    title: "Real-time Insights",
    description: "Always up-to-date with live data connections",
  },
  {
    icon: Target,
    title: "Actionable Results",
    description: "Get specific recommendations, not just data",
  },
  {
    icon: Sparkles,
    title: "Beautiful Visualizations",
    description: "Stunning charts and graphs that tell your story",
  },
];

export function LandingPage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://dataverse-ai-smoky.vercel.app";
  const siteDescription =
    "Transform your raw data into instant insights. Upload CSV files and ask questions in plain English to get instant answers, tables, and charts. No login required. Perfect for startup founders and RevOps professionals.";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        name: "Dataverse.ai",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`,
        },
        description: siteDescription,
        sameAs: [
          // Add social media links when available
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${siteUrl}#webapp`,
        name: "Dataverse.ai",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description: siteDescription,
        url: siteUrl,
        featureList: [
          "Natural language data queries",
          "CSV file upload and analysis",
          "Instant insights and visualizations",
          "No login required",
          "Real-time data analysis",
          "AI-powered analytics",
        ],
        browserRequirements: "Requires JavaScript. Requires HTML5.",
      },
      {
        "@type": "SoftwareApplication",
        name: "Dataverse.ai",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: siteDescription,
        url: siteUrl,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}#webpage`,
        url: siteUrl,
        name: "Dataverse.ai - AI-Powered Data Analysis Platform",
        description: siteDescription,
        isPartOf: {
          "@id": `${siteUrl}#website`,
        },
        about: {
          "@id": `${siteUrl}#organization`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteUrl}/og-image.png`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        url: siteUrl,
        name: "Dataverse.ai",
        description: siteDescription,
        publisher: {
          "@id": `${siteUrl}#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen">
        <main>
          {/* Hero Section */}
          <Hero2 />

          {/* How It Works Section */}
          <HowItWorks />

          {/* Features Section */}
          <section
            id="features"
            className="py-16 px-4 sm:px-6 lg:px-8 bg-black"
            aria-labelledby="features-heading"
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2
                  id="features-heading"
                  className="text-3xl md:text-4xl font-bold text-white mb-4"
                >
                  Why Choose DataVerse?
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Powerful features that make data analysis effortless and
                  insightful
                </p>
              </motion.div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <FeatureCard
                      feature={feature}
                      className="bg-gray-900/30 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 hover:bg-gray-900/50 rounded-2xl p-8 min-h-[200px] backdrop-blur-sm"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Data Tools Section */}
          <DataTools />

          {/* CTA Section */}
          <section id="cta" className="relative" aria-label="Call to action">
            <PulseBeamsFirstDemo />
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900" role="contentinfo">
          <Footer7
            logo={{
              url: "#",
              src: "https://www.shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
              alt: "DataVerse",
              title: "DataVerse",
            }}
            description="Empowering business leaders to make data-driven decisions without the complexity. Transform your data into actionable insights with AI-powered analytics."
            sections={[
              {
                title: "Product",
                links: [
                  { name: "Overview", href: "#" },
                  { name: "Features", href: "#features" },
                  { name: "How It Works", href: "#how-it-works" },
                  { name: "Pricing", href: "#" },
                ],
              },
              {
                title: "Company",
                links: [
                  { name: "About", href: "#about" },
                  { name: "Team", href: "#" },
                  { name: "Blog", href: "#" },
                  { name: "Careers", href: "#" },
                ],
              },
              {
                title: "Resources",
                links: [
                  { name: "Help Center", href: "#" },
                  { name: "Documentation", href: "#" },
                  { name: "API Reference", href: "#" },
                  { name: "Privacy Policy", href: "#" },
                ],
              },
            ]}
            copyright="© 2024 DataVerse. All rights reserved."
            legalLinks={[
              { name: "Terms and Conditions", href: "#" },
              { name: "Privacy Policy", href: "#" },
            ]}
          />
        </footer>
      </div>
    </>
  );
}
