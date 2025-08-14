"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Hero2 } from "@/components/ui/hero-2-1";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import { DataTools } from "@/components/ui/DataTools";
import { HowItWorks } from "@/components/ui/HowItWorks";
import { Footer7 } from "@/components/ui/Footer7";
import { PulseBeamsFirstDemo } from "@/components/ui/pulse-beams-demo";
import {
  Clock,
  Database,
  Users,
  Link,
  MessageSquare,
  BarChart3,
  ArrowRight,
  Calendar,
  Mail,
  Zap,
  TrendingUp,
  Shield,
  Brain,
  Target,
  Sparkles,
} from "lucide-react";

// Mockup images - these would be replaced with actual images
const mockupImages = {
  saas: "/images/mockup_saas.svg",
  ecommerce: "/images/mockup_ecommerce.svg",
  fintech: "/images/mockup_fintech.svg",
  healthcare: "/images/mockup_healthcare.svg",
  logistics: "/images/mockup_logistics.svg",
};

const useCases = [
  {
    image: mockupImages.saas,
    title: "For SaaS",
    description: "Track MRR and churn instantly",
  },
  {
    image: mockupImages.ecommerce,
    title: "For E-commerce",
    description: "Monitor sales and inventory in real-time",
  },
  {
    image: mockupImages.fintech,
    title: "For Fintech",
    description: "Analyze transaction patterns and fraud",
  },
  {
    image: mockupImages.healthcare,
    title: "For Healthcare",
    description: "Track patient outcomes and resource utilization",
  },
  {
    image: mockupImages.logistics,
    title: "For Logistics",
    description: "Optimize routes and delivery performance",
  },
];

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
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero2 />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
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
      <section id="cta" className="relative">
        <PulseBeamsFirstDemo />
      </section>

      {/* Footer */}
      <div className="bg-gray-900">
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
      </div>
    </div>
  );
}
