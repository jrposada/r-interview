import { ParsedLocation, UseNavigateResult } from '@tanstack/react-router';

export type QueryParams<TResponse> = {
  fn: () => Promise<TResponse>;
  location: ParsedLocation<{
    redirect?: string | undefined;
  }>;
  navigate: UseNavigateResult<string>;
  // session: Session; // Your auth session here
};
export function query<TResponse>({
  fn,
}: QueryParams<TResponse>): () => Promise<TResponse> {
  return async () => {
    try {
      return await fn();
    } catch (error) {
      // Add auth redirect
      return Promise.resolve({} as TResponse);
    }
  };
}
