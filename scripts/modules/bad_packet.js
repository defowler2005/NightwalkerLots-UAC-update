import { Player, world } from '@minecraft/server';
import { tellrawServer, tellrawStaff, TellRB, tp } from '../library/utils/prototype';
import { scoreTest } from '../library/utils/score_testing';
import { Database } from '../library/Minecraft';

/**
 * 
 * @param {Player} player
 */
function Check_Packet_Behavior(player) {
    try {
        // Check for module bool
        // Skip staff & module disable
        // player.onScreenDisplay.setActionBar(`${player.getComponent("minecraft:breathable").suffocateTime}`);
        if (player.hasTag(`staffstatus`)) return;
        if (new Database().get('pkdummy') === 0) return;
        let { x, y, z } = player.location;

        let p_speed = player.getComponent("minecraft:movement");
        let name = player.getName();
        let p_velocity = player.getVelocity();
        const xyVelocity = Math.hypot(p_velocity.x, p_velocity.y).toFixed(4)
        const zyVelocity = Math.hypot(p_velocity.z, p_velocity.y).toFixed(4)

        // Invalid slot
        if (player.selectedSlot < 0 || player.selectedSlot > 8) {
            tellrawStaff(`§¶§cUAC §6Bad Packet §b► §d${name} §¶§bflaged for selected slot of §c${player.selectedSlot}`);
            TellRB(`flag_1`, `UAC Bad Packet ► ${name} flaged for selected slot of ${player.selectedSlot}`);
        }

        // Anti tp
        if (xyVelocity > 7.88 || zyVelocity > 7.88) {
            let { x, y, z } = player.location;
            
            tellrawStaff(`§¶§cUAC STAFF §6Bad Packet §b► §d${name} §¶§bflaged for Teleporting to\nX§7: §c${x}  §bZ§7: §c${z}`);
            TellRB(`flag_1`, `UAC Bad Packet ► ${name} flaged for invalid Position Spoof to x: ${x}  zV: ${z}`);
            p_speed.resetToDefaultValue();
            tp(player, x, y, z);  // Teleport back.
            return;
        }

        // Invalid speed
        if (p_speed.current >= `0.185`) {
            let i = false;
            if (i == false) {
                tellrawStaff(`§¶§cUAC STAFF §6Bad Packet §b► §d${name} §¶§bflaged for speed §7: §c${p_speed.current}`);
                TellRB(`flag_1`, `UAC Bad Packet ► ${name} flaged for invalid speed : ${p_speed.current}`);
                tellrawServer(`§¶§cUAC STAFF §6Bad Packet §b► §d${name} §¶§bflaged for speed §7: §c${p_speed.current}`)
                i = true;
                p_speed.resetToDefaultValue();
                if (p_speed.current == `0.100000000149011612`) { i = false; }
            }
        }
        if (xyVelocity >= 2.88 || zyVelocity >= 2.88) {
            
            // Log player's coordinates with velocity before canceling momentum
            world.sendMessage(`§¶§cUAC STAFF §6Bad Packet §b► §d${name} §¶§bflaged for Velocity\nxV§7: §c${xyVelocity}  §bzV§7: §c${zyVelocity}`)
            tellrawStaff(`§¶§cUAC STAFF §6Bad Packet §b► §d${name} §¶§bflaged for Velocity\nxV§7: §c${xyVelocity}  §bzV§7: §c${zyVelocity}`);
            TellRB(`flag_1`, `UAC Bad Packet ► ${name} flaged for invalid Velocity xV: ${xyVelocity}  zV: ${zyVelocity}`);
            // player.setVelocity(Vector.zero);
            p_speed.resetToDefaultValue();
            player.teleport({ x, y, z}, { dimension: player.dimension})  // Cancel player momentum.
        }
    } catch (e) { console.warn(JSON.stringify(e.stack), e); }
}

export { Check_Packet_Behavior };