import { world } from "@minecraft/server";
import { Database, Server } from "../../../library/Minecraft.js";
import { defaultScoreboard } from "../../../library/miscellaneous/leaderboard.js";

const registerInformation = {
    cancelMessage: true,
    name: 'leaderboard',
    staff: 'true',
    description: 'Move the leaderboard location',
    usage: '[x] [y] [z]',
    example: [
        'leaderboard 100 65 200'
    ]
};

Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const xCoord = parseInt(args[0]);
    const yCoord = parseInt(args[1]);
    const zCoord = parseInt(args[2]);
    const coordDB = new Database();
    const existingLeaderboard = world.getDimension('overworld').getEntities({ type: 'uac:leaderboard' }).find(entity => entity.location.x === defaultScoreboard.x && entity.location.y === defaultScoreboard.y && entity.location.z === defaultScoreboard.z);

    if (args.length !== 3 || isNaN(xCoord) || isNaN(yCoord) || isNaN(zCoord)) {
        return sender.tellraw('§¶§c§lUAC ► §cUsage: /leaderboard [x] [y] [z]');
    }

    sender.tellraw('§¶§c§lUAC ► §dSuccessfully set the leaderboard elsewhere.');
    coordDB.set('leaderboard_coord_x', xCoord);
    coordDB.set('leaderboard_coord_y', yCoord);
    coordDB.set('leaderboard_coord_z', zCoord);
    existingLeaderboard.kill();
});