"use client";

import { NodeToolbar, Position } from "@xyflow/react";
import { Button } from "./ui/button";
import { SettingsIcon, TrashIcon } from "lucide-react";

interface WorkflowNodeProps {
  children: React.ReactNode;
  showToolbar?: boolean;
  onDelete?: () => void;
  onSettings?: () => void;
  name?: string;
  description?: string;
}

export const WorkflowNode = ({
  children,
  showToolbar = true,
  onDelete,
  onSettings,
  name,
  description,
}: WorkflowNodeProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent React Flow from capturing the event
    e.preventDefault();
    console.log("Delete clicked in WorkflowNode");
    onDelete?.();
  };
  return (
    <>
      {/* -------- TOP TOOLBAR -------- */}
      {showToolbar && (
        <NodeToolbar isVisible>
          <Button size="sm" variant="ghost" onClick={onSettings}>
            <SettingsIcon className="size-4" />
          </Button>

          <Button size="sm" variant="ghost" onClick={handleDelete}>
            <TrashIcon className="size-4" />
          </Button>
        </NodeToolbar>
      )}

      {/* -------- NODE CONTENT -------- */}
      {children}

      {/* -------- BOTTOM LABEL TOOLBAR -------- */}
      {(name || description) && (
        <NodeToolbar
          isVisible
          position={Position.Bottom}
          className="z-50 flex flex-col items-center text-center"
        >
          {name && <p className="font-medium">{name}</p>}
          {description && (
            <p className="text-muted-foreground text-sm truncate w-full">
              {description}
            </p>
          )}
        </NodeToolbar>
      )}
    </>
  );
};
