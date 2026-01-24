export class ApiResponse<T = unknown> {
  constructor(
    public readonly httpStatus: number,
    public readonly responseCode: number,
    public readonly message: string | undefined,
    public readonly data: T | null,
    public readonly rawBody?: unknown | null
  ) {}
}
