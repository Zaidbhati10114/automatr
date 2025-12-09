import { NodeProps, Position } from "@xyflow/react";
import { type Icon, type LucideIcon } from "lucide-react";
import { memo, ReactNode } from "react";
import { WorkflowNode } from "../../../components/workflow-node";
import {
  BaseNode,
  BaseNodeContent,
} from "../../../components/react-flow/base-node";
import Image from "next/image";
import { BaseHandle } from "../../../components/react-flow/base-handle";

interface BaseExecutionNodeProps extends NodeProps {
  icon: LucideIcon | string;
  name: string;
  description?: string;
  children?: ReactNode;
  //status?:NodeStatus;
  OnSettings?: () => void;
  onDoubleClick?: () => void;
}

export const BaseExecutionNode = memo((props: BaseExecutionNodeProps) => {
  // TODO Add delete functionality
  const handleDelete = () => {};
  return (
    <WorkflowNode
      name={props.name}
      description={props.description}
      onDelete={handleDelete}
      onSettings={props.OnSettings}
    >
      <BaseNode onDoubleClick={props.onDoubleClick}>
        <BaseNodeContent>
          {typeof props.icon === "string" ? (
            <Image src={props.icon} alt={props.name} width={16} height={16} />
          ) : (
            <props.icon className="size-4 text-muted-foreground" />
          )}
          {props.children}
          <BaseHandle id="target-1" type="target" position={Position.Left} />
          <BaseHandle id="source-1" type="source" position={Position.Right} />
        </BaseNodeContent>
      </BaseNode>
    </WorkflowNode>
  );
});

BaseExecutionNode.displayName = "BaseExecutionNode";
