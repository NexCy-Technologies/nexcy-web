require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSupabase() {
  console.log("Testing INSERT...");
  const { data: insertData, error: insertError } = await supabase.from('inquiries').insert([
    {
      name: "Test User",
      email: "test@example.com",
      phone: "+94700000000",
      project_type: "WEB DEVELOPMENT",
      message: "This is a test message from automated test script.",
      source_page: "contact-test"
    }
  ]);

  if (insertError) {
    console.error("Insert failed:", insertError);
  } else {
    console.log("Insert succeeded!");
    // Supabase insert with anon should work, but wait! Since RLS SELECT is disabled for anon, .select() might return empty or error.
    console.log("Insert returned data:", insertData);
  }

  console.log("\nTesting SELECT (should be blocked or return empty by RLS)...");
  const { data: selectData, error: selectError } = await supabase.from('inquiries').select('*');
  
  if (selectError) {
    console.error("Select error (expected if strict RLS):", selectError);
  } else {
    console.log("Select succeeded. Data:", selectData);
    if (selectData && selectData.length === 0) {
      console.log("SUCCESS: RLS is active and returns empty for anon role.");
    }
  }
}

testSupabase();
