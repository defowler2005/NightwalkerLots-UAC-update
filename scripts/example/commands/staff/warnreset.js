import { Database, Server } from '../../../library/Minecraft.js';
import { TellRB, tellrawServer, tellrawStaff } from '../../../library/utils/prototype.js';
import { world } from '@minecraft/server';
const overworld = world.getDimension('overworld');
const registerInformation = {
    cancelMessage: true,
    name: 'warnreset',
    staff: 'management',
    description: 'Reset all warns from the selected player',
    usage: '[ @player ]',
    example: [
        'warnreset @player'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    try {

        let input = args.join(' ').replace('@', '').replace(/"/g, '');
        let playerfound = [...world.getPlayers()].find(player => player.getName() === input);
        const { sender } = chatmsg;
        const name = sender.getName();


        if (sender.hasTag('staffstatus')) {
            if (args[0]) {
                if (!playerfound) {
                    return sender.tellraw(`§¶§c§lUAC ► §cPlayer not found`);
                }
                else {
                    const creativeFlagsDB = new Database(playerfound);
                    tellrawStaff(`§l§¶§cUAC STAFF ► §d${playerfound.getName()}'s §bwarns were reset by §d${name}`);
                    creativeFlagsDB.get('creative_flags')
                    TellRB(`flag_0`, `UAC ► ${name} has reset the warns of ${playerfound.getName()}`);
                    creativeFlagsDB.set('creative_flags', 0)
                    tellrawServer(`§¶§cUAC §b► §d${playerfound.name}'s §¶§cwarns were reset by a operator.`);
                }
            } else {
                sender.tellraw(`§¶§c§lUAC ► §cNo player specified`);
            }
        } else {
            return sender.tellraw(`§¶§c§lUAC ► §c§lThis command is meant for staff only`);
        }
    } catch (error) {
        console.warn(error, error.stack);
    }
});
