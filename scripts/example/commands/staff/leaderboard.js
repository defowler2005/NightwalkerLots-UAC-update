import { world } from "@minecraft/server";
import { writeLeaderboard } from "../../../library/miscellaneous/leaderboard.js";
import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff, TellRB } from '../../../library/utils/prototype.js';

const registerInformation = {
    cancelMessage: true,
    name: 'leaderboard',
    staff: 'management',
    description: 'Set a leaderboard in a dimension',
    usage: '[ leaderboard My_leaderboard\newln_defowler2OO5:_2000 ]',
    example: [
        'leaderboard [String]'
    ]
};

Server.command.register(registerInformation, (chatmsg, args) => {
    try {
        const { sender } = chatmsg;
        //const name = sender.getName();
        if (args[0] === undefined) return sender.tellraw('§¶§c§lUAC ► §c§lYou must provide the leaderboard text.')
        const leaderboardText = args[0].replace(/_/g, " ").replace(/\\newln/g, "\n");

        if (sender.hasTag('staffstatus')) {
            //If args 1, 2, 3 are not unndefined use args if they are undefined default at the current player location.
            const x = args[1] !== undefined ? parseInt(args[1]) : sender.location.x;
            const y = args[2] !== undefined ? parseInt(args[2]) : sender.location.y + 1;
            const z = args[3] !== undefined ? parseInt(args[3]) : sender.location.z;

            if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
                writeLeaderboard(leaderboardText, x, y, z);
            } else {
                sender.tellraw(`§¶§c§lUAC ► §c§lYou must provide x, y, z coordinates.`);
            }
            
        } else {
            sender.tellraw(`§¶§c§lUAC ► §c§lThis command is meant for staff only`);
        }
    } catch (error) {
        console.warn(error, error.stack);
    }
});