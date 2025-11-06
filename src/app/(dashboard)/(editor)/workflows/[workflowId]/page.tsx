import { requireAuth } from "@/lib/auth-utils";
import React from "react";

interface Props {
  params: Promise<{ workflowId: string }>;
}

const Page = async ({ params }: Props) => {
  await requireAuth();
  const { workflowId } = await params;
  return (
    <div>
      <h1>workflow id :{workflowId} </h1>
    </div>
  );
};

export default Page;
