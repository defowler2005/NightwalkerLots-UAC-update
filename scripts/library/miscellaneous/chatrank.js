import { world } from "@minecraft/server";
import { Database } from "../Minecraft.js";
import { Server } from "../build/classes/serverBuilder.js";
import { configuration } from "../build/configurations.js";

world.beforeEvents.chatSend.subscribe((data) => {
    try {
        if (data.message.startsWith(configuration.prefix)) return;
        const currentTime = Date.now();
        const lastMessageTime = new Database(data.sender).get('lastMessageTime') || 0;
        const timeDifference = currentTime - lastMessageTime;
        let chatspam = new Database(data.sender).get('chatspam');
        const cooldownPeriod = 5000;

        if (timeDifference < cooldownPeriod) {
            data.cancel = true;
            return;
        }
        if (data.sender.hasTag('muted')) {
            (data.cancel = true);
            if (chatspam <= 1200) return;
        }
        const allRanks = data.sender.getTags().filter(tag => tag.startsWith('rank:')).map(tag => tag.replace('rank:', ''));
        const chatRanksToggle = new Database();
        if (chatRanksToggle.get('crdtoggle') === 0) return;
        data.cancel = true;
        if (allRanks.length < 1) return Server.broadcast(`§8[§bMember§8] §7${data.sender.nameTag}: §f${data.message}`);
        Server.broadcast(`§f§8[${allRanks.join(',§r ').trim()}§8]§r §7${data.sender.nameTag}: §f${data.message}`);
    } catch (error) {
        console.warn(`Error while performing chat ranks related actions: ${error}\n${error.stack}`)
    }
});