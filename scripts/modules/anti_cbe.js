import { system, world } from "@minecraft/server";
import { getGamemode, tellrawServer } from "../library/utils/prototype.js";
import { illegalItems } from "../library/utils/illegal_items.js";

system.runInterval(() => {
    world.getAllPlayers().forEach((player) => {
        if (player.hasTag('cbe')) {
            tellrawServer('CBE!')
            //player.runCommand(`kick ${player.name} CBE!`)
        };
    })
});