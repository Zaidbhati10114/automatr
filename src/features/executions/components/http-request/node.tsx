import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { memo, useState, useCallback } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { GlobeIcon } from "lucide-react";
import { FormType, HttpRequestDialog } from "./dialog";

type HttpRequestNodeData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
  [key: string]: unknown;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const [open, setOpen] = useState(false);
  const { setNodes } = useReactFlow();
  const nodeStatus = "initial";
  const nodeData = props.data;

  const description = nodeData?.endpoint
    ? `${nodeData.method || "GET"} : ${nodeData.endpoint}`
    : "Not Configured";

  // Wrap in useCallback to prevent unnecessary re-renders
  const handleOpenSettings = useCallback(() => {
    setOpen(true);
  }, []);

  // Also wrap handleSubmit in useCallback
  // IMPORTANT: handleSubmit must be before handleOpenSettings
  const handleSubmit = useCallback(
    (values: FormType) => {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === props.id) {
            return {
              ...node,
              data: {
                ...node.data,
                endpoint: values.endpoint,
                method: values.method,
                body: values.body,
              },
            };
          }
          return node;
        })
      );
    },
    [props.id, setNodes]
  );

  return (
    <>
      <HttpRequestDialog
        defaultBody={nodeData?.body}
        defaultEndpoint={nodeData?.endpoint}
        defaultMethod={nodeData?.method}
        onSubmit={handleSubmit}
        open={open}
        onOpenChange={setOpen}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        name="HTTP Request"
        description={description}
        icon={GlobeIcon}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
        status={nodeStatus}
      />
    </>
  );
});

HttpRequestNode.displayName = "HttpRequestNode";
