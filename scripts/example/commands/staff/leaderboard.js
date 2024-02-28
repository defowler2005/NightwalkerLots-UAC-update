import { world } from '@minecraft/server';
import { Database, Server } from '../../../library/Minecraft.js';
import { getDefaultScoreboard } from '../../../library/miscellaneous/leaderboard.js';

const registerInformation = {
    cancelMessage: true,
    name: 'leaderboard',
    staff: 'true',
    description: 'Move the leaderboard location',
    usage: '[x] [y] [z] | ~ ~ ~',
    example: [
        'leaderboard 100 65 200',
        'leaderboard ~ ~ ~'
    ]
};

Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const coordDB = new Database();
    const defaultScoreboard = getDefaultScoreboard();

    let xCoord, yCoord, zCoord;

    if (args.length === 3 && !isNaN(parseInt(args[0])) && !isNaN(parseInt(args[1])) && !isNaN(parseInt(args[2]))) {
        xCoord = parseInt(args[0]);
        yCoord = parseInt(args[1]);
        zCoord = parseInt(args[2]);
    } else if (args[0] === '~' && args[1] === '~' && args[2] === '~') {
        xCoord = sender.location.x;
        yCoord = sender.location.y;
        zCoord = sender.location.z;
    } else {
        return sender.tellraw('§¶§c§lUAC ► §cUsage: leaderboard [x] [y] [z] | ~ ~ ~');
    };

    const existingLeaderboard = world.getDimension('overworld').getEntities({ type: 'uac:leaderboard' }).find(entity => entity.location.x === defaultScoreboard.x && entity.location.y === defaultScoreboard.y && entity.location.z === defaultScoreboard.z);

    coordDB.set('leaderboard_coord_x', xCoord);
    coordDB.set('leaderboard_coord_y', yCoord);
    coordDB.set('leaderboard_coord_z', zCoord);

    if (existingLeaderboard) existingLeaderboard.kill();

    sender.tellraw('§¶§c§lUAC ► §dSuccessfully set the leaderboard elsewhere.');
});