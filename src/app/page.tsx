import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export default function Home() {
  async function Comments() {
    const supabase = await createClient(supabaseUrl, supabaseKey);
    const { data: comments } = await supabase.from("comments").select();
    return <pre>{JSON.stringify(comments, null, 2)}</pre>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"></div>
  );
}
