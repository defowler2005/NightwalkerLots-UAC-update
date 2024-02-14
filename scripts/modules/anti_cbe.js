import { Player, system, world } from "@minecraft/server";
import { Database } from "../library/Minecraft.js";
import { getGamemode, tellrawServer } from "../library/utils/prototype.js";

system.runInterval(() => {
    world.getAllPlayers().forEach((player) => {
        if (player.hasTag('cbe')) {
            console.warn('CBE!')
            player.runCommand(`kick ${player.name} CBE!`)
        }
    })
});