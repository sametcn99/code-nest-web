import { createClient } from "@/lib/utils/supabase/server";
import { InfiniteMovingCards } from "./InfiniteMovingCards";
import { Tables } from "../../../types/supabase";

export default async function RandomContents() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("files")
    .select("*")
    .limit(10); // Removed the order by random()

  if (error) {
    console.log(error);
    return;
  }

  // Assuming you have a utility function to shuffle the array items
  const shuffledData = shuffleArray(data as Tables<"files">[]);

  return <InfiniteMovingCards items={shuffledData} speed={10} title="Şunlara da göz atabilirsiniz." />;
}

// Example shuffle function (implement or import your own)
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}