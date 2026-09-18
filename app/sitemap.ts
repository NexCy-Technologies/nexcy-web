import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.nexcy.lk";

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: services } = await supabase.from("services").select("id, updated_at, created_at");
  const { data: workItems } = await supabase
    .from("case_studies")
    .select("slug, updated_at, created_at")
    .eq("published", true);

  const servicesUrls = (services || []).map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: service.updated_at || service.created_at || new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const workUrls = (workItems || []).map((work) => ({
    url: `${baseUrl}/work/${work.slug}`,
    lastModified: work.updated_at || work.created_at || new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...servicesUrls,
    ...workUrls,
  ];
}
