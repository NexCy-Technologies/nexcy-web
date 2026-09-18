import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/sections/Footer";
import { FaGlobe, FaBriefcase, FaMobile, FaCog, FaRobot, FaNetworkWired, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { Blocks } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

const IconMap: Record<string, any> = {
  FaGlobe,
  FaBriefcase,
  FaMobile,
  FaCog,
  FaRobot,
  FaNetworkWired,
};

export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: services } = await supabase.from("services").select("id");
  return (services || []).map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (!service) return { title: "Not Found" };

  return {
    title: `${service.title} | NexCy Technologies`,
    description: service.description,
    openGraph: {
      images: [`/services/${resolvedParams.id}/og`],
    },
    twitter: {
      images: [`/services/${resolvedParams.id}/og`],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (!service) {
    notFound();
  }

  const IconComponent = IconMap[service.icon] || Blocks;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mt-8">
          <Link href="/#services" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8">
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          
          <div className="bg-card border shadow-xl rounded-3xl p-8 sm:p-12">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 text-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                <IconComponent className="text-3xl sm:text-4xl" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                {service.title}
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 border-b pb-8">
              {service.description}
            </p>

            {service.features && service.features.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold mb-6">What's Included</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.features.map((feat: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 bg-muted/50 p-4 rounded-xl border">
                      <FaCheckCircle className="text-primary text-xl flex-shrink-0" />
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
