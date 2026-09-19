-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  project_type text CHECK (project_type IN ('WEB DEVELOPMENT', 'MOBILE APP', 'ERP / POS SYSTEM', 'AI / ML SOLUTION', 'IOT DEVELOPMENT', 'OTHER', NULL)),
  message text NOT NULL,
  source_page text DEFAULT 'contact',
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert new inquiries
CREATE POLICY "Allow anon insert inquiries" 
  ON inquiries 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Allow authenticated users to manage all inquiries
CREATE POLICY "Allow authenticated full access inquiries" 
  ON inquiries 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);
