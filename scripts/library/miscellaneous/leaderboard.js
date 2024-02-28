import { world } from "@minecraft/server";
import { Database } from '../Minecraft.js'

const coordinatesDB = new Database();

export function getDefaultScoreboard() {
    return {
        x: coordinatesDB.get('leaderboard_coord_x'),
        y: coordinatesDB.get('leaderboard_coord_y'),
        z: coordinatesDB.get('leaderboard_coord_z')
    };
}

/**
 * Set all player names and scores to the default leaderboard location.
 */
export function writeLeaderboard() {
    try {
        const defaultScoreboard = getDefaultScoreboard();
        const scoreboard = world.scoreboard.getObjective('money');
        const sortedPlayers = world.getAllPlayers().slice().sort((playerA, playerB) => {
            const scoreA = scoreboard.getScore(playerA);
            const scoreB = scoreboard.getScore(playerB);
            return (scoreB !== undefined && scoreA !== undefined) ? scoreB - scoreA : 0;
        });

        const leaderboardText = sortedPlayers.map((player, index) => {
            const score = scoreboard.getScore(player);
            return `Rank ${index + 1} ${player.name} Score: ${score !== undefined ? score : 0}`;
        }).join('\n');
        const theLeaderboardEntities = world.getDimension('overworld').getEntities({ type: 'uac:leaderboard' });
        const existingLeaderboard = theLeaderboardEntities.find(entity => entity.location.x === defaultScoreboard.x && entity.location.y === defaultScoreboard.y && entity.location.z === defaultScoreboard.z);

        if (existingLeaderboard) existingLeaderboard.nameTag = leaderboardText;
        else {
            const theLeaderboard = world.getDimension('overworld').spawnEntity('uac:leaderboard', { x: defaultScoreboard.x, y: defaultScoreboard.y, z: defaultScoreboard.z });
            theLeaderboard.nameTag = `${leaderboardText ? leaderboardText : '[Leaderboard]\n\nNo text.'}`;
        }
    } catch (error) {
        console.warn(`Error while setting leaderboard: ${error}\n${error.stack}`)
    }
};
