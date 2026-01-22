import type { JsonObject } from '../../types/json-type';
export interface commonResponse extends JsonObject {
  responseCode: number;
  message: string;
}
