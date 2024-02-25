import { world } from "@minecraft/server";

/**
 * Write leaderboard data to a specified location in the Minecraft world.
 * 
 * @param {String} text The text data to display on the leaderboard.
 * @param {Number} x The x-coordinate of the location.
 * @param {Number} y The y-coordinate of the location.
 * @param {Number} z The z-coordinate of the location.
 */
export function writeLeaderboard(text, x, y, z) {
    try {
    const theLeaderboard = world.getDimension('overworld').spawnEntity('uac:leaderboard', { x, y, z });
    theLeaderboard.nameTag = `${text ? text : '[Leaderboard]'}`;
    } catch (error) {
        console.warn(`Error while setting leaderboard: ${error}\n${error.stack}`)
    }
};