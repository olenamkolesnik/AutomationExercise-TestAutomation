import { APIRequestContext } from '@playwright/test';
import { logger } from '../../common/utils/logger';
import { API_ENDPOINTS } from '../constants/endpoints';
import { wrapResponse } from '../core/response-wrapper';
import { ApiResponse } from '../core/api-response';
import { ProductDto } from '../contracts/dto/product.dto';
import { BaseApiClient } from '../core/base-api.client';

export default class ProductsClient extends BaseApiClient {
  constructor(request: APIRequestContext) {
    super(request);
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