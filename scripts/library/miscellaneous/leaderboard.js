import { world } from "@minecraft/server";

/**
 * Write leaderboard data to a specified location in the Minecraft world.
 * 
 * @param {String} text The text data to display on the leaderboard.
 * @param {Object} location The location to summon the leaderboard entity.
 * @param {Number} location.x The x-coordinate of the location.
 * @param {Number} location.y The y-coordinate of the location.
 * @param {Number} location.z The z-coordinate of the location.
 * @param {Number} dimension The dimension where the leaderboard will be summoned. Defaults to 'overworld' if not specified.
 */
export function writeLeaderboard(text, location, dimension) {
    const theLeaderboard = world.getDimension(dimension ? dimension : 'overworld').spawnEntity('uac:leaderboard', location)
    theLeaderboard.nameTag = `${text ? text : '[Leaderboard]'}`;
};