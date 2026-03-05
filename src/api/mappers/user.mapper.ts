import { User } from '../../common/models/product/user.model';
import { Title } from '../constants/titles';
import { CreateUserDto } from '../contracts/dto/create-user.dto';
import { UpdateUserDto } from '../contracts/dto/update-user.dto';
import { UserDetailsDto } from '../contracts/dto/user-details.dto';
import { isUserDetailsDto } from '../contracts/validators/user.validator';

export function mapToCreateUserDto(user: User): CreateUserDto {
  return {
    title: user.title,
    name: user.name,
    email: user.email,
    password: user.password,
    birth_date: user.birthDate.day,
    birth_month: user.birthDate.month,
    birth_year: user.birthDate.year,
    firstname: user.firstName,
    lastname: user.lastName,
    company: user.company ?? '',
    address1: user.address?.line1 ?? '',
    address2: user.address?.line2 ?? '',
    country: user.address?.country ?? '',
    state: user.address?.state ?? '',
    city: user.address?.city ?? '',
    zipcode: user.address?.zipCode ?? '',
    mobile_number: user.mobileNumber ?? '',
  };
}

export function mapToDomainUser(response: UserDetailsDto): User {
  return {
    id: response.id,
    title: response.title as Title,
    name: response.name,
    email: response.email,
    password: '', // not returned
    birthDate: {
      day: Number(response.birth_day),
      month: Number(response.birth_month),
      year: Number(response.birth_year),
    },
    firstName: response.first_name,
    lastName: response.last_name,
    company: response.company,
    address: {
      line1: response.address1,
      line2: response.address2,
      country: response.country,
      state: response.state,
      city: response.city,
      zipCode: response.zipcode,
    },
  };
}

export function mapToUpdateUserDto(user: User): UpdateUserDto {
  return {
    title: user.title,
    name: user.name,
    email: user.email,
    password: user.password,
    birth_date: user.birthDate.day,
    birth_month: user.birthDate.month,
    birth_year: user.birthDate.year,
    firstname: user.firstName,
    lastname: user.lastName,
    company: user.company ?? '',
    address1: user.address?.line1 ?? '',
    address2: user.address?.line2 ?? '',
    country: user.address?.country ?? '',
    state: user.address?.state ?? '',
    city: user.address?.city ?? '',
    zipcode: user.address?.zipCode ?? '',
    mobile_number: user.mobileNumber ?? '',
  };
}

export function validateAndMapUser(data: unknown): User {
  isUserDetailsDto(data);
  const retrievedUser = mapToDomainUser(data as UserDetailsDto);
  return retrievedUser;
}
