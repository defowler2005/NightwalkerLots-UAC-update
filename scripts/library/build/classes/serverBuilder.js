import { system, world } from '@minecraft/server';
import { EventEmitter } from './eventEmitter.js';
const overworld = world.getDimension('overworld');
export class ServerBuilder extends EventEmitter {
    /**
    * Forcefully shuts down the server. No longer works :(
    * @example ServerBuilder.close();
    */

    /*
    close() {
        function crash() {
            while (true) {
                crash();
            };
        };
        crash();
    };
    */
    /**
     * Broadcast a message in chat
     * @param {string} text Message you want to broadcast in chat
     * @param {string} [player] Player you want to broadcast to
     * @returns {runCommandReturn}
     * @example ServerBuilder.broadcast('Hello World!');
     */
    broadcast(text) {
        return world.sendMessage(text)
    };

    /**
     * 
     * @param {Function} fn 
     * @param {Number} ticks
     * @returns {Number}
     */
    runInterval(fn, ticks) {
        const runId = system.runInterval(fn, ticks);
        return runId;
    }

    broadcastStaff(text, player) {
        return this.runCommandAsync(`tellraw ${player ? `"${player}"` : '@a[tag=staffstatus]'} {"rawtext":[{"text":${JSON.stringify(text)}}]}`);
    }
    /**
     * Run a command in game
     * @param command The command you want to run
     * @returns {runCommandReturn}
     * @example ServerBuilder.runCommandAsync('say Hello World!');
     */
    runCommandAsync(command, dimension = overworld) {
        try {
            return { error: false, ...dimension.run(command) };
        }
        catch (error) {
            return { error: true };
        }
        ;
    };
    /**
    * Run an array of commands
     * @param {string[]} commands Put '%' before your commands. It will make it so it only executes if all the commands that came before it executed successfully!
    * @returns {{ error: boolean }} Object containing an error flag indicating whether any command failed.
    * @example
    * server.runCommands([
    * 'clear "notbeer" diamond 0 0',
    * '%say notbeer has a Diamond!'
    * ]);
    */
    runCommands(commands) {
        const conditionalRegex = /^%/;
        if (conditionalRegex.test(commands[0])) {
            throw new Error('[Server]: runCommands(): Error - First command in the Array CANNOT be Conditional');
        }

        let error = false;
        for (const cmd of commands) {
            if (error && conditionalRegex.test(cmd)) {
                continue;
            }
            const { error: cmdError } = this.runCommandAsync(cmd.replace(conditionalRegex, ''));
            if (cmdError) {
                error = true;
            }
        }
        return { error };
    }

    getAllPlayers() { return world.getPlayers(); };
    tellraw(info) {
        try {
            if (!Player.find({
                name: info.name
            })) return;
            this.runCommandAsync({
                command: `tellraw "${info.name}" ${JSON.stringify({
                    rawtext: [{
                        text: info.message
                    }]
                })}`
            });
        } catch (e) {
            Commands.run(`say ${e} \n\n ${e.stack}`, world.getDimension('overWorld'));
        }
    };
}
;
export const Server = new ServerBuilder();