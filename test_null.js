require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function test() {
  console.log("Testing insert with project_type = null...");
  const { data, error } = await supabase.from('inquiries').insert([
    {
      name: "Test Null Project",
      email: "test@test.com",
      project_type: null,
      message: "Test"
    }
  ]);
  
  console.log("Data:", data);
  console.log("Error:", error);
}

test();
