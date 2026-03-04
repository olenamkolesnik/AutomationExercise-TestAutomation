import { UserTypeDto } from './user-type.dto';

export interface CategoryDto {
  readonly usertype: UserTypeDto;
  readonly category: string;
}
