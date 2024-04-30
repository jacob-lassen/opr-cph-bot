require('dotenv').config()
const eventRepository = require('./repositories/event.repository');
const threadRepository = require('./repositories/thread.repository');

async function syncEvent(event) {
    const threadName = makeThreadName(event);
    const eventThread = await threadRepository.getEventThread(threadName);
    if (eventThread) {
        return;
    }
    const eventLink = await makeEventLink(event);
    await threadRepository.makeEventThread(threadName, eventLink);
}

async function makeEventLink(event) {
    const invite = await eventRepository.createInvite(new Date(event.scheduled_start_time));
    return `https://discord.gg/${invite.code}?event=${event.id}`;
}

function makeThreadName(event) {
    const date = new Date(event.scheduled_start_time);
    const month = date.toLocaleString('da-DK', { month: 'long' });
    const day = date.toLocaleString('da-DK', { day: 'numeric' }).replace(/\.$/, '');
    return `${month} ${day} (${event.name})`;
}

(async () => {
    const events = await eventRepository.getEvents();
    for (const event of events) {
        await syncEvent(event);
    }
})();