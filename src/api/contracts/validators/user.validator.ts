import { UserDetailsDto } from '../dto/user-details.dto';
import { getUserResponseSchema } from '../schemas/user-details.schema';
import ajv from './ajv.instance';

export const validateUserDetails = ajv.compile<UserDetailsDto>(getUserResponseSchema);

export function isUserDetailsDto(data: unknown): data is UserDetailsDto {
  return validateUserDetails(data) === true;
}