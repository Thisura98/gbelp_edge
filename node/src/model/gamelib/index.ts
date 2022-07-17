import path from "path";

export function getSinglePlayerLibPath(): string{
    // return path.join(__dirname, '../../gamelib/singleplayer.lib.js');
    return path.join(__dirname, '../../game_compiler/phaser/phaser.d.ts');
}

export function getMultiPlayerLibPath(): string{
    return path.join(__dirname, '../../gamelib/multiplayer.lib.js');
}