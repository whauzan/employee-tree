export interface ErrorContextState {
  error: Error | null;
  setError: (error: Error | null) => void;
}
