import { Database, Server } from "../../../library/Minecraft";

const registerInformation = {
    cancelMessage: true,
    name: 'unbanwindow',
    staff: 'true',
    description: '',
    usage: '[ unbanwindow ]',
    example: [
        'unbanwindow'
    ]
};

Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const ubwtoggle = new Database();
});