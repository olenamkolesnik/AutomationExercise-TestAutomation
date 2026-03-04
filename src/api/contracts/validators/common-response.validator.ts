import ajv from './ajv.instance';
import { CommonResponseDto } from '../dto/common-response.dto';
import { commonResponseSchema } from '../schemas/common-response.schema';

export const validateCommonResponse = ajv.compile<CommonResponseDto>(commonResponseSchema);

export function isCommonResponseDto(data: unknown): data is CommonResponseDto {
  return validateCommonResponse(data) === true;
}