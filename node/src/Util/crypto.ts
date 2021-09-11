import crypto from 'crypto';
import * as l from './logger';

// ref - https://codeforgeek.com/encrypt-and-decrypt-data-in-node-js/

const algo = 'aes-256-cbc';

// 32byte key for AES 256 bit encryption
const key = Buffer.from('mit_3201_edge_gbelp_system_aes__');

// Using AES CBC with Cipher Feedback. So IV is 16 bytes.
const iv = Buffer.from('mit_3201_edge_iv');

function createEncipher(){
    return crypto.createCipheriv(algo, key, iv);
}

function createDecipher(){
    return crypto.createDecipheriv(algo, key, iv);
}

/**
 * Encrypts the provided JS string and returns the ciphertext string.
 * @param plaintext utf8 string to encrypt
 */
export function encrypt(plaintext: string): string{
    try{
        let cipher = createEncipher();
        let encrypted = cipher.update(plaintext);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString('hex');
    }
    catch(error){
        l.logc(JSON.stringify(error), 'crypto.ts-encrypt');
        return '';
    }
}

/**
 * Decrypts the provided JS string and returns the plaintext string.
 * @param ciphertext utf8 string to decrypt
 */
export function decrypt(ciphertext: string): string{
    try{
        let cipher = createDecipher();
        let encrypted = Buffer.from(ciphertext, 'hex');
        let decrypted = cipher.update(encrypted);
        decrypted = Buffer.concat([decrypted, cipher.final()]);
        return decrypted.toString();
    }
    catch(error){
        l.logc(JSON.stringify(error), 'crypto.ts-decrypt');
        return '';
    }
}