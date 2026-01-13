import { APIRequestContext } from '@playwright/test';
import { logger } from '../utils/logger';
import { API_ENDPOINTS } from '../constants/endpoints';
import { retry } from '../utils/retry';
import { wrapResponse } from '../utils/response-wrapper';
import { getUserResponseSchema } from '../schemas/get-user-response.schema';
import { deleteAccountSchema } from '../schemas/delete-account.schema';
import { toFormPayload } from '../utils/form-helper';
import { UserDTO } from '../dto/user-dto';
import { ApiResponseWrapper } from '../dto/api-response-wrapper-model';

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

  async createUser(user: UserDTO): Promise<ApiResponseWrapper<any>> {
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
  ): Promise<ApiResponseWrapper<any>> {
    logger.info(`Delete user attempt: ${email}`);

    const response = await this.performRequest(() =>
      this.request.delete(API_ENDPOINTS.USER.DELETE, {
        headers: this.defaultFormHeaders,
        form: password ? { email, password } : { email },
      })
    );

    return wrapResponse(response);
  }

  async getUserByEmail(email: string): Promise<ApiResponseWrapper<any>> {
    logger.info(`Get user attempt: ${email}`);

    const response = await this.performRequest(() =>
      this.request.get(API_ENDPOINTS.USER.GET, {
        headers: this.defaultFormHeaders,
        params: { email },
      })
    );

    return wrapResponse(response);
  }
}
