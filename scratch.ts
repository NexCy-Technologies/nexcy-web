import { createClient } from "@/utils/supabase/server";

export async function fetchPageData() {
  const supabase = await createClient();

  // Fetch site_content
  const { data: contentData } = await supabase
    .from('site_content')
    .select('section, key, value');

  // Fetch services
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true });

  const content = contentData?.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = {};
    acc[item.section][item.key] = item.value;
    return acc;
  }, {} as Record<string, Record<string, any>>);

  return { content, services };
}
