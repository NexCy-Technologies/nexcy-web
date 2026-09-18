-- Create custom types if any (e.g. inquiry status)
CREATE TYPE inquiry_status AS ENUM ('new', 'read', 'archived');

-- 1. Services Table
CREATE TABLE public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    features TEXT[] DEFAULT '{}',
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Case Studies / Work Table
CREATE TABLE public.case_studies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    url TEXT,
    category TEXT,
    technologies TEXT[] DEFAULT '{}',
    features TEXT[] DEFAULT '{}',
    display_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Site Content Table
CREATE TABLE public.site_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section TEXT NOT NULL,
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Inquiries Table
CREATE TABLE public.inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    source_page TEXT,
    status inquiry_status DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Admin Users Table (Links to auth.users)
CREATE TABLE public.admin_users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Helper function to check if current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE id = auth.uid()
  );
$$;

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Services
CREATE POLICY "Services are viewable by everyone" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admins have full access to services" ON public.services TO authenticated USING (public.is_admin());

-- Case Studies
CREATE POLICY "Published case studies are viewable by everyone" ON public.case_studies FOR SELECT USING (published = true);
CREATE POLICY "Admins have full access to case studies" ON public.case_studies TO authenticated USING (public.is_admin());

-- Site Content
CREATE POLICY "Site content is viewable by everyone" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admins have full access to site content" ON public.site_content TO authenticated USING (public.is_admin());

-- Inquiries
CREATE POLICY "Anyone can insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view and manage inquiries" ON public.inquiries TO authenticated USING (public.is_admin());

-- Admin Users
CREATE POLICY "Users can read their own admin status" ON public.admin_users FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "Admins have full access to admin users" ON public.admin_users TO authenticated USING (public.is_admin());


-- Seed Data

-- Services Seed
INSERT INTO public.services (title, description, icon, features, display_order) VALUES
('Web Development', 'Modern, responsive websites and web applications built with cutting-edge technologies.', 'FaGlobe', ARRAY['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Secure'], 1),
('ERP/POS Systems', 'Comprehensive enterprise resource planning and point-of-sale solutions for your business.', 'FaBriefcase', ARRAY['Inventory Management', 'Sales Tracking', 'Reporting', 'Multi-location'], 2),
('Mobile Apps', 'Native Android and iOS applications that deliver exceptional user experiences.', 'FaMobile', ARRAY['Cross-platform', 'Native Performance', 'App Store Ready', 'Push Notifications'], 3),
('Software Development', 'Custom software solutions tailored to your specific business requirements.', 'FaCog', ARRAY['Custom Solutions', 'Scalable Architecture', 'API Integration', 'Cloud Ready'], 4),
('AI/ML Solutions', 'Intelligent systems powered by machine learning and artificial intelligence.', 'FaRobot', ARRAY['Predictive Analytics', 'Automation', 'Data Processing', 'Smart Insights'], 5),
('IoT Development', 'Internet of Things solutions connecting devices and enabling smart automation.', 'FaNetworkWired', ARRAY['Device Integration', 'Real-time Monitoring', 'Data Analytics', 'Remote Control'], 6);


-- Case Studies Seed
INSERT INTO public.case_studies (slug, title, description, url, category, technologies, features, display_order, published) VALUES
('udawalawe-wild', 'Udawalawe Wild', 'Private, wildlife-first safaris with verified local partners, transparent pricing, and simple planning in Udawalawe National Park.', 'https://www.udawalawe-wild.com', 'Tourism & Travel', ARRAY['React', 'Tailwind CSS', 'Vite'], ARRAY['Verified Local Partners', 'Private Jeeps', 'Transparent Pricing', 'Wildlife First'], 1, true),
('udawalawa-safari', 'Udawalawa Safari', 'Private safari experience in Udawalawe National Park with expert guidance, comfortable 4x4 travel, and photography-focused wildlife tours', 'https://www.udawalawasafari.lk', 'Tourism & Travel', ARRAY['Next.js', 'React', 'Tailwind CSS'], ARRAY['Wildlife Expertise', 'Comfortable Vehicles', 'Photography Focus', 'Safety First'], 2, true),
('golden-pearl-safari-villa', 'Golden Pearl Safari Villa', 'Peaceful safari villa in Udawalawe offering family and double rooms, on-site dining, garden spaces, and safari jeep service', 'https://golden-pearl-safari-villa.web.app', 'Hospitality', ARRAY['React', 'Firebase', 'Tailwind CSS', 'PWA'], ARRAY['Family Room', 'Double Room', 'On-Site Restaurant', 'Safari Jeep Service'], 3, true),
('nexcysm', 'NexCySM', 'Powerful stock management system for inventory control, sales tracking, and real-time analytics', 'https://nexcysm.nexcy.lk/', 'Business & Inventory', ARRAY['React', 'Firebase', 'Tailwind CSS', 'PWA'], ARRAY['Real-time Analytics', 'Easy Checkout', 'Inventory Control', 'Secure & Reliable'], 4, true),
('wild-elephas-udawalawa', 'Wild Elephas Udawalawa', 'Nature-focused hospitality and safari experience in Udawalawe with rooms, activities, and guest services', 'https://wild-elephas.web.app', 'Hospitality', ARRAY['React', 'Firebase', 'Tailwind CSS', 'PWA'], ARRAY['Luxury Accommodations', 'Wildlife Activities', 'Food Menu', 'Gallery'], 5, true);

-- Site Content Seed
INSERT INTO public.site_content (section, key, value) VALUES
('about', 'headline', '"Building the digital future, one product at a time."'),
('about', 'intro_text', '"Nexcy Technologies is the home for a group of aspiring young minds that believe in the power of technology to create meaningful change — committed to driving innovation and helping businesses thrive in the digital age."'),
('about', 'manifesto_1', '"Leveraging the latest in Web, Mobile, AI/ML and IoT — we craft tailored solutions that fit your exact needs."'),
('about', 'manifesto_2', '"Continuous support that doesn''t end at launch, paving the way for long-term collaboration."'),
('about', 'manifesto_3', '"Quality, affordability, and timely delivery. Never a compromise — always a standard."'),
('about', 'pillar_1_label', '"Innovation First"'),
('about', 'pillar_1_body', '"We stay ahead of the curve so you don''t have to. Every solution we build gives you a real competitive edge."'),
('about', 'pillar_2_label', '"Client-Centric"'),
('about', 'pillar_2_body', '"Your success is the only metric we measure ourselves by. Exceeding expectations isn''t a goal — it''s the baseline."');
