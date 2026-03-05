import { APIRequestContext, APIResponse } from "@playwright/test";

import { retry } from "../utils/retry";

export abstract class BaseApiClient {
  constructor(protected request: APIRequestContext) {}

  protected async performRequest(
      fn: () => Promise<APIResponse>,
    ): Promise<APIResponse> {
      return retry(fn, 3, 500, 2, (_, response) => {
        if (!response) return false;
  
        return response.status() >= 500;
      });
    }
}