import { useState } from "react";

export interface MutationOptions<TData> {
  onSuccess?: (data: TData) => void;
  onError?: (message: string) => void;
  errorMessage?: string;
}

/**
 * @deprecated use useMutation from `@tanstack/react-query` instead
 */
export function useMutation<TVariables, TData>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: MutationOptions<TData>,
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean | null>(null);

  async function mutate(variables: TVariables): Promise<void> {
    setLoading(true);
    setError(null);

    try {
      const data = await mutationFn(variables);
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    } catch (mutateError) {
      if (options?.onError) {
        options.onError(
          options.errorMessage || "Erro ao realizar a operação de mutate.",
        );
      }

      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, mutate };
}
