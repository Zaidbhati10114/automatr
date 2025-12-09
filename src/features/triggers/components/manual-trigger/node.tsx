import { BaseExecutionNode } from "@/features/executions/components/base-execution-node";
import { NodeProps } from "@xyflow/react";
import { MousePointerIcon } from "lucide-react";
import { memo } from "react";

export const ManualTriggerNode = memo((props: NodeProps) => {
  return (
    <>
      <BaseExecutionNode
        {...props}
        icon={MousePointerIcon}
        name="When clicking 'Execute workflow'"
        //status={nodeStatus} TODO: Add status
        //OnSettings={() => {}}
        //onDoubleClick={() => {}}
      />
    </>
  );
});
