import * as sql from './connections/sql/sql_connection';
import express from 'express';
import * as path from 'path';
import { getConfig } from '../Util/config';
import { v4 as uuidv4 } from 'uuid';

let app_root_path = '';
let server_base_url = '';
let is_test_mode = false;

export function setTestMode(isTestMode: boolean) {
    is_test_mode = isTestMode;
}

export function getIsTestMode(): boolean { return is_test_mode };

export function setRootPath(path: string) {
    app_root_path = path;
}

export function getRootPath(): string {
    return app_root_path;
}

export function getServerURLFor(pathStr: string): string {
    if (server_base_url == '') {
        server_base_url = getConfig().server_base_url;
    }
    return path.join(server_base_url, pathStr);
}

/**
 * Returns true if value is not one of: undefined, null or ''
 */
export function isEmptyParam(value: any): boolean {
    return value == undefined || value == null || value == '';
}

/**
 * Checks whether the provided user can modify the 
 * game.
 * @param gameId Game Entry ID
 * @param userId The user who wants to change something
 * @param callback Callback with status as boolean and project ID if allowed.
 */
export function checkUserCanModifyGame(
    gameId: string, userId: string, callback: (status: boolean, projectId: string | null) => void
) {
    const t = sql.tables.gameEntry;
    const c = sql.columns.gameEntry;
    const selectAuthorsQuery = `SELECT ${c.authorId}, ${c.projectId} 
        FROM ${t} 
        WHERE ${c.id} = '${gameId}'
    `;

    sql.getPool()!.query(selectAuthorsQuery, (err: any, res: any) => {
        if (err) {
            callback(false, null);
            return;
        }

        if (res.length == 0) {
            callback(false, 'User does not own provided game');
            return;
        }

        // csv of author ids - checked allowed to modify
        const authors = String(res[0][c.authorId]).split(',');
        if (authors.find(a => a == userId) == undefined) {
            callback(false, null);
        }
        else {
            callback(true, res[0][c.projectId]);
        }
    })
}

/**
 * Base 64 decode a string.
 * 
 * Why the binary?
 * https://stackoverflow.com/a/47890385/3178477
 */
export function base64Decode(input: string): string {
    return Buffer.from(input, 'base64').toString('binary');
}

/**
 * Properly decode game scripts encoded
 * by Angular Editor frontend.
 */
export function decodeGameScript(input: string): string {
    const base64Decoded = base64Decode(input);
    const decoded = decodeURIComponent(escape(base64Decoded));
    return decoded;
}

/**
 * Generate unique file ID
 */
export function generateUploadResourceName(originalName: string): string {
    return uuidv4() + path.extname(originalName);
}