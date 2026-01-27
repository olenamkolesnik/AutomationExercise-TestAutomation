import { UpdateUserRequest } from '../models/requests/update-user.request';
import { logger } from '../../common/utils/logger';

export type UpdateAccountOverrides = Partial<UpdateUserRequest>;

export function buildUpdateAccountData(
  overrides: UpdateAccountOverrides
): UpdateUserRequest {
  logger.debug(`Building update account data: ${JSON.stringify(overrides)}`);
  return { ...overrides } as UpdateUserRequest;
}