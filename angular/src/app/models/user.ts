import { ServerResponse, ServerResponsePlain } from './common-models';

interface UserType{
    user_type_id: number;
    name: string;
}

interface CreateUser{
    user_id: string,
    auth_token: string
}

export interface AuthUserResponse extends  ServerResponsePlain{}

export interface ServerResponseUserTypes extends  ServerResponse<UserType[]>{}

export interface ServerResponseUserCreate extends ServerResponse<CreateUser>{};
