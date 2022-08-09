import * as fs from 'fs';
import * as pc from '../util/parseconfig';
import * as utils from '../util/utils';
import { Express } from 'express-serve-static-core';

const config = pc.parseConfig('config.json');

export function fileHandler(app: Express){
    // images
    app.get(`/${config.fs_res_path_image}/*`, (req, res) => {
        const filePath = `${utils.getRootPath()}${req.path}`;
        // console.log("User Requested image", filePath);
        fs.readFile(filePath, {}, (error, content) => {
            if (error) {
                if(error.code == 'ENOENT') {
                    fs.readFile('./404.html', function(error, content) {
                        res.writeHead(200, { 'Content-Type': 'image/png' });
                        res.end(content, 'utf-8');
                    });
                }
                else {
                    res.writeHead(500);
                    res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    res.end();
                }
            }
            else {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(content, 'utf-8');
            }
        });
    });

    // sounds
    app.get(`/${config.fs_res_path_sound}/*`, (req, res) => {
        // console.log("User Requested sound");
        const filePath = `${utils.getRootPath()}${req.path}`;
        fs.readFile(filePath, {}, (error, content) => {
            if (error) {
                if(error.code == 'ENOENT') {
                    fs.readFile('./404.html', function(error, content) {
                        res.writeHead(200, { 'Content-Type': 'audio/ogg' });
                        res.end(content, 'utf-8');
                    });
                }
                else {
                    res.writeHead(500);
                    res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    res.end();
                }
            }
            else {
                res.writeHead(200, { 'Content-Type': 'audio/ogg' });
                res.end(content, 'utf-8');
            }
        });
    });

    // articles
    app.get(`/${config.fs_articles}/*`, (req, res) => {
        const filePath = `${utils.getRootPath()}${req.path}`;
        fs.readFile(filePath, {}, (error, content) => {
            if (error) {
                if(error.code == 'ENOENT') {
                    res.writeHead(404);
                    res.end('Article resource not found')
                    res.end();
                }
                else {
                    res.writeHead(500);
                    res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    res.end();
                }
            }
            else {
                const requestPath = String(req.path);
                if (requestPath.search('.md') != -1){
                    res.writeHead(200, { 'Content-Type': 'text/markdown' });
                    res.end(content, 'utf-8');
                }
                else{
                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    res.end(content, 'utf-8');
                }
            }
        });
    });
}