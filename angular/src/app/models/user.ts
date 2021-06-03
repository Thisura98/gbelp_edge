import { ServerResponse, ServerResponsePlain } from './common-models';

interface UserType{
    user_type_id: number;
    name: string;
}

interface UserAuth{
    user_id: string,
    auth_token: string
}

export interface AuthUserResponse extends  ServerResponsePlain{}

export interface ServerResponseUserTypes extends  ServerResponse<UserType[]>{}

export interface ServerResponseUserAuth extends ServerResponse<UserAuth>{};
