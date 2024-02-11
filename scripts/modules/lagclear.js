import { overworld } from '../library/utils/cmd_queue.js';
import { tellrawServer } from '../library/utils/prototype.js';
import { Database, Server } from '../library/Minecraft.js';
import { system } from '@minecraft/server';

let tickPassed = 0;

system.runInterval(() => {
    try {
        const entitycount = Server.allEntities.length;
        //console.warn(`Ticks passed: ${tickPassed}`);
        //console.warn(`Entity count: ${entitycount}`);
        const clearLag = new Database();
        if (entitycount >= 145 && clearLag.get('ltmtoggle') === 1) {
            tickPassed++;

            switch (tickPassed) {
                case 1:
                    tellrawServer(`\n\n§¶§cUAC §¶§b► Clearing Entities in §c5`);
                    break;
                case 2:
                    tellrawServer(`§¶§cUAC §¶§b► Clearing Entities in §c4`);
                    break;
                case 3:
                    tellrawServer(`§¶§cUAC §¶§b► Clearing Entities in §c3`);
                    break;
                case 4:
                    tellrawServer(`§¶§cUAC §¶§b► Clearing Entities in §c2`);
                    break;
                case 5:
                    tellrawServer(`§¶§cUAC §¶§b► Clearing Entities in §c1`);
                    break;
                case 6:
                    overworld.runCommand('gamerule doentitydrops false');
                    overworld.runCommand('difficulty peaceful');
                    overworld.runCommand('kill @e[type=item]');
                    overworld.runCommand('kill @e[type=arrow]');
                    overworld.runCommand('kill @e[type=polar_bear]');
                    overworld.runCommand('kill @e[type=minecraft:area_effect_cloud]');
                    overworld.runCommand('kill @e[type=minecraft:fox]');
                    overworld.runCommand('kill @e[type=minecraft:vex]');
                    overworld.runCommand('effect @a[tag=!staffstatus] clear');
                    overworld.runCommand('scoreboard players reset @a cleararea');
                    overworld.runCommand('scoreboard players reset @a cleararealarge');
                    overworld.runCommand('gamerule doentitydrops true');
                    overworld.runCommand('difficulty hard');
                    overworld.runCommand('tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Entities have been §2cleared"}]}');
                    tickPassed = 0;
                    break;
                default:
                    break;
            }
        }
    } catch (error) {
        console.warn(`An error occurred while clearing lag: ${error}\n${error.stack}`);
    }
}, 20);