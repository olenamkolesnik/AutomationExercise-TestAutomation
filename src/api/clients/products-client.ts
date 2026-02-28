import { APIRequestContext } from '@playwright/test';
import { logger } from '../../common/utils/logger';
import { API_ENDPOINTS } from '../constants/endpoints';
import { retry } from '../utils/retry';
import { wrapResponse } from '../utils/response-wrapper';
import { ApiResponse } from '../contracts/api-response';
import { ProductDto } from '../contracts/dto/product-dto';

export default class ProductsClient {
  constructor(private request: APIRequestContext) {
  }

  private async performRequest<T>(fn: () => Promise<T>) {
    return retry(fn, 3, 500, 2);
  }

  async getProductsList(): Promise<ApiResponse<ProductDto[]>> {
    logger.info('Get products list attempt');   

    const response = await this.performRequest(() =>
      this.request.get(API_ENDPOINTS.PRODUCTSLIST, {
      })
    );

    return wrapResponse<ProductDto[]>(response);
  }
}