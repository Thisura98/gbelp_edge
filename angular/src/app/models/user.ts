import { ServerResponse, ServerResponsePlain } from './common-models';

interface UserType{
    user_type_id: Number;
    name: String;
}

export interface AuthUserResponse extends  ServerResponsePlain{}

export interface ServerResponseUserTypes extends  ServerResponse<UserType[]>{}
