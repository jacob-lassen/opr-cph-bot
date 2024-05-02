const discordHttp = require('../discordHttp');

let events = null;
async function getEvents() {
    if (!Array.isArray(events)) {
        events = await discordHttp({
            method: 'get',
            path: `guilds/${process.env.GUILD_ID}/scheduled-events`,
        });
    }
    return events;
}

async function createInvite(expiresAt) {
    invite = await discordHttp({
        method: 'post',
        path: `/channels/${process.env.GENERAL_CHANNEL_ID}/invites`,
        data: {
            expires_at: expiresAt.toISOString(),
        }
    });
    return invite;
}

module.exports = {
    getEvents: getEvents,
    createInvite: createInvite,
}