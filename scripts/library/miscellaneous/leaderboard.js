import { world } from "@minecraft/server";
import { Database } from '../Minecraft.js';

const coordinatesDB = new Database();

export function getDefaultScoreboard() {
    return {
        x: coordinatesDB.get('leaderboard_coord_x'),
        y: coordinatesDB.get('leaderboard_coord_y'),
        z: coordinatesDB.get('leaderboard_coord_z')
    };
}

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
            return ` \n\nRank ${index + 1} ${player.name} Score: ${score !== undefined ? score : 0}\n `;
        }).join('\n');

        const theLeaderboardEntities = world.getDimension('overworld').getEntities({ type: 'uac:leaderboard' });
        const existingLeaderboard = theLeaderboardEntities.find((entity) => entity.location.x === defaultScoreboard.x && entity.location.y === defaultScoreboard.y && entity.location.z === defaultScoreboard.z);

        if (new Database().get('lbdtoggle') === 0) return existingLeaderboard.kill();
        
        if (existingLeaderboard) {
            existingLeaderboard.nameTag = leaderboardText;
        } else {
            if (existingLeaderboard) return;

            const theLeaderboard = world.getDimension('overworld').spawnEntity('uac:leaderboard', { x: defaultScoreboard.x, y: defaultScoreboard.y, z: defaultScoreboard.z });
            theLeaderboard.nameTag = `${leaderboardText ? leaderboardText : '[Leaderboard]\n\nNo text.'}`;
        }
    } catch (error) {
        //console.warn(`Error while setting leaderboard: ${error}\n${error.stack}`)
    }
};