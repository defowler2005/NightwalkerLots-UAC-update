import { Database, Server } from '../library/Minecraft.js';
import { getGamemode } from '../library/utils/prototype.js';
import { Player, system, world } from '@minecraft/server';

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
        const serverDB = new Database();
        let message_type = playerDB.get('hmmtoggle') || 0;
        let hmm_toggle = serverDB.get('hmmtoggle') || 0;
        let is_frozen = player.hasTag('fzplr');
        let in_vanish = getGamemode(player, 'spectator');
        let plr_suicide = scoreTest(player, 'suicide');
        let unban_window = scoreTest(player, 'unbantimer');

        let playercount = Server.allPlayers.length;
        let entitycount = Server.allEntities.length;

        let kills = scoreTest(player, 'kills');
        let deaths = scoreTest(player, 'deaths');
        let killstreak = scoreTest(player, 'killstreak');
        let money = scoreTest(player, 'money');

        const worldBorderDB = new Database();
        const borderX = parseInt(worldBorderDB.get('wbmtoggle_x'));
        const borderZ = parseInt(worldBorderDB.get('wbmtoggle_z'));

        if (is_frozen) {
            return player.onScreenDisplay.setTitle(
                {
                    "rawtext": [
                        {
                            "text": "§¶§bYOU HAVE BEEN §cFROZEN §bBY AN OPERATOR \n"
                        },
                        {
                            "text": "§¶§bLEAVING MAY RESULT IN A BAN"
                        }
                    ]
                },
                {
                    subtitle: '§¶§bUAC §7[§2v2§7.§28§7] Public §cFROZEN',
                    stayDuration: 20,
                    fadeInDuration: 0,
                    fadeOutDuration: 0
                }
            );
        }
        if (plr_suicide >= 1) {
            return player.runCommandAsync(`function UAC/asset/hotbar_suicidetimer`);
        }
        if (message_type === 0) return;
        if (hmm_toggle === 0) return;
        if (player.hasTag('staffstatus')) {
            if (unban_window >= 1) return player.runCommandAsync(`function UAC/asset/hotbar_unbantimer`);
            if (in_vanish) return player.onScreenDisplay.setTitle(
                {
                    "rawtext": [
                        {
                            "text": `§¶§bPlayers§7: §c${playercount} \n§bEntities§7: §c${entitycount}`
                        }
                    ]
                },
                {
                    subtitle: '§¶§bUAC §7[§2v2§7.§28§7] Public §¶§bVANISH MODE',
                    stayDuration: 20,
                    fadeInDuration: 0,
                    fadeOutDuration: 0
                }
            );
            if (hmm_toggle >= 1) {
                // Player's infobar
                if (hmm_toggle === 1) {
                    return player.onScreenDisplay.setTitle(
                        {
                            "rawtext": [
                                {
                                    "text": `§¶§bKills: §c${kills}§b\n`
                                },
                                {
                                    "text": `Deaths: §c${deaths}§b\n`
                                },
                                {
                                    "text": `Killstreak: §c${killstreak} §b\n`
                                },
                                {
                                    "text": `Money: §c${money}`
                                }
                            ]
                        },
                        {
                            subtitle: '§¶§bUAC §7[§2v2§7.§28§7] Public §aSURVIVAL ENABLED',
                            stayDuration: 20,
                            fadeInDuration: 0,
                            fadeOutDuration: 0
                        }
                    );
                }
                if (getGamemode(player, 'creative')) return player.onScreenDisplay.setTitle(
                    {
                        "rawtext": [
                            {
                                "text": "§d§¶UAC.help §7| §7[§2v2.8.9§7]§b\n"
                            },
                            {
                                "text": `§bEntity Count §7: ${entitycount}\n§bPlayer Count §7: ${playercount}\n§bCurrent Worldborder§7:\nX :${borderX}\nZ: ${borderZ}`
                            }
                        ]
                    },
                    {
                        subtitle: '§¶§bUAC §7[§2v2§7.§28§7] Public §aCREATIVE ENABLED',
                        stayDuration: 20,
                        fadeInDuration: 0,
                        fadeOutDuration: 0
                    }
                );
                if (getGamemode(player, 'spectator')) return player.onScreenDisplay.setTitle(
                    {
                        "rawtext": [
                            {
                                "text": "§¶§dSPECTATOR MODE \n"
                            },
                            {
                                "text": `§¶§bPlayers§7: §c${playercount} §7|| §bEntities§7: §c${entitycount}`
                            }
                        ]
                    },
                    {
                        subtitle: '§¶§bUAC §7[§2v2§7.§28§7] Public',
                        stayDuration: 20,
                        fadeInDuration: 0,
                        fadeOutDuration: 0
                    }
                );
            }
        }
        if (getGamemode(player, 'survival')) {
            //with server
            if (hmm_toggle == 2 && message_type === 2) return player.onScreenDisplay.setTitle(
                {
                    "rawtext": [
                        {
                            "text": `§¶§bPlayers§7: §c${playercount}\n§bEntities§7: §c${entitycount}`

                        }
                    ]
                },
                {
                    subtitle: '§¶§bUAC §7[§2v2§7.§28§7] Public Server',
                    stayDuration: 20,
                    fadeInDuration: 0,
                    fadeOutDuration: 0
                }
            );
        }
    } catch (error) {
        console.error(`Error while processing hotbar_message: ${error}`);
    }
};


system.runInterval(() => { world.getAllPlayers().forEach(plr => hotbar_message(plr)) });
export { hotbar_message };
