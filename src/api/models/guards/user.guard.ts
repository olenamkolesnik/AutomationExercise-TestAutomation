import { UserDetailsResponse } from "../responses/user-details.response";

export function isUserDetailsResponse(data: unknown): data is UserDetailsResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'email' in data &&
    'name' in data
  );
}