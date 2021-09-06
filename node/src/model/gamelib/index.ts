import path from "path";

export function getSinglePlayerLibPath(): string{
    return path.join(__dirname, '../../gamelib/singleplayer.lib.js');
}

export function getMultiPlayerLibPath(): string{
    return path.join(__dirname, '../../gamelib/multiplayer.lib.js');
}