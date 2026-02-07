import { APIRequestContext } from '@playwright/test';
import { logger } from '../../common/utils/logger';
import { API_ENDPOINTS } from '../constants/endpoints';
import { retry } from '../utils/retry';
import { wrapResponse } from '../utils/response-wrapper';
import { ApiResponse } from '../models/api-response';

export default class ProductsClient {
  private readonly defaultFormHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  constructor(private request: APIRequestContext) {
    logger.debug('ProductsClient initialized');
  }

  private async performRequest<T>(fn: () => Promise<T>) {
    return retry(fn, 3, 500, 2);
  }

  async getProductsList(): Promise<ApiResponse<unknown>> {
    logger.info('Get products list attempt');   

    const response = await this.performRequest(() =>
      this.request.get(API_ENDPOINTS.PRODUCTSLIST, {
        headers: this.defaultFormHeaders,
      })
    );

    return wrapResponse(response);
  }
}