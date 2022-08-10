import path from "path";

export function getPhaserLibPath(): string{
    return path.join(__dirname, '../../game_compiler/phaser/phaser.d.ts');
}

export function getSinglePlayerLibPath(): string{
    return path.join(__dirname, '../../gamelib/singleplayer.lib.js');
}

export function getMultiPlayerLibPath(): string{
    return path.join(__dirname, '../../gamelib/multiplayer.lib.js');
}