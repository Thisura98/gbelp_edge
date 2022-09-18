import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ServerResponse, ServerResponsePlain } from "src/app/models/common-models";
import { IGroupJoinEncryptedResult } from "src/app/models/group/group";
import { UserGroup, UserGroupComposition } from "../../../../../commons/src/models/groups";
import { UserGroupMemberData } from "../../../../../commons/src/models/groups/member";
import { APIBase } from "./base.api";

export class GroupAPIs implements APIBase {

  http!: HttpClient;
  aurl!: (endpoint: string) => string;
  getHeaders!: () => HttpHeaders;

  constructor(){}

  getGroupsForUser(): Observable<ServerResponse<any[]>> {
    const url = this.aurl('get-groups-for-user');
    return this.http.get<ServerResponse<any[]>>(url, {
      headers: this.getHeaders()
    })
  }

  createGroup(
    name: string,
    description: string,
    bannedUserCSV: string,
    userLimit: number | null,
    userIds: string[]
  ): Observable<ServerResponse<UserGroup>> {
    const url = this.aurl('create-group');
    const data = {
      name: name,
      description: description,
      bannedUserCSV: bannedUserCSV,
      link: '',
      limit: userLimit,
      insertUserIds: userIds
    };
    return this.http.post<ServerResponse<UserGroup>>(
      url, data, {
      headers: this.getHeaders()
    }
    )
  }

  getGroup(groupId: string): Observable<ServerResponse<UserGroup>> {
    const url = this.aurl('get-group');
    const query = { groupId: groupId };
    return this.http.get<ServerResponse<UserGroup>>(url, {
      params: query,
      headers: this.getHeaders()
    })
  }

  getGroupAnonymously(encryptedGroupId: string): Observable<ServerResponse<UserGroup>> {
    const url = this.aurl('get-group/anonymous');
    const query = { egi: encryptedGroupId };
    return this.http.get<ServerResponse<UserGroup>>(url, {
      params: query
    });
  }

  getGroupComposition(groupId: string): Observable<ServerResponse<UserGroupComposition[]>> {
    const url = this.aurl('get-group-composition');
    const query = { groupId: groupId };
    return this.http.get<ServerResponse<UserGroupComposition[]>>(url, {
      params: query,
      headers: this.getHeaders()
    });
  }

  joinGroupWith(encryptedGroupId: string): Observable<ServerResponse<IGroupJoinEncryptedResult>> {
    const url = this.aurl('groups-join-e');
    const body = {
      egi: encryptedGroupId
    };
    return this.http.post<ServerResponse<IGroupJoinEncryptedResult>>(url, body, {
      headers: this.getHeaders()
    });
  }

  deleteGroup(groupId: string): Observable<ServerResponsePlain> {
    const url = this.aurl('delete-group');
    const query = {
      groupId: groupId
    };
    return this.http.delete<ServerResponsePlain>(url, {
      params: query,
      headers: this.getHeaders()
    });
  }

  removeFromGroup(groupId: string, userId: string): Observable<ServerResponsePlain> {
    const url = this.aurl('leave-group');
    const query = {
      groupId: groupId,
      userId: userId
    };
    return this.http.delete<ServerResponsePlain>(url, {
      params: query,
      headers: this.getHeaders()
    });
  }

  getGroupMembers(groupId: string, searchName: string | undefined): Observable<ServerResponse<UserGroupMemberData>>{
    const url = this.aurl('group-users');
    const query = { groupId: groupId, search: searchName ?? '' };
    return this.http.get<ServerResponse<UserGroupMemberData>>(url, {
      params: query,
      headers: this.getHeaders()
    });
  }

}