export class ApiResponseWrapper<T> {
  constructor(
    public httpStatus: number,         // Raw HTTP status (always 200 on this API)
    public responseCode: number,       // API-level status (200, 201, 400, etc.)
    public message: string,            // API message
    public data: T | null = null       // Optional data field
  ) {}

  isSuccess(): boolean {
    return this.responseCode === 200 || this.responseCode === 201;
  }
}
