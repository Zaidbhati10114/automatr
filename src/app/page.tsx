"use client";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";

const Page = () => {
  const utils = trpc.useUtils();
  const { data } = trpc.getWorkflows.useQuery();
  const testAi = trpc.testAi.useMutation();
  const create = trpc.createWorkflow.useMutation({
    onSuccess: () => {
      utils.getWorkflows.invalidate();
    },
  });

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
        Test Ai
      </Button>
      protected page
      {JSON.stringify(data, null, 2)}
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create Workflow
      </Button>
    </div>
  );
};

export default Page;
