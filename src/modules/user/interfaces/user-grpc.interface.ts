import { Observable } from 'rxjs';
import { UserRoleDto } from '../dtos/user-role.dto';

interface ResponseType {
  message: string;
}

interface ResponseHasAuthorizationType {
  userId: number;
  roleId: number;
  authorized: boolean;
}

export interface UserGrpc {
  addRole(userRoleDto: UserRoleDto): Observable<ResponseType>;
  removeRole(userRoleDto: UserRoleDto): Observable<ResponseType>;
  hasAuthorization(
    userRoleDto: UserRoleDto,
  ): Observable<ResponseHasAuthorizationType>;
}
