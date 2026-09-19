CREATE TABLE IF NOT EXISTS domains (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  domain_name text NOT NULL UNIQUE,
  registrar text,
  expiry_date date NOT NULL,
  renewal_url text,
  auto_renew boolean DEFAULT false,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE domains ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated full access domains"
ON domains
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
