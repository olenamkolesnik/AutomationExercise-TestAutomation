import { APIRequestContext } from '@playwright/test';
import { logger } from '../utils/logger';
import { API_ENDPOINTS } from '../constants/endpoints';
import { retry } from '../utils/retry';
import { wrapResponse } from '../utils/response-wrapper';
import { getUserResponseSchema } from '../schemas/get-user-response.schema';

export default class UserClient {
  constructor(private request: APIRequestContext) {
    logger.debug('UserClient initialized');
  }

  /**
   * Create a new user
   *
   * @param userPayload - Full user payload (UserRegstrationModel)
   * @returns Promise containing API response
   */
  async createUser(userPayload: Record<string, string | number | boolean>) {
    logger.info('Create user attempt');

    return retry(async () => {
      const response = await this.request.post(API_ENDPOINTS.USER.CREATE, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        form: userPayload,
      });

      logger.debug('Create User API request body', userPayload);
      logger.debug('Create User API response received', {
        status: response.status(),
        statusText: response.statusText(),
        text: await response.text(),
      });

      return wrapResponse(response);
    });
  }

  /**
   * Delete a user by email and password
   * @param email - Email of the user to delete
   * @param password - Password of the user to delete
   * @returns Promise containing API response
   */
  async deleteUserByEmailAndPassword(email: string, password: string) {
    logger.info(`Delete user attempt: ${email}`);

    return retry(async () => {
      const response = await this.request.delete(API_ENDPOINTS.USER.DELETE, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: { email, password },
      });

      logger.debug('Delete User API response received', {
        status: response.status(),
        statusText: response.statusText(),
        text: await response.text(),
      });

      return wrapResponse(response);
    });
  }

  /**
   * Get a user by email
   * @param email - Email of the user to retrieve
   * @returns Promise containing API response
   */
  async getUserByEmail(email: string) {
    logger.info(`Get user attempt: ${email}`);

    return retry(async () => {
      const response = await this.request.get(API_ENDPOINTS.USER.GET, {
        params: {
          email,
        },
      });

      logger.debug('Get User API response received', {
        status: response.status(),
        statusText: response.statusText(),
        text: await response.text(),
        body: response.body(),
      });

      return wrapResponse(response, getUserResponseSchema);
    });
  }
}
