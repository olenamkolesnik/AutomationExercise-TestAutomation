import { APIRequestContext } from '@playwright/test';
import { logger } from '../../common/utils/logger';
import { API_ENDPOINTS } from '../constants/endpoints';
import { wrapResponse } from '../utils/response-wrapper';
import { toFormPayload } from '../utils/form-helper';
import { ApiResponse } from '../contracts/api-response';
import { CommonResponseDto } from '../contracts/dto/common-response.dto';
import { UserDetailsDto } from '../contracts/dto/user-details.dto';
import { UpdateUserDto } from '../contracts/dto/update-user.dto';
import { DeleteUserDto } from '../contracts/dto/delete-user.dto';
import { BaseApiClient } from './base-api.client';
import { CreateUserDto } from '../contracts/dto/create-user.dto';

export default class UserClient extends BaseApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async createUser(user: CreateUserDto): Promise<ApiResponse<CommonResponseDto>> {
    logger.info('Create user attempt');

    
    const userPayload = toFormPayload(user);

    const response = await this.performRequest(() =>
      this.request.post(API_ENDPOINTS.USER.CREATE, {
        form: userPayload,
      }),
    );

    return wrapResponse(response);
  }

  async deleteUser(
    credentials: DeleteUserDto,
  ): Promise<ApiResponse<CommonResponseDto>> {
    logger.info(`Delete user attempt for: ${credentials.email}`);

    const response = await this.performRequest(() =>
      this.request.delete(API_ENDPOINTS.USER.DELETE, {
        form: toFormPayload(credentials),
      }),
    );

    return wrapResponse(response);
  }

  async getUserByEmail(
    email: string,
  ): Promise<ApiResponse<UserDetailsDto>> {
    logger.info(`Get user attempt: ${email}`);

    const response = await this.performRequest(() =>
      this.request.get(API_ENDPOINTS.USER.GET, {
        params: { email },
      }),
    );

    return wrapResponse<UserDetailsDto>(response);
  }

  async updateUser(
    user: UpdateUserDto,
  ): Promise<ApiResponse<CommonResponseDto>> {
    logger.info('Update user attempt');

    const userPayload = toFormPayload(user);

    const response = await this.performRequest(() =>
      this.request.put(API_ENDPOINTS.USER.UPDATE, {
        form: userPayload,
      }),
    );

    return wrapResponse(response);
  }
}
