"use client";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
import CustomAudioPlayer from "../components/audioplayer.jsx"

export default function Home() {
  const [comments, setComments] = useState<any[]>([]); // 型を定義
  const [replyChecked, setReplyChecked] = useState(false);
  //コメントを取得する関数(返信コメントも取得)
  async function get_comments() {
    const supabase = await createClient(supabaseUrl, supabaseKey);
    const { data: comments } = await supabase.from("comments").select(`
      *,
      reply_comments (
      *
      )
    `);
    console.log(comments);

    return <pre>{JSON.stringify(comments, null, 2)}</pre>;
  }
  //コメントを登録する関数
  //引数に登録したいコメントを指定(string)
  //成功時はtrue,それ以外はfalseが返る
  async function post_comment(comment: string) {
    const supabase = await createClient(supabaseUrl, supabaseKey);
    try {
      const { data: comments } = await supabase
        .from("comments")
        .insert([{ comment: comment }])
        .select();
    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  }
  const flag: boolean = true;
  return (
    <>
      <header className="flex py-1 px-2 gap-2 my-2">
        <div> ＜ </div>
        <div>
          <p className="font-bold">Mrs.Green Apple: インフェルノ</p>
        </div>
      </header>
      <section title="sec-music" className="flex justify-center mb-4">
        <CustomAudioPlayer />
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
              {!replyChecked && (
                <div className="flex justify-end">
                  <button
                    onClick={() => setReplyChecked(!replyChecked)}
                    className="text-xs text-blue-400"
                  >
                    ▼ 返信あり
                  </button>
                </div>
              )}
            </div>
            <p className=" text-xs">12:00</p>
          </section>
          {replyChecked && (
            <section title="reply" className="flex flex-col gap-2 ml-4">
              <div className="flex gap-2">
                <div className="p-2 bg-blue-100 rounded-md text-white w-8 h-8 items-center text-sm">
                  ゆ
                </div>
                <div className="py-1 px-3 border-2 border-sleate-200 rounded-md">
                  <p className="text-sm">それな！分かる！</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setReplyChecked(!replyChecked)}
                  className="text-xs text-blue-400 mr-8"
                >
                  返信を隠す
                </button>
              </div>
            </section>
          )}
          <section title="state" className="flex gap-2">
            <div className="p-2 bg-blue-200 rounded-md text-white w-10 h-10">
              ゆ
            </div>
            <div className="py-1 px-3 border-2 border-blue-300 rounded-md">
              <p>分かる！それな！会場揺れた！</p>
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
