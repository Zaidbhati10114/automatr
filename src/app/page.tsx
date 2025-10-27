"use client";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";

const Page = async () => {
  const user = await prisma.user.findMany();
  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      <h1 className="text-red-500">{JSON.stringify(user)}</h1>
    </div>
  );
};

export default Page;
