import type { JsonObject } from '../types/json-type';
export interface ApiStatusResponse extends JsonObject {
  responseCode: number;
  message: string;
}
