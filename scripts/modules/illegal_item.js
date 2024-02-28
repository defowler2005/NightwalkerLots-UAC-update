import { world } from "@minecraft/server";
import { Database, Server } from "../library/Minecraft.js";
import { tellrawServer } from '../library/utils/prototype.js'
import { illegalItems } from "../library/utils/illegal_items.js";

Server.runInterval(() => {
    world.getPlayers({ excludeTags: ['staffstatus'] }).forEach((player) => {
        const inventory = player.getComponent('minecraft:inventory');
        for (let i = 0; i < inventory.inventorySize; i++) {
            const item = inventory.container.getItem(i);
            if (!item) continue;
            if (illegalItems.includes(item.typeId)) {
                const illegalItemFlagsDB = new Database(player);
                const playerWarnings = illegalItemFlagsDB.get('illegalitemban') || 0;
                switch (playerWarnings) {
                    case 0:
                        tellrawServer(`§¶§cUAC ► §6Unobtainable Items §bflagged §d${player.name} §bfor spawning items  §7[§c1§7/§29§7]`);
                        break;
                    case 1:
                        tellrawServer(`§¶§cUAC ► §6Unobtainable Items §bflagged §d${player.name} §bfor spawning items  §7[§c2§7/§29§7]`);
                        break;
                    case 2:
                        tellrawServer(`§¶§cUAC ► §6Unobtainable Items §bflagged §d${player.name} §bfor spawning items  §7[§c3§7/§29§7]`);
                        break;
                    case 3:
                        tellrawServer(`§¶§cUAC ► §6Unobtainable Items §bflagged §d${player.name} §bfor spawning items  §7[§c4§7/§29§7]`);
                        break;
                    case 4:
                        tellrawServer(`§¶§cUAC ► §6Unobtainable Items §bflagged §d${player.name} §bfor spawning items  §7[§c5§7/§29§7]`);
                        break;
                    case 5:
                        tellrawServer(`§¶§cUAC ► §6Unobtainable Items §bflagged §d${player.name} §bfor spawning items  §7[§c6§7/§29§7]`);
                        break;
                    case 6:
                        tellrawServer(`§¶§cUAC ► §6Unobtainable Items §bflagged §d${player.name} §bfor spawning items  §7[§c7§7/§29§7]`);
                        break;
                    case 7:
                        tellrawServer(`§¶§cUAC ► §6Unobtainable Items §bflagged §d${player.name} §bfor spawning items  §7[§c8§7/§29§7]`);
                        break;
                    case 8:
                        tellrawServer(`§¶§cUAC ► §6Unobtainable Items §bflagged §d${player.name} §bfor spawning items  §7[§c9§7/§29§7]`);
                        break;
                    case 9:
                        tellrawServer(`§¶§cUAC ► §bYou have been banned for violating server rules.`);
                        player.addTag('illegalitemban');
                        break;
                    default:
                        break;
                }
                player.runCommand(`playsound note.bass @s ~~~`)
                const currentWarnings = illegalItemFlagsDB.get('illegalitemban') || 0;
                if (currentWarnings >= 9) return;
                illegalItemFlagsDB.set(`illegalitemban`, currentWarnings + 1);
            }
        }
    })
});