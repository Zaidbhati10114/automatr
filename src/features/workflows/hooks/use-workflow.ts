import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useWorkflowsParams } from "./use-workflows-params";



export const useSuspenseWorkflows = () => {
    const trpc = useTRPC();
    const [params] = useWorkflowsParams()
    return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params))
}





export const useCreateWorkflow = () => {
    const queryCLient = useQueryClient();
    const [params] = useWorkflowsParams()
    const trpc = useTRPC()
    return useMutation(trpc.workflows.create.mutationOptions({
        onSuccess: (data: any) => {
            toast.success(`Workflow "${data.name}" created successfully`)
            queryCLient.invalidateQueries(trpc.workflows.getMany.queryOptions({}))
        },

        onError: (error: any) => {
            toast.error(`Error creating workflow: ${error.message}`)
        }

    }))
}

export const useDeleteWorkflow = () => {
    const queryCLient = useQueryClient();
    const trpc = useTRPC()
    return useMutation(trpc.workflows.remove.mutationOptions({
        onSuccess: (data: any) => {
            toast.success(`Workflow "${data.name}" removed successfully`)
            queryCLient.invalidateQueries(trpc.workflows.getMany.queryOptions({}))
            queryCLient.invalidateQueries(trpc.workflows.getOne.queryOptions({ id: data.id }))
        },

        onError: (error: any) => {
            toast.error(`Error removing workflow: ${error.message}`)
        }

    }))
}

// HOOK to fetch single workflow

export const useSuspenseSingleWorkflow = (id: string) => {
    const trpc = useTRPC();
    return useSuspenseQuery(trpc.workflows.getOne.queryOptions({ id }))
}


export const useUpdateWorkflowName = () => {
    const queryCLient = useQueryClient();
    const [params] = useWorkflowsParams()
    const trpc = useTRPC()
    return useMutation(trpc.workflows.updateName.mutationOptions({
        onSuccess: (data: any) => {
            toast.success(`Workflow "${data.name}" updated successfully`)
            queryCLient.invalidateQueries(trpc.workflows.getMany.queryOptions({}))
            queryCLient.invalidateQueries(trpc.workflows.getOne.queryOptions({ id: data.id }))
        },

        onError: (error: any) => {
            toast.error(`Error updating workflow: ${error.message}`)
        }

    }))
}