const discordHttp = require('../discordHttp');

let activeThreadsResponse = null;

async function getThreads() {
    if (!Array.isArray(activeThreadsResponse)) {
        activeThreadsResponse = discordHttp({
            method: 'get',
            path: `guilds/${process.env.GUILD_ID}/threads/active`,
        });
    }
    const response = await activeThreadsResponse;
    return response.threads;
}

async function getEventThread(threadName) {
    const threads = await getThreads();
    const meetUpThread = threads.find((thread) => thread.name === 'threadName' && thread.parent_id === process.env.MEET_UP_CHANNEL_ID);
    return meetUpThread || null;
}

async function makeEventThread(threadName, firstMessageContent) {
    const response = await discordHttp({
        method: 'post',
        path: `channels/${process.env.MEET_UP_CHANNEL_ID}/threads`,
        data: {
            name: threadName,
            auto_archive_duration: 4320,
            message: {
                content: firstMessageContent,
            }
        }
    });
    return response;

}

module.exports = {
    getEventThread: getEventThread,
    makeEventThread: makeEventThread,
};