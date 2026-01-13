export class ApiResponseWrapper<T = any> {
  constructor(
    public readonly httpStatus: number,
    public readonly responseCode: number,
    public readonly message: string | undefined,
    public readonly data: T | null
  ) {}
}
