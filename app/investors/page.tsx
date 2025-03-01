"use client";

import { motion } from "framer-motion";
import { FileText, Mail, Calendar, Presentation, Database, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const ease = [0.16, 1, 0.3, 1];

function InvestorIntro() {
  return (
    <div className="flex w-full max-w-2xl flex-col space-y-6 overflow-hidden pt-8">
      <motion.h1
        className="text-left text-4xl font-medium leading-tight text-foreground sm:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease,
        }}
      >
        investors
      </motion.h1>
      <motion.div
        className="prose prose-neutral dark:prose-invert max-w-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease,
        }}
      >
        <p className="text-justify text-muted-foreground text-lg">
          having fundraised for a few startups we find it beneficial to save your time and ours on the intro part, skip all the repetitive convos and jump straight into fruitful meaningful conversation. also, just repeating the same intro and pitch makes us less smart founders in the first place, and you probably only want to invest in founders that learn and grow every second and don&apos;t spend a lot of time fundraising either, haha. that said we shipped this small page with links to our latest resources, deck, presentation, and data room (coming soon).
        </p>
      </motion.div>
    </div>
  );
}

function ResourceLinks() {
  const resources = [
    {
      title: "latest newsletter",
      icon: Mail,
      description: "our most recent updates and progress",
      link: "/blog/screenpipe-i-4-2w2xmrr",
    },
    {
      title: "previous newsletters",
      icon: FileText,
      description: "archive of our journey and milestones",
      link: "/blog/screenpipe-i-3-fundraising",
    },
    {
      title: "deck",
      icon: Presentation,
      description: "current pitch deck and company overview",
      link: "https://docsend.com/v/zpcfw/screenpipe",
    },
    {
      title: "founder pitch",
      icon: Database,
      description: "recorded presentation and product demo",
      link: "https://youtu.be/dMwL_yLNNpw",
    },
    {
      title: "call link",
      icon: Calendar,
      description: "schedule a conversation with our team",
      link: "https://cal.com/mattdi/fundraising",
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8, ease }}
    >
      {resources.map((resource, i) => (
        <Link 
          href={resource.link} 
          key={i} 
          className="block no-underline" 
          target={resource.link.startsWith('/') ? '_self' : '_blank'} 
          rel={resource.link.startsWith('/') ? '' : 'noopener noreferrer'}
        >
          <Card className="h-full border bg-card hover:bg-accent/50 transition-colors duration-200">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <resource.icon className="h-8 w-8 text-primary" />
              <CardTitle className="text-xl">{resource.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{resource.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </motion.div>
  );
}

function ContactCTA() {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    navigator.clipboard.writeText("louis@mediar.ai, matt@mediar.ai")
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto mt-16 text-left"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.8, ease }}
    >
      <p className="text-justify text-muted-foreground mb-4">
        questions? reach out directly:
      </p>
      <div className="w-full relative">
        <Button asChild variant="default" size="lg" className="w-full">
          <Link href="mailto:louis@mediar.ai,matt@mediar.ai" className="w-full">
            louis@mediar.ai, matt@mediar.ai
          </Link>
        </Button>
        <button 
          onClick={copyToClipboard}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
          aria-label="Copy email addresses"
        >
          {copied ? (
            <span className="text-green-500 text-xs font-medium">✓</span>
          ) : (
            <Copy className="h-3.5 w-3.5 text-primary-foreground/70" />
          )}
        </button>
      </div>
    </motion.div>
  );
}

export default function InvestorsPage() {
  return (
    <>
      <section id="investors-page">
        <div className="relative flex w-full flex-col items-center justify-start px-4 pt-32 sm:px-6 sm:pt-24 md:pt-32 lg:px-8">
          <InvestorIntro />
          <ResourceLinks />
          <ContactCTA />
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
