import '../library/utils/prototype.js';
import './commands/import-commands.js';  //all player chat commands

//external module functions
import { unobtainable } from '../modules/unobtainable.js';
import { playerbans } from '../modules/bans.js';
import { ops } from '../modules/oneplayersleep.js';
import '../modules/lagclear.js';
import '../modules/on_death.js';
import '../modules/anti_cbe.js';
import '../modules/illegal_item.js';
import { movement_check } from '../modules/movement.js';
import { waitMove } from './commands/staff/gui.js';
import { hotbar_message } from '../modules/hotbar_message.js';
import { op_abuse } from '../modules/opabuse.js';
import '../modules/world_border.js';
import { afk_kick } from '../modules/afk_kick.js';
import { Check_Packet_Behavior } from '../modules/bad_packet.js';
//game resource dependancies
import { tellrawStaff, tellrawServer, TellRB, getGamemode } from '../library/utils/prototype.js';
import { world, Player, system, BlockPermutation } from '@minecraft/server';
import { Database, Server } from '../library/Minecraft.js';
import '../library/miscellaneous/chatrank.js';
import { creative_flag } from '../modules/creative_flag.js';
import { getDefaultScoreboard, writeLeaderboard } from '../library/miscellaneous/leaderboard.js';
import { illegalItem } from '../modules/illegal_item.js';

function scoreTest(target, objective) {
    try {
        const oB = world.scoreboard.getObjective(objective)
        if (typeof target == 'string') return oB.getScore(oB.getParticipants().find(pT => pT.displayName == target))
        return oB.getScore(target.scoreboard)
    } catch (error) {
        //console.warn( JSON.stringify(e.stack), e)
    }
};

//const overworld = world.getDimension('overworld');

function worldBorder(player) {
    const { x, y, z } = player.location;
    const name = player.getName();
    if (Math.abs(x) >= 30000000 || Math.abs(y) >= 30000000 || Math.abs(z) >= 30000000) {
        player.runCommandAsync(`tp @s 0 900 0`);
        tellrawStaff(`§¶§cUAC STAFF STAFF ► §6Anti-Crasher §bCrash attempt was prevent from §d${name}`);
        TellRB(`flag_1`, `UAC SYSTEM ► Crash was prevented from ${name}`);
        //player.runCommandAsync("kill @s");
        try { player.runCommandAsync(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lCrash Attempt`); }
        catch { player.runCommandAsync(`event entity @s uac:ban_main`); }
        //return;

        //Anti-Crasher contributed by SmoothieMC
    }
};

/*
░░████░░░████░░████████░░████████░░░░░░░
░░████░░░████░░███░░███░░████████░░░░░░░
░░████░░░████░░████████░░███░░░░░░░░░░░░ <3
░░████░░░████░░███░░███░░████████░░░░░░░
░░███████████░░███░░███░░████████░░░░░░░
*/

let on_tick = 0;

Server.runInterval(() => {
    try {
        on_tick++;

        let uoimbool = scoreTest('uoimtoggle');
        let opsbool = scoreTest('opsdummy', 'opstoggle');
        let opabuse_bool = scoreTest('opamtoggledummy', 'opamtoggle');

        if (uoimbool == 1) { unobtainable(); }

        if (on_tick == 10) {
            if (opsbool) { ops(); }
        }

        // one second module functions -- 2nd schedual  -- ran from backend not players
        if (on_tick >= 20) {
            let players = world.getPlayers();
            for (let player of players) {
                const name = player.getName();
                worldBorder(player);
                playerbans(player);
                hotbar_message(player);
                movement_check(player);
                creative_flag(player);
                afk_kick(player);
                if (opabuse_bool) { op_abuse(player) }
                //Namespoof patch provided by the Paradox Team.
                let char_length = player.nameTag;
                for (let i = 0; i < char_length.length; i++) {
                    if (char_length.charCodeAt(i) > 255) {
                        console.warn(`Illegal bytes outside the UTF-8 range`);
                        tellrawStaff(`§¶§cUAC STAFF STAFF ► §6Anti-NameSpoof §bBypass was prevented from §d${name}`);
                        TellRB(`flag_1`, `UAC SYSTEM ► ${name} was kicked for namespoofing`);
                        try { player.runCommandAsync(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lInvalid GamerTag`); }
                        catch { player.runCommandAsync(`event entity @s uac:ban_main`); }
                    }; //console.warn(`Everything appears normal`);
                }
            }; on_tick = 0;
        }
        for (let player of world.getPlayers()) {
            Check_Packet_Behavior(player);
            illegalItem(player);
        }
        if (new Database().get('lbdtoggle') === 1) {
            const leaderboardCordX = parseInt(getDefaultScoreboard().x);
            const leaderboardCordY = parseInt(getDefaultScoreboard().y);
            const leaderboardCordZ = parseInt(getDefaultScoreboard().z);
            world.getDimension('overworld').spawnParticle('uac:title_icon', { x: leaderboardCordX, y: leaderboardCordY + 3, z: leaderboardCordZ });
        }
    } catch (error) {
        console.warn(`Error while running the main section: ${error}\n$${error.stack}`);
    }
});

Server.runInterval(() => {
    writeLeaderboard();
}, 9);

Server.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        if (player.hasTag('fzplr')) {
            if (player.hasTag('staffstatus')) { return player.removeTag('fzplr'); }
            player.teleport({ x: player.location.x, y: player.location.y, z: player.location.z }, { dimension: player.dimension });
        }
    }
});

const unobtainables = {
    'minecraft:flowing_lava': 0,
    'minecraft:lava': 0,
    'minecraft:flowing_water': 0,
    'minecraft:water': 0,
    'minecraft:lit_redstone_lamp': 0,
    'minecraft:pistonarmcollision': 0,
    'minecraft:tripwire': 0,
    'minecraft:powered_comparator': 0,
    'minecraft:fire': 0,
    'minecraft:lit_furnace': 0,
    'minecraft:lit_redstone_ore': 0,
    'minecraft:unlit_redstone_torch': 0,
    'minecraft:portal': 0,
    'minecraft:powered_repeater': 0,
    'minecraft:invisiblebedrock': 0,
    'minecraft:end_gateway': 0,
    'minecraft:end_portal': 0,
    'minecraft:end_portal_frame': 0,
    'minecraft:structure_void': 0,
    'minecraft:chalkboard': 0,
    'minecraft:bubble_column': 0,
    'minecraft:lit_smoker': 0,
    'minecraft:lava_cauldron': 0,
    'minecraft:jigsaw': 0,
    'minecraft:lit_blast_furnace': 0,
    'minecraft:light_block': 0,
    'minecraft:stickypistonarmcollision': 0,
    'minecraft:soul_fire': 0,
    'minecraft:lit_deepslate_redstone_ore': 0,
    'minecraft:camera': 0,
    'minecraft:allow': 0,
    'minecraft:deny': 0,
    'minecraft:bedrock': 0,
    'minecraft:barrier': 0,
    'minecraft:border_block': 0,
    'minecraft:structure_block': 0,
    'minecraft:glowingobsidian': 0,
    'minecraft:glow_stick': 0,
    'minecraft:netherreactor': 0,
    'minecraft:info_update': 0,
    'minecraft:glowingobsidian': 0,
};

world.beforeEvents.playerPlaceBlock.subscribe(({ block, player }) => {
    // made originally by frost, and perfected by nightwakerlots
    const uoimbool = parseInt(new Database().get('uoimtoggle'));
    system.run(() => {//illegalitemwarn.
        const x = Math.floor(player.location.x);
        const y = player.location.y;
        const z = Math.floor(player.location.z);
        if (block.type.id in unobtainables && uoimbool === 1 && player.hasTag(`staffstatus`) === false) {
            TellRB(`flag_1`, `UAC Unobtainable Items ► ${player.nameTag} tried to place ${block.type.id.replace('minecraft:', '')} at ${x} ${y} ${z}`);
            tellrawStaff(`§l§¶§cUAC STAFF ► §6Unobtainable Items §bBlock Placement Flag \nBlock Type §7: §c${block.type.id.replace('minecraft:', '')} §bBlock Placer §7: §c${player.nameTag} §bLocation §7: §c${x} ${y} ${z}`);
            const type = block.type.id.replace('minecraft:', '');
            block.setPermutation(BlockPermutation.resolve('minecraft:air'));
            tellrawServer(`§¶§c§lUAC ► §6Unobtainable Items §d${player.nameTag} §bwas temp-kicked for having §c${type}`);
            player.runCommandAsync(`clear @s`);
            try { player.runCommandAsync(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lUnobtainable Items | ${type}`); }
            catch { player.runCommandAsync(`event entity @s uac:ban_main`); }
        }
    })
});

world.beforeEvents.itemUseOn.subscribe((eventData) => {
    let item = eventData.itemStack.typeId;
    let name = eventData.source.nameTag;
    let by_player = undefined;
    let p = world.getPlayers();
    for (let i of p) {
        const p_name = i.getName();
        if (!p_name.match(name)) {
            by_player = false;
        } else {
            by_player = true;
        }
    }
    if (!by_player) return;
    if (eventData.source.hasTag('staffstatus')) return;
});

world.afterEvents.playerSpawn.subscribe((data) => {
    let player = data.player;
    let { x, y, z } = player.location;

    try {
        const unbantoggle = new Database();
        if (unbantoggle.get('ubwtoggle') === 0) {
            playerbans(player);
        }

        const playersNumberDB = new Database();
        if (!player.hasTag('welcomed')) {
            let playersNumber = parseInt(playersNumberDB.get('playersNumber')) + 1;
            system.runTimeout(() => { player.runCommand('playsound random.levelup @s ~~~ 2'); }, 50)
            tellrawServer(`§¶§cUAC §b► §d${player.name} §¶§bis new! We're now at §6${playersNumber} §bmembers.`);
            playersNumberDB.set('playersNumber', playersNumber);
            player.addTag('welcomed');
            if (!player.hasTag('seen_gui')) {
                waitMove.set(player, [x, y, z]);
            }
        };
    } catch (error) {
        console.error("Error:", error);
    }
});

//  chat filter example code.
world.beforeEvents.chatSend.subscribe((data) => {
    try {
        const currentTime = Date.now();
        const lastMessageTime = new Database(data.sender).get('lastMessageTime') || 0;
        const acstoggle = new Database().get('acstoggle');
        const timeDifference = currentTime - lastMessageTime;
        const cooldownPeriod = 5000;
        if (acstoggle === 0) return;
        if (data.sender.hasTag('staffstatus')) return;
        if (timeDifference < cooldownPeriod) {
            data.cancel = true;
            return data.sender.tellraw(`§¶§cUAC ► §6Anti-ChatSpam §bPlease wait 5 seconds before sending another message.`);
        }

        if (data.sender.hasTag('muted')) {
            (data.cancel = true);
            data.sender.tellraw(`§¶§c§lUAC ► §bYou are currently muted.`);
            return;
        };
        new Database(data.sender).set('lastMessageTime', currentTime);
    } catch (error) {
        return console.warn(`${error}, ${error.stack}`);
    }
});

/** 
 * The log of the players' break times
 * @type {Object<string, number>}
 */
const log = {};

/**
 * Allow staff to be whitelisted
 * @type {String}
 */
const byPassTag = "staffstatus";
let alert = 0;
const ores = [
    'minecraft:ancient_debris',
    'minecraft:diamond_ore',
    'minecraft:deepslate_diamond_ore',
    'minecraft:emerald_ore',
    'minecraft:deepslate_emerald_ore',
    'minecraft:deepslate_redstone_ore',
    'minecraft:lapis_ore',
    'minecraft:deepslate_lapis_ore',
    'minecraft:gold_ore',
    'minecraft:deepslate_gold_ore',
    'minecraft:iron_ore',
    'minecraft:deepslate_iron_ore',
];

world.beforeEvents.playerBreakBlock.subscribe(({ block, dimension, player }) => {
    let { x, y, z } = block.location;
    const old = log[player.name];
    let playername = player.nameTag;
    let blockname = block.type.id;
    log[player.name] = Date.now();
    const togglesForLoggingBlockbreaks = new Database();
    const mdmtoggle = togglesForLoggingBlockbreaks.get('mdmtoggle');
    const diamond_notiv = togglesForLoggingBlockbreaks.get('diamondmd');
    const emerald_notiv = togglesForLoggingBlockbreaks.get('emeraldmd');
    const gold_notiv = togglesForLoggingBlockbreaks.get('goldmd');
    const iron_notiv = togglesForLoggingBlockbreaks.get('ironmd');
    const lapiz_notiv = togglesForLoggingBlockbreaks.get('lapizmd');
    const nether_notiv = togglesForLoggingBlockbreaks.get('scrapmd');
    if (mdmtoggle === 0) return;
    // Mining Detection.
    if (ores.includes(blockname)) {
        system.run(() => {
            if (blockname.replace('deepslate_', '') == 'minecraft:diamond_ore') {
                player.runCommand(`scoreboard players add @s diamond_ore 1`);
                const playerDiamond = world.scoreboard.getObjective('diamond_ore')
                if (diamond_notiv === 1) { tellrawStaff(`§l§¶§cUAC ► §6Mining Detection §d§l${playername} §bmined §c${blockname.replace('minecraft:', '')} §bat §c${x} ${y} ${z}. §bTotal §7: §c${playerDiamond.getScore(player.scoreboardIdentity)}`); }
            }
            if (blockname.replace('deepslate_', '') == 'minecraft:emerald_ore') {
                player.runCommand(`scoreboard players add @s emerald_ore 1`);
                const playerEmerald = world.scoreboard.getObjective('emerald_ore')
                if (emerald_notiv === 1) { tellrawStaff(`§l§¶§cUAC ► §6Mining Detection §d§l${playername} §bmined §c${blockname.replace('minecraft:', '')} §bat §c${x} ${y} ${z}. §bTotal §7: §c${playerEmerald.getScore(player.scoreboardIdentity)}`); }
            }
            if (blockname.replace('deepslate_', '') == 'minecraft:gold_ore') {
                player.runCommand(`scoreboard players add @s gold_ore 1`);
                const playerGold = world.scoreboard.getObjective('gold_ore')
                if (gold_notiv === 1) { tellrawStaff(`§l§¶§cUAC ► §6Mining Detection §d§l${playername} §bmined §c${blockname.replace('minecraft:', '')} §bat §c${x} ${y} ${z}. §bTotal §7: §c${playerGold.getScore(player.scoreboardIdentity)}`); }
            }
            if (blockname.replace('deepslate_', '') == 'minecraft:iron_ore') {
                player.runCommand(`scoreboard players add @s iron_ore 1`);
                const playerIron = world.scoreboard.getObjective('iron_ore')
                if (iron_notiv === 1) { tellrawStaff(`§l§¶§cUAC ► §6Mining Detection §d§l${playername} §bmined §c${blockname.replace('minecraft:', '')} §bat §c${x} ${y} ${z}. §bTotal §7: §c${playerIron.getScore(player.scoreboardIdentity)}`); }
            }
            if (blockname.replace('deepslate_', '') == 'minecraft:lapis_ore') {
                player.runCommand(`scoreboard players add @s lapis_ore 1`);
                const playerLapis = world.scoreboard.getObjective('lapis_ore')
                if (lapiz_notiv === 1) { tellrawStaff(`§l§¶§cUAC ► §6Mining Detection §d§l${playername} §bmined §c${blockname.replace('minecraft:', '')} §bat §c${x} ${y} ${z}. §bTotal §7: §c${playerLapis.getScore(player.scoreboardIdentity)}`); }
            }
            if (blockname == 'minecraft:ancient_debris') {
                player.runCommand(`scoreboard players add @s ancient_debris 1`);
                const playerNether = world.scoreboard.getObjective('ancient_debris')
                if (nether_notiv === 1) { tellrawStaff(`§l§¶§cUAC ► §6Mining Detection §d§l${playername} §bmined §c${blockname.replace('minecraft:', '')} §bat §c${x} ${y} ${z}. §bTotal §7: §c${playerNether.getScore(player.scoreboardIdentity)}`); }
            }
        })
    }

    //Anti-Nuker
    if (old < Date.now() - 15 || player.hasTag(byPassTag)) return;
    alert++
    if (alert == 1) return;
    if (alert == 250) {
        alert = 0;
        tellrawStaff(`§l§¶§cUAC ► §6Anti-Nuker §btemp kicked §d${player.getName()} §bfor Nuker Attempt`);
        try { player.runCommand(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lNuker Attempt`); }
        catch { player.runCommand(`event entity @s uac:ban_main`); };
    }
    dimension
        .getBlock(block.location)
        .setPermutation(block.setPermutation(block.type.id));
    dimension
        .getEntitiesAtBlockLocation(block.location)
        .filter((entity) => entity.id === "minecraft:item")
        .forEach((item) => item.kill());
});

world.afterEvents.playerLeave.subscribe((data) => delete log[data.playerName]);

system.beforeEvents.watchdogTerminate.subscribe((beforeWatchdogTerminate) => {
    // We try to stop any watchdog crashes incase malicous users try to make the scripts lag
    // and causing the server to crash
    TellRB(`ban`, `UAC SYSTEM ► Prevented a WatchDog Termination. This could be triggered when scripting memory is high!`);
    tellrawStaff(`§l§¶§cUAC STAFF ► §6SYSTEM §c§lPrevented WatchDog Termination`);
    beforeWatchdogTerminate.cancel = true;
});