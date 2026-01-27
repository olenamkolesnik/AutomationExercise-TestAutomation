import { APIRequestContext } from '@playwright/test';
import { logger } from '../../common/utils/logger';
import { API_ENDPOINTS } from '../constants/endpoints';
import { retry } from '../utils/retry';
import { wrapResponse } from '../utils/response-wrapper';
import { toFormPayload } from '../utils/form-helper';
import { CreateUserRequest } from '../models/requests/create-user.request';
import { ApiResponse } from '../models/api-response';
import { commonResponse } from '../models/responses/common.response';
import { UserDetailsResponse } from '../models/responses/user-details.response';
import { UpdateUserRequest } from '../models/requests/update-user.request';

export default class UserClient {
  private readonly defaultFormHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  constructor(private request: APIRequestContext) {
    logger.debug('UserClient initialized');
  }

  private async performRequest<T>(fn: () => Promise<T>) {
    return retry(fn, 3, 500, 2);
  }

  async createUser(user: CreateUserRequest): Promise<ApiResponse<commonResponse>> {
    logger.info('Create user attempt');

    const userPayload = toFormPayload(user);

    const response = await this.performRequest(() =>
      this.request.post(API_ENDPOINTS.USER.CREATE, {
        headers: this.defaultFormHeaders,
        form: userPayload,
      })
    );

    return wrapResponse(response);
  }

  async deleteUserByEmailAndPassword(
    email: string,
    password?: string
  ): Promise<ApiResponse<commonResponse>> {
    logger.info(`Delete user attempt: ${email}`);

    const response = await this.performRequest(() =>
      this.request.delete(API_ENDPOINTS.USER.DELETE, {
        headers: this.defaultFormHeaders,
        form: password ? { email, password } : { email },
      })
    );

    return wrapResponse(response);
  }

  async getUserByEmail(email: string): Promise<ApiResponse<UserDetailsResponse | commonResponse>> {
    logger.info(`Get user attempt: ${email}`);

    const response = await this.performRequest(() =>
      this.request.get(API_ENDPOINTS.USER.GET, {
        headers: this.defaultFormHeaders,
        params: { email },
      })
    );

    return wrapResponse<UserDetailsResponse | commonResponse>(response);
  }

  async updateUser(user: UpdateUserRequest): Promise<ApiResponse<commonResponse>> {
    logger.info('Update user attempt');

    const userPayload = toFormPayload(user);

    const response = await this.performRequest(() =>
      this.request.put(API_ENDPOINTS.USER.UPDATE, {
        headers: this.defaultFormHeaders,
        form: userPayload,
      })
    );

    return wrapResponse(response);
  }
}