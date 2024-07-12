import React from "react";
import { Tables } from "../../../types/supabase";
import { Card } from "@nextui-org/react";

export default function ContentCard({ content }: { content: Tables<"files"> }) {
  return (
    <Card className="min-h-40 w-fit p-4">
      <h2 className="text-2xl font-bold">{content.title}</h2>
      <p className="text-muted">{content.description}</p>
      <p>{new Date(content.created_at).toISOString()}</p>
    </Card>
  );
}
