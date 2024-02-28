import { Server } from '../../../library/Minecraft.js';

const registerInformation = {
    cancelMessage: true,
    name: 'help',
    staff: 'false',
    description: 'Get list of all the commands available or input an argument to get information about that specific command',
    usage: 'help [command name]',
    example: [
        'help',
        'help ping'
    ]
};

Server.command.register(registerInformation, (data, args) => {
    try {
        const sender = data.sender;
        const cmdList = Server.command.getAll();
        const plrcmd = cmdList.join(', ');

        if (!args[0]) {
            if (sender.hasTag('staffstatus')) {
                let staffUtilityCommands = `\n§c==== Staff Utility Commands ====\n`;
                staffUtilityCommands += `§b► Vanish   §2- §a${Server.command.prefix}vanish      §b► Staff GUI §2- §a${Server.command.prefix}gui\n`;
                staffUtilityCommands += `§b► AutoTotem  §2- §a${Server.command.prefix}autototem   §b► UAC Credits §2- §a${Server.command.prefix}credit\n`;
                staffUtilityCommands += `§b► FakeLeave  §2- §a${Server.command.prefix}fakeleave   §b► Godmode §2- §a${Server.command.prefix}tgm\n`;
                staffUtilityCommands += `§b► Clear Lag §2- §a${Server.command.prefix}lagclear      §b► Clear Chat §2- §a${Server.command.prefix}clearchat\n`;
                staffUtilityCommands += `§b► Clear Area §2- §a${Server.command.prefix}cleararea    §b► Give Kit §2- ${Server.command.prefix}KIT\n`;
                staffUtilityCommands += `\n§c==== Player Utility Commands §7-- §2§a${Server.command.prefix}(§6command_name§2)  §c====\n`;
                staffUtilityCommands += `§b► Smite §2- smite    §b► Echest Wipe §2- echestwipe\n`;
                staffUtilityCommands += `§b► mayfly §2- mayfly    §b► Freeze §2- freeze_player\n`;
                staffUtilityCommands += `§b► Stats §2- stats    §b► Warn: §2- warn\n`;
                staffUtilityCommands += `§b► Warn Reset §2- warnreset    §b► Punish §2- punish\n`;
                staffUtilityCommands += `§b► Ban       §2- /tag (player) add Ban\n`;
                staffUtilityCommands += `§b► Unban SoftBan  §2-  §a${Server.command.prefix}unban\n`;
                staffUtilityCommands += `§b► Unban HardBan  §2- §a${Server.command.prefix}unban_window\n`;
                staffUtilityCommands += `\n§c==== Status Commands ====\n`;
                staffUtilityCommands += `§b► Modules   §2- §a${Server.command.prefix}modulecheck       §b► Toggle Modules §2- ${Server.command.prefix}toggle\n`;
                staffUtilityCommands += `§b► Itembans  §2- §a${Server.command.prefix}itembancheck      §b► Toggle Banned Items §2- ${Server.command.prefix}banitem\n`;
                staffUtilityCommands += `§b► Ore Alerts§2- §a${Server.command.prefix}ore_alert_check   §b► Toggle WorldBorder Size §2- ${Server.command.prefix}worldborder\n`;
                return sender.tellraw(staffUtilityCommands);
            } else {
                return sender.tellraw(`§bType §a${Server.command.prefix}help §f[command name] §bfor more information on that command!\n§bPlayer Command List: §l§c${plrcmd}`);
            }
        }

        const cmdInfo = Server.command.getRegistration(args[0]);

        if (!cmdInfo) {
            return sender.tellraw("§cI couldn't find the command...");
        }

        let string = `\n§eCommand§f: §a${Server.command.prefix}${cmdInfo.name}§r\n`;
        if (cmdInfo.aliases) string += `§eAliases§f: §c${cmdInfo.aliases.join('§r, ')}§r\n`;
        if (cmdInfo.description) string += `§eDescription§f: ${cmdInfo.description}\n`;
        if (cmdInfo.usage) string += `§eUsage§f: §a${Server.command.prefix}${cmdInfo.name} ${cmdInfo.usage}\n`;
        if (cmdInfo.example) string += `§eExample§f: §a${Server.command.prefix}${cmdInfo.example.join(`\n${Server.command.prefix}`)}`;

        return sender.tellraw(string);

    } catch (error) {
        console.warn(`Error while sending the help command: ${error}\n${error.stack}`);
    }
});