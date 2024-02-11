import { Player } from "@minecraft/server";
import { Database } from "../library/Minecraft";
import { getGamemode, tellrawServer } from "../library/utils/prototype.js";

/**
 * 
 * @param {Player} player 
 * @returns {Void}
 */
function creative_flag(player) {
    if (!player.hasTag('staffstatus') && getGamemode(player, 'creative')) {
        const creativeFlagsDB = new Database(player);
        let creative_flags = parseInt(creativeFlagsDB.get('creative_flags'));

        switch (creative_flags) {
            case 0:
                tellrawServer(`${player.name} §¶§bhas been flagged for §cCREATIVE MODE §7[§c1§7/§24§7]`);
                break;
            case 1:
                tellrawServer(`${player.name} §¶§bhas been flagged for §cCREATIVE MODE §7[§c2§7/§24§7]`);
                break;
            case 2:
                tellrawServer(`${player.name} §¶§bhas been flagged for §cCREATIVE MODE §7[§c3§7/§24§7]`);
                break;
            case 3:
                tellrawServer(`${player.name} §¶§bhas been flagged for §cCREATIVE MODE §7[§c4§7/§24§7]`);
                break;
            case 4:
                player.addTag('creativeBan')
                tellrawServer(`§¶§cUAC ► §d ${player.name}§b's §¶§cgameplay has been restricted due to changing gamemodes`);
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
    }
};

export { creative_flag };