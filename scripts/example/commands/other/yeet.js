import { Database, Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';

const registerInformation = {
    cancelMessage: true,
    name: 'credit',
    staff: 'false',
    description: 'Shows Credit for UAC',
    usage: '[ credit ]',
    example: [
        'credit'
    ]
};

Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const name = sender.getName();
    if (new Database().get('icmtoggle') === 0)
        return sender.tellraw(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`);

        if (args[0]) {
            tellrawStaff(`§¶§cUAC STAFF ► §e§lYou found a Easter Egg! Hello There. Let this be our little secret ;)`);
        } else {
           let creditString = [];
            creditString.push('§¶§cUAC ► §7[ §bUnity Anti-Cheat §2v2.8.9 §7]');
            creditString.push('§¶§cUAC ► §bCredit to the following people for helping development§7:');
            creditString.push('§¶§cUAC ► §dCarthe123 §7|§d HD Blooms §7|§d MR Patches §7|§d NightwalkerLots §7|§d UnknownCatastrophe');
            creditString.push('§¶§cUAC ► §bCredit to §dxFallen54x §bfor help on framework for the UAC GUI system');
            creditString.push('§¶§cUAC ► §bCredit to §dSmoothie §bfor help on Anti-Crasher');
            creditString.push('§¶§cUAC ► §bCredit to §dSamster 10 §bfrom youtube for letting us reference their AFK system');
            creditString.push('§¶§cUAC ► §bCredit to §dRoman Mender §bfor creating the original base code §7{§c Hydra Anti§7-§cCheat §7}');
            creditString.push('§¶§cUAC ► §bCredit to §dnotbeer §bfor creating the base for the Custom Commands');
            //creditString.push('§¶§cUAC ► §bCredit to §ddefowler2OO5 §bfor fixing/updating §cUAC§b for 1.20.60');
            sender.tellraw(creditString.join('\n§r'));
            tellrawStaff(`§¶§cUAC STAFF ► §d${name} §bused credit command`);
        }
});