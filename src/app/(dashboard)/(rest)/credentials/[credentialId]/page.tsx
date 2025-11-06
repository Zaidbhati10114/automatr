import { requireAuth } from "@/lib/auth-utils";
import React from "react";

interface Props {
  params: Promise<{ credentialId: string }>;
}

const Page = async ({ params }: Props) => {
  await requireAuth();
  const { credentialId } = await params;
  return (
    <div>
      <h1>Credential id :{credentialId} </h1>
    </div>
  );
};

export default Page;
