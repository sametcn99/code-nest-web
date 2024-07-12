import { Card } from "@nextui-org/react";
import Link from "next/link";
import { Tables } from "../../../types/supabase";

export default function ContentCard({ content }: { content: Tables<"files"> }) {
  return (
    <Link href={`/code/${content.id}`}>
      <Card className="min-h-40 w-full p-4 transition-all duration-700 hover:scale-102">
        <h2 className="text-2xl font-bold">{content.title}</h2>
        <p className="text-muted">{content.description}</p>
        <p>{new Date(content.created_at).toISOString()}</p>
      </Card>
    </Link>
  );
}
