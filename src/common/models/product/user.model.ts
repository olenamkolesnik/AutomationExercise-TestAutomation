import { Title } from "../../../api/constants/titles";

export interface User {
  id?: number;
  title: Title;
  name: string;
  email: string;
  password: string;

  birthDate: {
    day: number;
    month: number;
    year: number;
  };

  firstName: string;
  lastName: string;

  company?: string;
  address?: {
    line1: string;
    line2?: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
  };

  mobileNumber?: string;
}