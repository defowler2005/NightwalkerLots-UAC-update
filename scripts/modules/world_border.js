import { world, system } from '@minecraft/server';
import { Database } from '../library/Minecraft.js';
import { tellrawServer } from '../library/utils/prototype.js';

system.runInterval(() => {
    const worldBorderDB = new Database();
    /**
     * @property {Number} borderX - The X-coordinate value of the border.
     * @property {Number} borderZ - The Z-coordinate value of the border.
     */
    const borderX = parseInt(worldBorderDB.get('wbmtoggle_x')) - 1;
    const borderZ = parseInt(worldBorderDB.get('wbmtoggle_z')) - 1;

    world.getPlayers().forEach((player) => {
    if (worldBorderDB.get('wbmtoggle') === 0 || player.hasTag('staffstatus')) return;
        const x = Math.floor(player.location.x);
        const z = Math.floor(player.location.z);
        if (x < borderX * -1 || x > borderX || z < borderZ * -1 || z > borderZ) {
            tellrawServer(`§¶§cUAC ► §6World-Border §bdetected §d${player.name} §ctried passing the world border.`)
            player.runCommand('playsound note.bass @a ~ ~ ~');
            player.runCommand('effect @s slow_falling 14 1 true');
            player.teleport({ x: 0, y: 100, z: 0 }, { dimension: player.dimension });
        } else { return; }
    })
});