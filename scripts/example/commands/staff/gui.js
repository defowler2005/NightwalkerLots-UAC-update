import { Player, system, world } from '@minecraft/server';
import { Database, Server } from '../../../library/Minecraft.js';
import { ActionFormData, ModalFormData } from '@minecraft/server-ui';
import { setScore } from '../../../library/utils/score_testing.js';
import { tellrawStaff, getGamemode } from '../../../library/utils/prototype.js';
const obj = 'UNDEFINED'

function scoreTest(target, objective) {
    try {
        const oB = world.scoreboard.getObjective(objective)
        if (typeof target == 'string') return oB.getScore(oB.getParticipants().find(pT => pT.displayName == target))
        return oB.getScore(target)
    } catch (error) {
        return 0;
    }
};

const moduleDefs_prots = [
    {
        mname: 'Anti-Fly',
        name: 'afmtoggle',
        toggle: ['§cOFF', '§aON']
    },
    {
        mname: 'Anti-Lore',
        name: 'almdummy',
        toggle: ['§cOFF', '§aON']
    },
    {
        mname: 'Anti-Reach',
        name: 'armtoggle',
        toggle: ['§cOFF', '§aON']
    },
    {
        mname: 'Item Ban',
        name: 'ibmtoggle',
        toggle: ['§cOFF', '§aON']
    },
    {
        mname: 'Anti-Creative',
        name: 'actoggle',
        toggle: ['§cOFF', '§aON']
    },
    {
        mname: 'Mining Detection',
        name: 'mdmtoggle',
        toggle: ['§cOFF', '§aON']
    },
    {
        mname: 'Movement Check',
        name: 'pkdummy',
        toggle: ['§cOFF', '§aON']
    },
    {
        mname: 'Unobtainable Items',
        name: 'uoimtoggle',
        toggle: ['§cOFF', '§aON']
    }
];

const moduleDefs_util = [
    {
        mname: 'AFK Kick',
        name: 'afkdummy',
        toggle: ['§cOFF', '§aON']
    },
    {
        mname: 'Anti CLog',
        name: 'clmtoggle',
        toggle: ['§cOFF', '§aKILL', '§aCLEAR']
    },
    {
        mname: 'Anti ChatSpam',
        name: 'acstoggle',
        toggle: ['§cOFF', '§aON']
    },
    {
        mname: 'Anti-EnderChest',
        name: 'nemtoggle',
        toggle: ['§cOFF', '§aON']
    },
    {
        mname: 'Bottom Bedrock',
        name: 'bbmtoggle',
        toggle: ['§cOFF', '§aON']
    },
    {
        mname: 'Chat Ranks',
        name: 'crdtoggle',
        toggle: ['§cOFF', '§aON']
    },
    {
        mname: 'Unban Window',
        name: 'ubwtoggle',
        toggle: ['§cOFF', '§aON']
    },
    {
        mname: 'Death Toggle',
        name: 'dethtoggle',
        toggle: ['§cOFF', '§aON']
    },
    {
        mname: 'Hotbar Message',
        name: 'hmmtoggle',
        toggle: ['§cOFF', '§aPlayer operatable', 'Server Mode', '§aResourcePack Mode'],
    },
    {
        mname: 'Lag Clear',
        name: 'ltmtoggle',
        toggle: ['§cOFF', '§aON']
    },
    {
        mname: 'Player Commands',
        name: 'icmtoggle',
        toggle: ['§cOFF', '§aON']
    },
    {
        mname: 'Mining Detection',
        name: 'mdmtoggle',
        toggle: ['§cOFF', '§aON'],
    },
    {
        mname: 'One Player Sleep',
        name: 'opstoggle',
        toggle: ['§cOFF', '§aON']
    },
    {
        mname: 'Random Spawn',
        name: 'rsmtoggle',
        toggle: ['§cOFF', '§aON']
    },
    {
        mname: 'RealmBot Flag Relay',
        name: 'rbflagtoggle',
        toggle: ['§cOFF', '§aON']
    },
    {
        mname: 'Time Played',
        name: 'tpmtoggle',
        toggle: ['§cOFF', '§aON']
    },
    {
        mname: 'World Border',
        name: 'wbmtoggle',
        toggle: ['§cOFF', '§aON']
    }
];

const itembanDefs = [
    { mname: 'Harming Arrow', obj: 'BNA', name: 'BNAdummy' },
    { mname: 'Book and Quill', obj: 'BNBQ', name: 'BNBQdummy' },
    { mname: 'Crossbow', obj: 'BNCB', name: 'BNCBdummy' },
    { mname: 'Maps', obj: 'BNM', name: 'BNMdummy' },
    { mname: 'Shulkerboxes', obj: 'BNSB', name: 'BNSBdummy' },
    { mname: 'TNT', obj: 'BNTN', name: 'BNMTNummy' },
    { mname: 'Trident', obj: 'BNTD', name: 'BNMTDummy' }
];

const oreBanDefs = [
    { mname: 'Diamond', obj: 'diamondmd' },
    { mname: 'Emerald', obj: 'emeraldmd' },
    { mname: 'Gold', obj: 'goldmd' },
    { mname: 'Iron', obj: 'ironmd' },
    { mname: 'Lapis', obj: 'lapizmd' },
    { mname: 'Netherite', obj: 'scrapmd' }
];

const kitDefs = [
    { mname: 'Netherite', structure: 'AdminNether' },
    { mname: 'ULegitNetherite', structure: 'AdminUnbreakableNetherlegit' },
    { mname: 'U32kNetherite', structure: 'AdminUnbreakableNether32k' },
    { mname: 'Diamond', structure: 'AdminDiamond' },
    { mname: 'ULegitDiamond', structure: 'AdminUnbreakableDiamondLegit' },
    { mname: 'U32kDiamond', structure: 'AdminUnbreakableDiamond32k' },
    { mname: 'Iron', structure: 'AdminIron' },
    { mname: 'ULegitIron', structure: 'AdminUnbreakableironlegit' },
    { mname: 'U32kIron', structure: 'AdminUnbreakableiron32k' },
];

const particleDefs = [
    { mname: 'Explode', fn: 'explode' },
    { mname: 'Nether Poof', fn: 'nether_poof_small' },
    { mname: 'Nether Poof Small', fn: 'nether_poof' },
    { mname: 'Totem Poof', fn: 'totem_poof' },
];

/** @type { (plr: Player, module: typeof moduleDefs_prots[number], newValue?: number) => void } */

function setModule(plr, module, newValue) {
    try {
        const db = new Database();
        const currentValue = db.get(module.name);

        if (newValue !== currentValue || newValue === null) {
            if (newValue === null) {
                newValue = (currentValue + 1) % module.toggle.length;
            }
            if (newValue >= 0 && newValue < module.toggle.length) {
                db.set(module.name, newValue);
                for (const id of module.name) {
                    db.set(id, newValue);
                }; tellrawStaff(`§¶§cUAC STAFF ► §bPlayer §d${plr.name}§b has set the module §e${module.mname}§b to ${module.toggle[newValue]}`);
            } //else console.warn(`Invalid toggle value: ${newValue}`);
        }
    } catch (error) {
        console.warn(`Error while setting module ${module.mname} ${newValue ? `to ${newValue}` : ''}`);
    }
}

const guiScheme = {
    /** @type { (plr: Player) => Void } */
    main: (() => { // main UI
        /** @type { [name: String, fn: (plr: Player) => void][] } */
        const actionList = [
            ['Modules', plr => guiScheme.toggle_main(plr)],
            ['Item bans', plr => guiScheme.itemban(plr)],
            ['Ore alerts', plr => guiScheme.oreban(plr)],
            ['Kits', plr => guiScheme.kits(plr)],
            ['Particles', plr => guiScheme.particles(plr)],
            ['World Border', plr => guiScheme.worldborder(plr)],
            ['Player Command', plr => guiScheme.pcmd['new'](plr)],
            ['More', plr => guiScheme.more(plr)],
            ['Close', plr => { }],
        ]
        const v = new ActionFormData()
            .title('Unity Anticheat')

        for (let [name, f] of actionList) v.button(name)

        return (plr) => void v.show(plr).then(v => {
            if (v.canceled) return
            actionList[v.selection][1](plr)
        })
    })(),

    NonStaff: (() => { // UI for non-staff players
        /** @type { [name: string, fn: (plr: Player) => void][] } */
        const cmdlist = [
            ['Your Stats', plr => guiScheme.pcmd.playerstats(plr)],
            ['Change Display', plr => guiScheme.pcmd.display(plr)],
            ['TPA to Player', plr => guiScheme.pcmd.tpa_main_menu(plr)],
            ['TP to Spawn', plr => guiScheme.pcmd.spawntp(plr)],
            ['Last Death Coords', plr => guiScheme.pcmd.lastdeath(plr)],
            ['Close', plr => { }],
        ]
        const v = new ActionFormData()
            .title('Player Command GUI')

        for (let [name, f] of cmdlist) v.button(name)

        return (plr) => void v.show(plr).then(v => {
            if (v.canceled) return
            cmdlist[v.selection][1](plr)
        })
    })(),

    player_welcome: ((plr) => { // UI for non-staff players
        const v = new ActionFormData()
            .title(`Welcome`)

        let text = [];

        text.push(`§l§bWelcome!`)
        text.push(`§l§bProtected by §cUAC \n§bby §dNightwalkerLots`)
        text.push(`§l`) //space
        text.push(`§6UAC.help §bfor player commands`)
        text.push(`§6UAC.gui §bfor ease of access`)
        text.push(`§l`) //space
        text.push(`§bJoin the UAC discord for updates`)
        text.push(`§6https://discord.gg/HzymT3kWSQ`)
        v.body(text.join('\n§r'))
        const welcome = [
            ['Accept', plr => guiScheme.pcmd.welcome_accept(plr)]
        ]


        for (let [name, f] of welcome) v.button(name)

        return (plr) => void v.show(plr).then(v => {
            if (v.canceled) return
            welcome[v.selection][1](plr);
        })
    })(),

    pcmd: { //0: Off, 1: Player mode, 2: Server mode.
        display: (plr) => {
            const serverDatabase = new Database();
            const playerDatabase = new Database(plr);
            if (serverDatabase.get('hmmtoggle') === 0) return plr.sendMessage(`§¶§cUAC ► §c§lRealm owner has set a sidebar message global.`);
            const actionList = [
                ['Personal Stats', () => playerDatabase.set('hmmtoggle', 1)],
                ['Server Stats', () => playerDatabase.set('hmmtoggle', 2)],
                ['Off', () => playerDatabase.set('hmmtoggle', 0)],
                ['back', () => guiScheme.NonStaff(plr)]
            ];

            const v = new ActionFormData()
                .title(`Change Display Message`)
            for (let [name, f] of actionList) v.button(name)
            v.show(plr).then(v => {
                if (v.canceled) return
                actionList[v.selection][1]();
            })
        },

        lastdeath: (plr) => {
            plr.runCommandAsync('function UAC/asset/deathcoords_asset')
        },
        welcome_accept: (plr) => {
            plr.addTag('seen_gui')
        },
        spawntp: (plr) => {
            let name = plr.nameTag;


            if (scoreTest(plr, 'tp_cooldown') >= 1) return plr.sendMessage(`§¶§cUAC ► §6TPA §cunavailable §bwhile warp commands are in cooldown. Please wait 40 seconds.`)
            if (scoreTest(plr, 'worldcustom') === 1) {
                plr.runCommandAsync(`tp @s ${scoreTest(plr, 'Worldx')} ${scoreTest(plr, 'Worldy')} ${scoreTest(plr, 'Worldz')}`);
                plr.sendMessage(`§¶§cUAC ► §l§d${name} §bHas warped to World Spawn at §6${scoreTest(plr, 'Worldx')} ${scoreTest(plr, 'Worldy')} ${scoreTest(plr, 'Worldz')}`);
                tellrawStaff(`§¶§cUAC STAFF ► §d${name} §bwarped to worldspawn`);
                plr.runCommandAsync(`function particle/nether_poof`);
                setScore(plr, 'tp_cooldown', 900, false);
            }
            else {
                plr.runCommandAsync(`tp @s 0 100 0`)
                plr.runCommandAsync(`effect @s slow_falling 35 1 `);
                tellrawStaff(`§¶§cUAC STAFF ► §d${name} §bwarped to worldspawn`);
                plr.runCommandAsync(`function particle/nether_poof`);
                setScore(plr, 'tp_cooldown', 900, false);
            }
        },

        tpa_select: (plr, _a = 0) => {
            //let name = plr.nameTag;
            const pl = [...world.getPlayers()].filter(v => v !== plr)
            const v = new ModalFormData()
                .title('Player TPA')
                .textField(
                    (
                        _a == 1 ? '§cPlayer not found.\n§r'
                            : _a == 2 ? '§cCannot target yourself.\n§r'
                                : ''
                    ) + 'Type in the player name. Leave blank to cancel',
                    'Player name'
                )
                .dropdown('Or select a player:', ['§8None§r', ...pl.map(v => v.name)])


            v.show(plr).then(v => {
                const input = v.formValues[0],
                    selection = v.formValues[1]
                if ((!input && !selection) || v.canceled) return guiScheme.NonStaff(plr)
                const inputUnformatted = input.replace(/§./g, '')

                const target =
                    (!input ? null : [...world.getPlayers()].find(v => v.name == input || v.name.replace(/§./g, '') == inputUnformatted))
                    || (!selection ? null : pl[selection - 1])
                if (!target) return guiScheme.pcmd.tpa_select(plr, 1)
                if (target == plr) return guiScheme.pcmd.tpa_select(plr, 2)
                guiScheme.pcmd.tpa_request(plr, target)

            })
        },

        tpa_main_menu: (plr, target) => {
            const v = new ActionFormData()
                .title(`§l§bTPA options`)

            let text = []
            text.push(`§l§cMust Cancel or Decline Requests before making a new one`)

            const cmdlist = [
                ['Choose Player for TPA', () => guiScheme.pcmd.tpa_select(plr, target)],
                ['Cancel/Deny Request(s)', () => guiScheme.pcmd.tpa_cancel(plr, target)],
                ['Accept Request(s)', () => guiScheme.pcmd.tpa_accept(plr, target)],
                ['Back', () => guiScheme.NonStaff(plr)]
            ]
            for (let [name, f] of cmdlist) v.button(name)

            v.show(plr).then(v => {
                if (v.canceled) return
                cmdlist[v.selection][1]()
            })

        },

        tpa_request: (plr, target) => {
            const v = new ActionFormData()
                .title(`${target.name.replace(/§./g, '')}'s TPA options`)

            let text = []
            if (scoreTest(plr, 'tp_cooldown') >= 1) return plr.sendMessage(`§¶§cUAC ► §6TPA §cunavailable §bwhile warp commands are in cooldown. Please wait 40 seconds.`)
            text.push(`§l§bSend a TPA to §d${target.name.replace(/§./g, '')}§b?`)
            v.body(text.join('\n§r'))
            const cmdlist = [
                ['Send Request', () => guiScheme.pcmd.tpa_send(plr, target)]
            ]

            for (let [name, f] of cmdlist) v.button(name)

            v.show(plr).then(v => {
                if (v.canceled) return
                cmdlist[v.selection][1]();
            })
        },
        tpa_send: (plr, target) => {
            let name = plr.nameTag;
            if (scoreTest(plr, 'tpa') >= 1) return plr.sendMessage(`§¶§cUAC ► §bTPA Channel already created! Your Channel §7:§c "${scoreTest(plr, 'tpa')}" \n§bCancel to create a new request.`);
            if (scoreTest(plr, 'tp_cooldown') >= 1) return plr.sendMessage(`§¶§cUAC ► §6TPA §cunavailable §bwhile warp commands are in cooldown. Please wait 40 seconds.`)

            plr.runCommandAsync(`scoreboard players random @s tpa 1 999999`);
            setScore(plr, 'tp_cooldown', 900, false);
            plr.runCommandAsync('tag @s add tpatemp');
            if (target.hasTag(`tpatemp`)) target.runCommandAsync(`tag @s remove tpatemp`);
            plr.runCommandAsync(`scoreboard players operation "${target.getName()}" tpa = "${name}" tpa`);
            target.sendMessage(`§¶§cUAC ► §d${name} §bhas sent you a TPA Request. Use §6UAC.tpa accept §bto accept the request`);
            plr.sendMessage(`§¶§cUAC ► §d${target.getName()} §bwas sent a TPA Request`);
            tellrawStaff(`§¶§cUAC STAFF ► §d${name} §bsent a TPA Request to §d${target.getName()}`);

        },
        tpa_cancel: (plr, target) => {
            plr.runCommandAsync(`execute @a[tag=tpatemp,scores={tpa=${scoreTest(plr, 'tpa')}}] ~~~ tag @s remove tpatemp`);
            plr.runCommandAsync(`scoreboard players set @a[scores={tpa=${scoreTest(plr, 'tpa')}}] tpa 0`);
            plr.sendMessage(`§¶§cUAC ► §bThe TPA request was closed`);
            tellrawStaff(`§¶§cUAC STAFF ► §d${plr.nameTag} §bclosed a TPA request `);
        },
        tpa_accept: (plr, target) => {
            let name = plr.nameTag;
            if (scoreTest(plr, 'tpa') === 0) return plr.sendMessage(`§¶§c§lUAC ► §cNo TPA Requests to accept`);
            if (plr.hasTag('tpatemp')) return plr.sendMessage(`§¶§c§lUAC ► §cYou have a request open to someone, and cannot accept others.`);
            if (scoreTest(plr, 'tp_cooldown') >= 1) return plr.sendMessage(`§¶§cUAC ► §6TPA §cunavailable §bwhile warp commands are in cooldown. Please wait 40 seconds.`)

            plr.sendMessage(`§¶§cUAC ► §bTPA Request was §2ACCEPTED§7.`);
            tellrawStaff(`§¶§cUAC STAFF ► §d${name} §baccepted a TPA request `);
            plr.runCommandAsync(`execute @p[name=!"${name}",scores={tpa=${scoreTest(plr, 'tpa')}}] ~~~ tp @s "${name}"`);
            setScore(plr, 'tp_cooldown', 900, false);
            plr.runCommandAsync(`execute @p[name=!"${name}",scores={tpa=${scoreTest(plr, 'tpa')}}] ~~~ scoreboard players set @s tp_cooldown 900`);

            plr.runCommandAsync(`execute @p[name=!"${name}",scores={tpa=${scoreTest(plr, 'tpa')}}] ~~~ playsound note.pling @s ~ ~ ~`);
            plr.runCommandAsync(`execute @p[name=!"${name}",scores={tpa=${scoreTest(plr, 'tpa')}}] ~~~ function particle/nether_poof`);
            plr.runCommandAsync(`execute @p[name=!"${name}",scores={tpa=${scoreTest(plr, 'tpa')}}] ~~~ playsound mob.shulker.teleport @s ~~~ 2 2 2`);

            plr.runCommandAsync(`scoreboard players set @a[scores={tpa=${scoreTest(plr, 'tpa')}}] tpa 0`);
            plr.runCommandAsync(`execute @a[tag=tpatemp,scores={tpa=${scoreTest(plr, 'tpa')}}] ~~~ tag @s remove tpatemp`);
        },

        /** @type { (plr: Player, target: Player) => void } */
        stats: (plr, target) => {
            const v = new ActionFormData()
                .title(`${target.name.replace(/§./g, '')}'s stats`);

            let text = [];

            // location
            text.push('§l§eLocation')
            const plrFacing = obj('Player_Facing').players.get(target) // down up north south west east
            const plrCoord = ['X_Coordinate', 'Y_Coordinate', 'Z_Coordinate'].map(v => obj(v).players.get(target))
            const spawnCoord = ['X_Coord_S', 'Y_Coord_S', 'Z_Coord_S'].map(v => obj(v).players.get(target))
            const deathCoord = ['X_Coord_D', 'Y_Coord_D', 'Z_Coord_D'].map(v => obj(v).players.get(target))
            const playerDim = (() => {
                const in_nether = obj('in_nether').players.get(target)
                const in_end = obj('in_end').players.get(target)
                return in_nether ? 1 // 1: in nether
                    : in_end ? 2 // 2: in end
                        : 0 // overworld / unknoown
            })()

            text.push(`Location: ${plrCoord.map(v => `§a${v}§r`).join(', ')}`)
            text.push(`SpawnLoc: ${spawnCoord.map(v => `§a${v}§r`).join(', ')}`)
            text.push(`DeathLoc: ${deathCoord.map(v => `§a${v}§r`).join(', ')}`)
            text.push(`Facing: §b${plrFacing == 0 ? 'DOWN'
                : plrFacing == 1 ? 'UP'
                    : plrFacing == 2 ? 'NORTH'
                        : plrFacing == 3 ? 'SOUTH'
                            : plrFacing == 4 ? 'WEST'
                                : plrFacing == 5 ? 'EAST'
                                    : 'UNKNOWN'
                }`)
            text.push(`Dimension: §b${playerDim == 0 ? 'OVERWORLD'
                : playerDim == 1 ? 'NETHER'
                    : playerDim == 2 ? 'END'
                        : 'UNKNOWN'
                }`)
            text.push('') // newline

            // permissions
            text.push('§l§ePermissions')
            const isStaff = target.hasTag('staffstatus')
            const isOwner = target.hasTag('ownerstatus')
            const mayFly = obj('2KK001').players.get(plr) == 725
            const isGodmode = target.hasTag('tgmGodMode')
            const gamemode = getGamemode(target)

            text.push(`Staff: ${isStaff ? '§aYes' : '§eNo'}`)
            text.push(`Owner: ${isOwner ? '§aYes' : '§eNo'}`)
            text.push(`Mayfly: ${mayFly ? '§aYes' : '§eNo'}`)
            text.push(`Godmode: ${isGodmode ? '§aYes' : '§eNo'}`)
            text.push(`Gamemode: §b${gamemode == 'survival' ? 'Survival'
                : gamemode == 'creative' ? 'Creative'
                    : gamemode == 'adventure' ? 'Adventure'
                        : gamemode == 'spectator' ? 'Spectator'
                            : gamemode == 'hc' ? 'Hardcore'
                                : 'Unknown'
                }`)
            text.push('') // newline

            // detections
            /** @type {[id: string, name: string, max: number][]} */
            const detections = [
                ['warn', 'Warns', 3],
                ['gmc_flag', 'GMC flags', 4],
                ['warnillegal', 'Illegal item warns', 9],
            ]
            text.push('§l§eDetections')
            for (let [id, name, max] of detections) text.push(`${name}:  §e${obj(id).players.get(target) ?? 0}§r / §e${max}§r`)

            text.push('') // newline

            const ores_mined = [
                ['diamond_ore', 'Diamonds'],
                ['gold_ore', 'Gold'],
                ['lapis_ore', 'Lapis'],
                ['ancient_debris', 'Netherite'],
                ['emerald_ore', 'Emeralds'],
                ['iron_ore', 'Iron'],
            ]
            text.push('§l§eOres Mined')
            for (let [id, name] of ores_mined) text.push(`${name}:  §e${obj(id).players.get(target) ?? 0}§r`)

            v.body(text.join('\n§r'))
            v.button('Back')

            v.show(plr).then(() => guiScheme.pcmd.exec(plr, target))
        },
        inv: (plr, target) => {
            const v = new ActionFormData()
                .title(`${target.name.replace(/§./g, '')}'s Items`)

            let text = []
            let targ_name = target.name;
            let head_type = undefined;
            let chest_type = undefined;
            let leg_type = undefined;
            let boot_type = undefined;
            let head_enchanted = scoreTest(targ_name, 'headen');
            let chest_enchanted = scoreTest(targ_name, 'chesten');
            let leg_enchanted = scoreTest(targ_name, 'legen');
            let boot_enchanted = scoreTest(targ_name, 'feeten');

            if (scoreTest(target, 'nethhelm') === 1) { head_type = 'Netherite' }
            if (scoreTest(target, 'diahelm') === 1) { head_type = 'Diamond' }
            if (scoreTest(target, 'ironhelm') === 1) { head_type = 'Iron' }
            if (scoreTest(target, 'goldhelm') === 1) { head_type = 'Gold' }
            if (scoreTest(target, 'chainhelm') === 1) { head_type = 'Chainmail' }
            if (scoreTest(target, 'leathhelm') === 1) { head_type = 'Leather' }
            if (scoreTest(target, 'turthelm') === 1) { head_type = 'Turtle' }
            if (head_type == undefined) { head_type = 'None' }

            if (scoreTest(target, 'nethchest') === 1) { chest_type = 'Netherite' }
            if (scoreTest(target, 'diachest') === 1) { chest_type = 'Diamond' }
            if (scoreTest(target, 'goldchest') === 1) { chest_type = 'Gold' }
            if (scoreTest(target, 'ironchest') === 1) { chest_type = 'Iron' }
            if (scoreTest(target, 'chainchest') === 1) { chest_type = 'Chain' }
            if (scoreTest(target, 'leathchest') === 1) { chest_type = 'Leather' }
            if (scoreTest(target, 'elytra') === 1) { chest_type = 'Elytra' }
            if (chest_type == undefined) { chest_type = 'None' }

            if (scoreTest(target, 'nethlegs') === 1) { leg_type = 'Netherite' }
            if (scoreTest(target, 'dialegs') === 1) { leg_type = 'Diamond' }
            if (scoreTest(target, 'ironlegs') === 1) { leg_type = 'Iron' }
            if (scoreTest(target, 'goldlegs') === 1) { leg_type = 'Gold' }
            if (scoreTest(target, 'chainlegs') === 1) { leg_type = 'Chain' }
            if (scoreTest(target, 'leathlegs') === 1) { leg_type = 'Leather' }
            if (leg_type == undefined) { leg_type = 'None' }

            if (scoreTest(target, 'nethboots') === 1) { boot_type = 'Netherite' }
            if (scoreTest(target, 'diaboots') === 1) { boot_type = 'Diamond' }
            if (scoreTest(target, 'ironboots') === 1) { boot_type = 'Iron' }
            if (scoreTest(target, 'goldboots') === 1) { boot_type = 'Gold' }
            if (scoreTest(target, 'chainboots') === 1) { boot_type = 'Chain' }
            if (scoreTest(target, 'leathboots') === 1) { boot_type = 'Leather' }
            if (boot_type == undefined) { boot_type = 'None' }


            // Armor
            text.push(`§d§l${target.getName()}'s §bArmor §7:`);
            text.push(`§b§lHelmet §7: §c${head_type} §bEnchant §7: ${head_enchanted ? '§2TRUE' : '§cFALSE'}`);
            text.push(`§b§lChest §7: §c${chest_type} §bEnchant §7: ${chest_enchanted ? '§2TRUE' : '§cFALSE'}`);
            text.push(`§b§lLegs §7: §c${leg_type} §bEnchant §7: ${leg_enchanted ? '§2TRUE' : '§cFALSE'}`);
            text.push(`§b§lBoots §7: §c${boot_type} §bEnchant §7: ${boot_enchanted ? '§2TRUE' : '§cFALSE'}`);

            text.push(` `) // new line
            let items = target.getInventory(true);
            text.push(
                `§¶§d§l${target.getName()} §binventory:\n${items
                    .map(({ slot, id, amount, data }) => `§¶§6§lslot: §¶§c${slot} §¶§6§lid: §¶§c${id.replace('minecraft:', '')} §¶§6§lamount: §¶§c${amount} §¶§6§ldata: §¶§c${data}`)
                    .join('\n')}`);

            v.body(text.join('\n§r'))
            v.button('Back')

            v.show(plr).then(evd => guiScheme.pcmd.exec(plr, target))
        },

        playerstats: (plr, target) => { // Non-staff stats UI
            const v = new ActionFormData()
                .title(`${plr.name.replace(/§./g, '')}'s Stats`)

            let text = [];

            let tp_day = scoreTest(plr, 'timeplayedday');
            let tp_hour = scoreTest(plr, 'timeplayedhr');
            let tp_min = scoreTest(plr, 'timeplayedmin');
            let tp_sec = scoreTest(plr, 'timeplayedsec');
            let deaths = scoreTest(plr, 'deaths');
            let kills = scoreTest(plr, 'kills');
            let killstreak = scoreTest(plr, 'killstreak');
            let money = scoreTest(plr, 'money');

            let diamonds = scoreTest(plr, 'diamond_ore');
            let emeralds = scoreTest(plr, 'emerald_ore');
            let gold = scoreTest(plr, 'gold_ore');
            let iron = scoreTest(plr, 'iron_ore');
            let lapis = scoreTest(plr, 'lapis_ore');
            let netherite = scoreTest(plr, 'ancient_debris');

            text.push(`§d§lTime Played:`);
            text.push(`§bD/§7:§c${tp_day} §bH/§7:§c${tp_hour} §bM/§7:§c${tp_min} §bS/§7:§c${tp_sec}`);
            text.push(` `) // new line
            text.push(`§d§lCombat:`);
            text.push(`§bKills §7:§c${kills} §bDeaths §7:§c${deaths} §bKillstreak §7:§c${killstreak}`);
            text.push(` `) // new line
            text.push(`§d§lBlocks Mined:`);
            text.push(`§bDimaonds §7:§c${diamonds} §bEmeralds §7:§c${emeralds} §bGold §7:§c${gold}`);
            text.push(`§bIron §7:§c${iron} §bLapis §7:§c${lapis} §bNetherite §7:§c${netherite}`);
            text.push(` `) // new line
            text.push(`§bCurrent Ballance §7: §c${money}`)

            v.body(text.join('\n§r'))
            v.button('Back')

            v.show(plr).then(evd => guiScheme.NonStaff(plr))

        },

        /** @type { (plr: Player, target: Player) => void } */
        exec: (plr, target) => { // Player command UI (exec)
            /** @type { [name: string, fn: () => void][] } */
            const actionList = [
                ['Stats', () => guiScheme.pcmd.stats(plr, target)],
                ['Inventory', () => guiScheme.pcmd.inv(plr, target)],
                ['TP to Me', () => plr.runCommandAsync(`tp "${target.name.replace(/\\|"/g, '\\$&')}" @s`)],
                ['TP to Them', () => plr.runCommandAsync(`tp "${plr.name.replace(/\\|"/g, '\\$&')}" "${target.name.replace(/\\|"/g, '\\$&')}"`)],
                ['Punish', () => target.runCommandAsync('function UAC/punish')],
                ['Freeze', () => target.runCommandAsync('function UAC/freeze_player')],
                ['Warn', () => target.runCommandAsync('function UAC/warn')],
                ['E-Chest Wipe', () => target.runCommandAsync('function UAC/echestwipe')],
                ['Reset Warn', () => target.runCommandAsync('function UAC/warnreset')],
                ['Ban', () => target.runCommandAsync('tag @s add Ban')],
                ['Smite', () => target.runCommandAsync('function UAC/smite')],
            ]

            const v = new ActionFormData()
                .title(`Player Command - ${target.name.replace(/§./g, '')}`)

            for (let [name, f] of actionList) v.button(name)

            v.show(plr).then(v => {
                if (v.canceled) return
                actionList[v.selection][1]()
            })
        },

        /** @type { (plr: Player, _a?: number) => void } */
        new: (plr, _a = 0) => { // Player command UI
            const pl = [...world.getPlayers()].filter(v => v !== plr)

            const v = new ModalFormData()
                .title('Player Command')
                .textField(
                    (
                        _a == 1 ? '§cPlayer not found.\n§r'
                            : _a == 2 ? '§cCannot target yourself.\n§r'
                                : ''
                    ) + 'Type in the player name. Leave blank to cancel',
                    'Player name'
                )
                .dropdown('Or select a player:', ['§8None§r', ...pl.map(v => v.name)])

            v.show(plr).then(v => {
                /** @type {string} */
                const input = v.formValues[0],
                    selection = v.formValues[1]
                if ((!input && !selection) || v.canceled) return guiScheme.main(plr)
                const inputUnformatted = input.replace(/§./g, '')
                const target =
                    (!input ? null : [...world.getPlayers()].find(v => v.name == input || v.name.replace(/§./g, '') == inputUnformatted))
                    || (!selection ? null : pl[selection - 1])
                if (!target) return guiScheme.pcmd.new(plr, 1)
                if (target == plr) return guiScheme.pcmd.new(plr, 2)
                guiScheme.pcmd.exec(plr, target)
            })
        }
    },

    /** @type { (plr: Player) => void } */
    more: (() => { // more UI
        /** @type { [name: string, fn: (plr: Player) => void][] } */
        const actionList = [
            // [ 'Clear Area'     , plr => plr.runCommandAsync('function UAC/cleararea') ],
            ['Clear chat', plr => plr.runCommandAsync('function UAC/clearchat')],
            ['Clear lag', plr => plr.runCommandAsync('function UAC/lagclear')],
            ['Vanish', plr => plr.runCommandAsync('function UAC/vanish')],
            ['Auto Totem', plr => plr.runCommandAsync('function UAC/autototem')],
            ['Godmode', plr => plr.runCommandAsync('function UAC/tgm')],
            ['Fake Leave', plr => plr.runCommandAsync('function UAC/fakeleave')],
            ['Credits', plr => plr.runCommandAsync('function UAC/credit')],
            ['Back', plr => guiScheme.main(plr)],
        ]

        const v = new ActionFormData()
            .title('Unity Anticheat')

        for (let [name, f] of actionList) v.button(name)

        return (plr) => void v.show(plr).then(v => {
            if (v.canceled) return
            actionList[v.selection][1](plr)
        })
    })(),

    /** @type { (plr: Player) => void } */
    toggle_main: (plr) => {
        const v = new ActionFormData()
            .title(`§l§bModules Menu`)

        let text = []
        text.push(`§l§bYeet`)

        const cmdlist = [
            ['Utilities', () => guiScheme.toggle_utility(plr)],
            ['Protections', () => guiScheme.toggle_protections(plr)],
            ['Back', () => guiScheme.main(plr)]
        ]
        for (let [name, f] of cmdlist) v.button(name)

        v.show(plr).then(v => {
            if (v.canceled) return
            cmdlist[v.selection][1]()
        })

    },

    toggle_utility: (plr) => { // utility module toggle UI
        const v = new ModalFormData()
            .title('Utility Modules')

        /** @type { number[] } */
        const values = [];

        for (let module of moduleDefs_util) {
            const modudleDB = new Database();
            const vl = modudleDB.get(module.name);
            values.push(vl)
            module.toggle.length == 2
                ? v.toggle(`${module.mname} `, !!vl)
                : v.dropdown(`${module.mname}`, module.toggle, vl)
        }
        v.show(plr).then(v => {
            if (v.canceled) return guiScheme.main(plr)
            const newValues = v.formValues.map(v => Number(v))
            for (let i = 0, m = newValues.length, a, b; (a = values[i], b = newValues[i], i < m); i++) {
                if (a != b) {
                    setModule(plr, moduleDefs_util[i], b)
                }
            }
            guiScheme.main(plr)
        })
    },

    toggle_protections: (plr) => { // utility module toggle UI
        const v = new ModalFormData()
            .title('Protection Modules')

        /** @type { number[] } */
        const values = []

        const protectionsDB = new Database();
        for (let module of moduleDefs_prots) {
            const vl = Number(protectionsDB.get(module.name));
            values.push(vl)
            module.toggle.length == 2
                ? v.toggle(`${module.mname}`, !!vl)
                : v.dropdown(`${module.mname}`, module.toggle, vl)
        }

        v.show(plr).then(v => {
            if (v.canceled) return guiScheme.main(plr)
            const newValues = v.formValues.map(v => Number(v))
            for (let i = 0, m = newValues.length, a, b; (a = values[i], b = newValues[i], i < m); i++) {
                if (a != b) setModule(plr, moduleDefs_prots[i], b)
            }
            guiScheme.main(plr)
        })
    },

    /** @type { (plr: Player) => void } */
    itemban: (plr) => { // itemban UI
        const v = new ModalFormData()
            .title('Item Bans')

        /** @type { number[] } */
        const values = []
        const itembanDB = new Database();
        for (let itemban of itembanDefs) {
            const vl = itembanDB.get(itemban.name);
            values.push(vl)
            v.toggle(itemban.mname, !!vl)
        }

        v.show(plr).then(v => {
            if (v.canceled) return guiScheme.main(plr);

            const newValues = v.formValues.map(v => Number(v))
            for (let i = 0, m = newValues.length, a, b; (a = values[i], b = newValues[i], i < m); i++) {
                if (a != b) {
                    const itemban = itembanDefs[i]
                    itembanDB.set(itemban.name, b)
                    tellrawStaff(`§¶§cUAC STAFF ► §bPlayer §d${plr.name}§b has ${b ? '§aenabled' : '§cdisabled'}§r §eItemBan/${itemban.mname}§r`)
                }
            }; guiScheme.main(plr)
        })
    },

    /** @type { (plr: Player) => void } */
    oreban: (plr) => { // orealert UI
        const v = new ModalFormData()
            .title('Ore Alerts')

        /** @type { number[] } */
        const values = []
        const oreAlert = new Database()
        for (let oreban of oreBanDefs) {
            const vl = oreAlert.get(oreban.obj);
            values.push(vl)
            v.toggle(oreban.mname, !!vl)
        }

        v.show(plr).then(v => {
            if (v.canceled) return guiScheme.main(plr)

            const newValues = v.formValues.map(v => Number(v))
            for (let i = 0, m = newValues.length, a, b; (a = values[i], b = newValues[i], i < m); i++) {
                const oreban = oreBanDefs[i]
                oreAlert.set(oreban.obj, b)
                tellrawStaff(`§¶§cUAC STAFF ► §bPlayer §d${plr.name}§b has ${b ? '§aenabled' : '§cdisabled'}§r §eOreAlert/${oreban.mname}§r`)
            }
            guiScheme.main(plr)
        })
    },

    particles: (() => { // particles
        const v = new ActionFormData()
            .title('Particles')

        for (let particle of particleDefs) v.button(particle.mname)
        v.button('Back')

        /** @type { (plr: Player) => void } */
        return (plr) => {
            v.show(plr).then(v => {
                if (v.canceled || v.selection == particleDefs.length) return guiScheme.main(plr)

                const particle = particleDefs[v.selection]
                plr.runCommandAsync(`function particle/${particle.fn}`)
            })
        }
    })(),

    kits: (() => { // kits UI
        const v = new ActionFormData()
            .title('Kits')

        for (let kit of kitDefs) v.button(kit.mname)
        v.button('Back')

        /** @type { (plr: Player) => void } */
        return (plr) => {
            v.show(plr).then(v => {
                if (v.canceled || v.selection == kitDefs.length) return guiScheme.main(plr)

                const kit = kitDefs[v.selection]
                plr.runCommandAsync(`structure load "${kit.structure}" ~~~`)
                tellrawStaff(`§¶§cUAC STAFF ► §bPlayer §d${plr.name}§b has spawned a kit §e${kit.mname}§r`)
            })
        }
    })(),

    wbchange: (() => { // worldborder change UI
        const v = new ModalFormData()
            .title('World Border')
            .textField('Enter a new world border distance. Leave blank to cancel', 'World border distance (number)')

        /** @type { (plr: Player) => void } */
        return (plr) => void v.show(plr).then(v => {
            if (v.canceled || !v.formValues[0]) return guiScheme.worldborder(plr)

            let newValue = Number(v.formValues[0]);
            if (isNaN(newValue)) return guiScheme.worldborder(plr)
            const worldborderDb = new Database();
            worldborderDb.set('wbmtoggle_x', newValue);
            worldborderDb.set('wbmtoggle_z', newValue);
            tellrawStaff(`§¶§cUAC STAFF ► §bPlayer §d${plr.name}§b has set the world border size to §a${newValue}§b/§a${newValue}§r`)
            guiScheme.worldborder(plr);
        })
    })(),

    /** @type { (plr: Player) => void } */
    worldborder: (plr) => { // worldborder UI
        const worldborderDb = new Database();
        const status = worldborderDb.get('wbmtoggle'), currentX = worldborderDb.get('wbmtoggle_x'), currentZ = worldborderDb.get('wbmtoggle_z');
        let v = new ActionFormData()
            .title('World Border')
            .body([
                `Status: ${status ? '§aENABLED' : '§cDISABLED'}§r`,
                `Current distance: §a${currentX}§r / §a${currentZ}§r`
            ].join('\n§r'))
            .button('Change distance')
            .button('Change toggle')
            .button('Back')
        v.show(plr).then(v => {
            if (v.canceled) return guiScheme.main(plr)
            switch (v.selection) {
                case 0: return guiScheme.wbchange(plr)
                case 1: {
                    worldborderDb.set('wbmtoggle', status ? 0 : 1);
                    return guiScheme.worldborder(plr);
                }
                case 2: return guiScheme.main(plr)
            }
        })
    }
}

const registerInformation = {
    cancelMessage: true,
    name: 'gui',
    staff: 'false',
    description: 'Open Interactable GUI for ease of use',
    usage: '[ gui ]',
    example: [
        'gui'
    ]
};

/** @type { Map<Player, [x:Number,y:Number,z:Number]> } */
const waitMove = new Map();

Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg, { location: { x, y, z } } = sender;
    const icmtoggle = new Database();
    if (icmtoggle.get('icmtoggle') === 0 && !sender.hasTag('staffstatus')) return sender.tellraw(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`);
    sender.tellraw(`§aMove to show the UI.`)
    waitMove.set(chatmsg.sender, [x, y, z])
});

system.runInterval(() => {
    for (let [plr, [x, y, z]] of waitMove) {
        try {
            let { x: xc, y: yc, z: zc } = plr.location
            if (x != xc || y != yc || z != zc) {
                if (!plr.hasTag('seen_gui')) {
                    guiScheme.player_welcome(plr)
                    waitMove.delete(plr)
                    return;
                }
                if (plr.hasTag('staffstatus')) {
                    guiScheme.main(plr)
                    waitMove.delete(plr)
                } else {
                    guiScheme.NonStaff(plr)
                    waitMove.delete(plr)
                }
            }
        } catch (e) {
            console.warn(`Error while managing the GUI: ${error}\n${error.stack}`);
            waitMove.delete(plr)
        }
    }
});

export { waitMove };