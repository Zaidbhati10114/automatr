import { NodeProps, Position, useReactFlow } from "@xyflow/react";
import { type Icon, type LucideIcon } from "lucide-react";
import { memo, ReactNode } from "react";
import { WorkflowNode } from "../../../components/workflow-node";
import {
  BaseNode,
  BaseNodeContent,
} from "../../../components/react-flow/base-node";
import Image from "next/image";
import { BaseHandle } from "../../../components/react-flow/base-handle";
import {
  type NodeStatus,
  NodeStatusIndicator,
} from "@/components/react-flow/node-status-indicator";

interface BaseTriggerNodeProps extends NodeProps {
  icon: LucideIcon | string;
  name: string;
  description?: string;
  children?: ReactNode;
  status?: NodeStatus;
  onSettings?: () => void;
  onDoubleClick?: () => void;
}

export const BaseTriggerNode = memo(
  ({ status = "initial", ...props }: BaseTriggerNodeProps) => {
    // ✅ Use the useReactFlow hook
    const { setNodes, setEdges } = useReactFlow();

    const handleDelete = () => {
      //console.log("🗑️ Deleting node:", props.id);

      setNodes((currentNodes) => {
        return currentNodes.filter((node) => node.id !== props.id);
      });

      setEdges((currentEdges) => {
        return currentEdges.filter(
          (edge) => edge.source !== props.id && edge.target !== props.id
        );
      });
    };

    return (
      <WorkflowNode
        name={props.name}
        description={props.description}
        onDelete={handleDelete}
        onSettings={props.onSettings}
      >
        <NodeStatusIndicator
          status={status}
          variant="border"
          className="rounded-l-2xl"
        >
          <BaseNode
            status={status}
            onDoubleClick={props.onDoubleClick}
            className="rounded-l-2xl relative group"
          >
            <BaseNodeContent>
              {typeof props.icon === "string" ? (
                <Image
                  src={props.icon}
                  alt={props.name}
                  width={16}
                  height={16}
                />
              ) : (
                <props.icon className="size-4 text-muted-foreground" />
              )}
              {props.children}
              <BaseHandle
                id="source-1"
                type="source"
                position={Position.Right}
              />
            </BaseNodeContent>
          </BaseNode>
        </NodeStatusIndicator>
      </WorkflowNode>
    );
  }
);

BaseTriggerNode.displayName = "BaseTriggerNode";
