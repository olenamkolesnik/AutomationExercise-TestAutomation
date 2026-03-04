
export interface ApiResponseDTO<T> {
  httpStatus: number;
  responseCode: number;
  message?: string;
  data: T | null;
  rawBody?: unknown | null;
}