import { Database, Server } from '../library/Minecraft.js';
import { getGamemode } from '../library/utils/prototype.js';
import { Player, system, world } from '@minecraft/server';

/**
 * 
 * @param {Player} player 
 * @param {String} message 
 * @returns 
 */
function hotbar(player, message) {
    try {
        return player.onScreenDisplay.setActionBar(`${message}`);
    }
    catch { return; }
}

function scoreTest(target, objective) {
    try {
        const oB = world.scoreboard.getObjective(objective)
        if (typeof target == 'string') return oB.getScore(oB.getParticipants().find(pT => pT.displayName == target))
        return oB.getScore(target) === undefined ? 0 : oB.getScore(target);
    } catch (error) {
        //console.warn(error, error.stack);
        return 0;
    }
};

/**
 * 
 * @param {Player} player - The player to be run on.
 */
function hotbar_message(player) {
    try {
        const playerDB = new Database(player);
        let hmm_toggle = playerDB.get('hmmtoggle') || 0;
        let is_frozen = player.hasTag('fzplr');
        let in_vanish = scoreTest(player, 'vnsh');
        let message_type = scoreTest(player, 'hometp');
        let plr_suicide = scoreTest(player, 'suicide');
        let unban_window = scoreTest(player, 'unbantimer');

        let playercount = Server.allPlayers.length;
        let entitycount = Server.allEntities.length;

        let kills = scoreTest(player, 'kills');
        let deaths = scoreTest(player, 'deaths');
        let killstreak = scoreTest(player, 'killstreak');
        let money = scoreTest(player, 'money');

        if (is_frozen) {
            return hotbar(player, `§¶§bYOU HAVE BEEN §cFROZEN §bBY AN OPERATOR \n §¶§bLEAVING MAY RESULT IN A BAN`);
        }
        if (plr_suicide >= 1) {
            return player.runCommandAsync(`function UAC/asset/hotbar_suicidetimer`);
        }

        if (player.hasTag('staffstatus')) {
            if (unban_window >= 1) {
                return player.runCommandAsync(`function UAC/asset/hotbar_unbantimer`);
            }
            if (in_vanish) {
                return hotbar(player, `§¶§d        VANISH MODE \n §¶§bPlayers§7: §c${playercount} §7|| §bEntities§7: §c${entitycount}`);
            }
            if (hmm_toggle >= 1) {
                if (getGamemode(player, 'creative')) {
                    player.runCommandAsync(`function UAC/asset/hotbar_creative`);
                }
                if (getGamemode(player, 'spectator')) {
                    return hotbar(player, `§¶§d      SPECTATOR MODE \n §¶§bPlayers§7: §c${playercount} §7|| §bEntities§7: §c${entitycount}`);
                }
            }
        }; //console.warn(hmm_toggle);
        if (getGamemode(player, 'survival')) {
            switch (hmm_toggle) {
                case 1:
                    return hotbar(player, `         §¶§bUAC §7[§2v2§7.§28§7.§27§7] Public \n §¶§bkills§7: §c${kills} §7| §bdeaths§7: §c${deaths} §7| §bkillstreak§7: §c${killstreak} §7| §c$ ${money}`);
                case 2:
                    return hotbar(player, `     §¶§bUAC §7[§2v2§7.§28§7] Public \n §¶§bPlayers §7: §c${playercount} §7|| §bEntities §7 : §c${entitycount}`);
                case 3:
                    return player.onScreenDisplay.setTitle(`§¶§bCurrent Version §7[§2v2.8.9§7] \n\n§6Self Stats \n§¶§bKills §7: §c${kills}\n§bDeaths §7: §c${deaths}\n§bCurrent Killstreak §7: §c${killstreak}\n§bMoney §7: §c$${money}\n§¶§bDeath Coords: §g §c${scoreTest(player, `X_Coord_D`)}§g/§c${scoreTest(player, `Y_Coord_D`)}§g/§c${scoreTest(player, `Z_Coord_D`)}\n§bTime played: §gd/§c${scoreTest(player, `timeplayedday`)}§g h/§c${scoreTest(player, `timeplayedhr`)}§g m/§c${scoreTest(player, `timeplayedmin`)}§g s/§c${scoreTest(player, `timeplayedsec`)}§g t/§c${scoreTest(player, `timeplayedtick`)}§g\n\n§6Server Stats\n§bPlayerCount §7: §c${playercount}\n§bEntityCount §7: §c${entitycount}`);
                case 0:
                    if (message_type == 1337) {
                        return hotbar(player, `         §¶§bUAC §7[§2v2§7.§28§7] Public \n §¶§bkills§7: §c${kills} §7| §bdeaths§7: §c${deaths} §7| §bkillstreak§7: §c${killstreak} §7| §c$ ${money}`);
                    }
                    if (message_type == 420) {
                        return hotbar(player, `§¶§bUAC §7[§2v2§7.§28§7.§27§7] Public`);
                    }
                    break;
                default:
                    console.warn(`Invalid hmm_toggle value: ${hmm_toggle}`);
                    break;
            }
        }
    } catch (error) {
        console.warn(`Error while displaying hotbar_message: ${error}\n${error.stack}`);
    }
};


system.runInterval(() => { world.getAllPlayers().forEach(plr => hotbar_message(plr)) });
export { hotbar_message };