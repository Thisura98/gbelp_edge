import { ServerResponse, ServerResponsePlain } from './common-models';

interface UserType{
    user_type_id: number;
    name: string;
}

interface UserAuth{
    user_id: string,
    token: string
}

// @DEMO
// interface LatestSessionTimes{
//     start_time: string,
//     end_time: string
// }

// @DEMO
// export interface GameObjective{
//     session_id: number,
//     objective_id: number,
//     user_id: number,
//     progress: number,
//     max_value: number,
//     name: string,
//     last_updated: string
// }

export interface AuthUserResponse extends  ServerResponsePlain{}

export interface ServerResponseUserTypes extends  ServerResponse<UserType[]>{}

export interface ServerResponseUserAuth extends ServerResponse<UserAuth>{};

export interface ServerResponseUserTypeInfo extends ServerResponse<UserType>{};

// @DEMO
export interface ServerResponseLatestSession extends ServerResponse<any>{};

// @DEMO
export interface ServerResponseGameObjectiveHistories extends ServerResponse<any[]>{};