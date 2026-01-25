import type { JsonObject } from '../../types/json-type';
import { Title } from '../../constants/titles';

export interface UpdateUserRequest extends JsonObject {
  title: Title;
  name: string;
  email: string;
  password: string;
  birth_date: number; // 1–31
  birth_month: number; // 1–12
  birth_year: number; // e.g. 2021
  firstname: string;
  lastname: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile_number: string;
}