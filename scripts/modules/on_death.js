import { world } from "@minecraft/server";
import { Database } from "../library/Minecraft.js";

world.afterEvents.entityDie.subscribe((data) => {
    const killer = data?.damageSource?.damagingEntity;
    const dead = data.deadEntity;
    try {
        if (dead.typeId == 'minecraft:player') {
            dead.runCommand('scoreboard players set @s hometimer 17');
            dead.runCommand('tag @s remove home');
            dead.runCommand('scoreboard players add @s deaths 1');
            killer?.runCommand('scoreboard players add @s kills 1');
            killer?.runCommand('scoreboard players add @s killstreak 1');
            killer?.runCommand(`execute as @s[scores={killstreak=10..}] run tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" Has lost their killstreak!"}]}`);
            dead.runCommand('scoreboard players operation @s X_Coord_D = @s X_Coordinate');
            dead.runCommand('scoreboard players operation @s Y_Coord_D = @s Y_Coordinate');
            dead.runCommand('scoreboard players operation @s Z_Coord_D = @s Z_Coordinate');
            const deathEfects = new Database();
            if (deathEfects.get('dethtoggle') === 0) return;
            dead.runCommand('summon lightning_bolt ~~3~');
            dead.runCommand('scoreboard players reset @s timealive');
            dead.runCommand('function particle/totem_poof');
            dead.runCommand('execute as @a[r=8] run playsound random.levelup @s ~~~ 2');
        } //else console.warn(`Entity ${dead.typeId} is not a player.`);
    } catch (error) {
        console.warn(`Error while processing the death of ${dead.nameTag}: ${error}\n${error.stack}`)
    }
});