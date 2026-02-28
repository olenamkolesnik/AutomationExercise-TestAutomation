import type { JsonObject } from '../../../common/types/json-type';
export interface commonResponse extends JsonObject {
  responseCode: number;
  message: string;
}
