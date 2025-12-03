"use client";
import { ErrorView, LoadingView } from "@/components/entity-components";
import { useSuspenseSingleWorkflow } from "@/features/workflows/hooks/use-workflow";

export const EditorLoading = () => {
  return <LoadingView message="Loading Editor" />;
};

export const EditorError = () => {
  return <ErrorView message="Error Loading editor" />;
};

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseSingleWorkflow(workflowId);
  return <p>{JSON.stringify(workflow, null, 2)}</p>;
};
