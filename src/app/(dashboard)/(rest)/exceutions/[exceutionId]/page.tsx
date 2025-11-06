import { requireAuth } from "@/lib/auth-utils";
import React from "react";

interface Props {
  params: Promise<{ excuetionId: string }>;
}

const Page = async ({ params }: Props) => {
  await requireAuth();
  const { excuetionId } = await params;
  return (
    <div>
      <h1>Credential id :{excuetionId} </h1>
    </div>
  );
};

export default Page;
