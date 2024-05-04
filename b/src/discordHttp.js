const { HttpException } = require('@nestjs/common');
const axios = require('axios');

const discordUrl = 'https://discord.com/api'

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class RateLimiter {
    constructor() {
        this.limited = false;
        this.awaiting = [];
    }
    startRun() {
        if (this.limited) {
            return new Promise((resolve, reject) => {
                awaiting.push(resolve);
            });
        }
        this.limited = true;
        return Promise.resolve();
    }

    async endRun(resetAfterSeconds) {
        if (this.awaiting.length > 0) {
            const resolve = awaiting.shift();
            wait(resetAfterSeconds * 1000).then(() => resolve());
        } else {
            this.limited = false;
        }
    }

}
const rateLimiter = new RateLimiter();

async function discordHttp({ path, method, data }) {
    // await rateLimiter.startRun();
    const options = {
        method: method,
        url: `${discordUrl}${prefixWithSlash(path)}`,
        headers: {
            'Authorization': `Bot ${process.env.DISCORD_TOKEN}`,
        },
    };
    
    if (data) {
        options.data = data;
    }

    const promise = axios(options);
    const [result] = await Promise.allSettled([promise]);

    if (result.status === 'rejected') {
        await rateLimiter.endRun(10);
        throw new HttpException({
            status: 500,
            error: result.reason,
        }, 500);
    }

    // await rateLimiter.endRun(result.value.headers['x-ratelimit-reset-after']);
    return result.value.data;
}

function prefixWithSlash(path) {
    if (!path.startsWith('/')) {
        return `/${path}`;
    }
    return path;
}

module.exports = discordHttp;