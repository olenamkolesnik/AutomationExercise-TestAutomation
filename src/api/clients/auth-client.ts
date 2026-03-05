import { APIRequestContext } from '@playwright/test';

import { logger } from '../../common/utils/logger';
import { API_ENDPOINTS } from '../constants/endpoints';
import { BaseApiClient } from '../core/base-api.client';

export default class AuthClient extends BaseApiClient {
  private readonly defaultFormHeaders = {
    Referer: `${process.env.BASE_URL}/login`,
    Origin: `${process.env.BASE_URL}`,
  };

  constructor( request: APIRequestContext) {
    super(request);
  }

  async login(email: string, password: string): Promise<void> {
    logger.info(`Login attempt: ${email}`);
    const csrfToken = await this.getCsrfToken();

    const response = await this.performRequest(() =>
      this.request.post(API_ENDPOINTS.AUTH.LOGIN, {
        headers: { ...this.defaultFormHeaders, 'X-CSRFToken': csrfToken },
        form: { email, password },
      }),
    );

    if (!response.ok()) {
      throw new Error(`Login failed for ${email}: ${response.status()}`);
    } else {
      logger.info(`Login successful: ${email}`);
    }
  }

  async logout(): Promise<void> {
    logger.info('Logout attempt');

    const response = await this.performRequest(() =>
      this.request.get(API_ENDPOINTS.AUTH.LOGOUT, {
    }));

    if (!response.ok()) {
      throw new Error(`Logout failed: ${response.status()}`);
    } else {
      logger.info('Logout successful');
    }
  }

  private async getCsrfToken(): Promise<string> {
    await this.request.get('/login', {
      headers: {
        Referer: `${process.env.BASE_URL}/login`,
      },
    });

    const cookies = await this.request.storageState();
    const csrf = cookies.cookies.find((c) => c.name === 'csrftoken');
    if (!csrf) throw new Error('CSRF token not found');
    return csrf.value;
  }
}
