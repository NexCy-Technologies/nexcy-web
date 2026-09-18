import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { FaExternalLinkAlt, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

function getMicrolicPreviewUrl(url: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&embed=screenshot.url&meta=false`;
}

export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: projects } = await supabase.from("case_studies").select("slug");
  return (projects || []).map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: project } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", resolvedParams.slug)
    .single();

  if (!project) return { title: "Not Found" };

  return {
    title: `${project.title} | NexCy Technologies`,
    description: project.description,
    openGraph: {
      images: [`/work/${resolvedParams.slug}/og`],
    },
    twitter: {
      images: [`/work/${resolvedParams.slug}/og`],
    },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: project } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", resolvedParams.slug)
    .single();

  if (!project || !project.published) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto mt-8">
          <Link href="/#services" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8">
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div>
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                  {project.category}
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  {project.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {project.url && (
                <Link href={project.url} target="_blank" rel="noopener noreferrer" className="inline-block">
                  <Button size="lg" className="rounded-full gap-2">
                    Visit Live Site <FaExternalLinkAlt className="text-sm" />
                  </Button>
                </Link>
              )}

              {project.features && project.features.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 border-b pb-2">Key Features</h3>
                  <ul className="space-y-3">
                    {project.features.map((feat: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <FaCheckCircle className="text-primary mt-1 flex-shrink-0" />
                        <span className="text-foreground/90">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.technologies && project.technologies.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 border-b pb-2">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-muted rounded-md text-sm font-medium border">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:sticky lg:top-24 rounded-2xl overflow-hidden shadow-2xl border bg-card relative aspect-video w-full group">
              {project.url ? (
                <Image
                  src={getMicrolicPreviewUrl(project.url)}
                  alt={`${project.title} preview`}
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                  No preview available
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
