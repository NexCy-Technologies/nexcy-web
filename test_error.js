require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function test() {
  console.log("Testing insert with bad UUID...");
  const { data, error } = await supabase.from('inquiries').insert([
    {
      id: "invalid-uuid", // This should throw an error in Postgres
      name: "Test",
      email: "test@test.com",
      message: "Test"
    }
  ]);
  
  console.log("Data:", data);
  console.log("Error:", error);
}

test();
