import { UserDTO } from "./user-dto";

export function isUserDTO(data: unknown): data is UserDTO {
  return (
    typeof data === 'object' &&
    data !== null &&
    'email' in data &&
    'name' in data
  );
}