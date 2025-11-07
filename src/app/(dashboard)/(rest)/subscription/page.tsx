"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const Page = () => {
  const trpc = useTRPC();
  const testAi = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: () => {
        toast.success("success");
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    })
  );

  return (
    <div className="px-4 mt-10">
      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
        Click to test
      </Button>
    </div>
  );
};

export default Page;
