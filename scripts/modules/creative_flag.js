import { Player } from "@minecraft/server";
import { Database } from "../library/Minecraft.js";
import { getGamemode, tellrawServer } from "../library/utils/prototype.js";

/**
 * 
 * @param {Player} player 
 * @returns {void}
 */
function creative_flag(player) {
    const actoggle = new Database();

    //console.warn(`Staff: ${player.hasTag('staffstatus')} Gamemode: ${getGamemode(player, 'creative')} ACToggle ${parseInt(actoggle.get('actoggle'))}`)

    if (!player.hasTag('staffstatus') && getGamemode(player, 'creative') === 1 && parseInt(actoggle.get('actoggle')) === 1) {
        const creativeFlagsDB = new Database(player);
        let creative_flags = parseInt(creativeFlagsDB.get('creative_flags')) || 0;

        switch (creative_flags) {
            case 0:
                tellrawServer(`§¶§cUAC ► §d${player.name} §¶§bhas been flagged for §cCREATIVE MODE §7[§c1§7/§24§7]`);
                break;
            case 1:
                tellrawServer(`§¶§cUAC ► §d${player.name} §¶§bhas been flagged for §cCREATIVE MODE §7[§c2§7/§24§7]`);
                break;
            case 2:
                tellrawServer(`§¶§cUAC ► §d${player.name} §¶§bhas been flagged for §cCREATIVE MODE §7[§c3§7/§24§7]`);
                break;
            case 3:
                tellrawServer(`§¶§cUAC ► §d${player.name} §¶§bhas been flagged for §cCREATIVE MODE §7[§c4§7/§24§7]`);
                break;
            case 4:
                player.addTag('creativeBan');
                tellrawServer(`§¶§cUAC ► §d${player.name}§b's §¶§cgameplay has been restricted due to changing gamemodes`);
                break;
            default:
                break;
        }
        player.runCommand(`playsound note.bass @s ~~~`)
        player.runCommand('gamemode s');
        player.kill();
        if (creative_flags >= 4) return;
        creative_flags++;
        creativeFlagsDB.set('creative_flags', creative_flags);
    } else return;
};

export { creative_flag };