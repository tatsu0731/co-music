"use client"

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = await createClient(supabaseUrl, supabaseKey);

async function fetchCommentsFromSupabase() {
  const { data, error } = await supabase.from("comments").select("*");
  if (error) {
    console.error(error);
    throw new Error("データの取得に失敗しました");
  }
  console.log(data)
  return data;
}

export default function Home() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function loadComments() {
        const fetchComments = await fetchCommentsFromSupabase();
        setComments(fetchComments);
    }
    loadComments();
    console.log(comments)
  }, []);

  return (
    <>
      <header className="flex py-1 px-2 gap-2 my-2">
        <div> ＜ </div>
        <div>
          <p className="font-bold">Mrs.Green Apple: インフェルノ</p>
        </div>
      </header>
      <section title="sec-music" className="flex justify-center mb-4">
        <div className="w-80 bg-slate-300 h-52 rounded-md text-white">再生</div>
      </section>
      <div className="grid items-center justify-items-center gap-16 mx-2">
        <section className="flex flex-col gap-y-4">
          <section className="flex gap-2">
            <div className="p-2 bg-blue-200 rounded-md text-white w-10 h-10">
              ゆ
            </div>
            <div className="py-1 px-3 border-2 border-blue-300 rounded-md">
              <p>
                ここのライブアレンジめっちゃぶち上がった！！
                <span className=" text-blue-500">02:35</span>
              </p>
            </div>
            <p className=" text-xs">12:00</p>
          </section>
          <section title="state" className="flex gap-2">
            <div className="p-2 bg-blue-200 rounded-md text-white w-10 h-10">
              ゆ
            </div>
            <div className="py-1 px-3 border-2 border-blue-300 rounded-md">
              <p>{comments}</p>
            </div>
            <p className=" text-xs">12:00</p>
          </section>
        </section>
        <section className="bottom-0 fixed w-full mx-4">
          <textarea
            name=""
            id=""
            className="rounded-md py-2 px-2 w-full bg-slate-50"
            placeholder="感想を入力しましょう！"
          ></textarea>
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-blue-200 rounded-md text-white">
              {" "}
              +{" "}
            </button>
          </div>
        </section>
      </div>
      <footer></footer>
    </>
  );
}
