import { CustomTransportStrategy, MessageHandler, Server } from '@nestjs/microservices';
import { timeout } from 'rxjs';
import { DiscordConfig } from 'src/config/interfaces/discordConfig.interface';

export class discordGatewayStrategy extends Server implements CustomTransportStrategy {
    private listenerPromises: Promise<void>[];
    private connectionPromise: Promise<void>;
    private ws: WebSocket;
    private discordConfig: DiscordConfig;
    private handlers: Map<string, MessageHandler>;

    constructor(options: DiscordConfig) {
        super();
        this.discordConfig = options;
        this.handlers = new Map();
        this.listenerPromises = [];
        this.connectionPromise = this.connect();
    }

    connect() {
        this.ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');

        this.ws.onerror = (error) => {
            console.log(error);
        };

        this.ws.onclose = () => {
            console.log('Connection closed');
        };

        this.ws.onmessage = (message) => {
            this.onMessage(message);
        }

        return new Promise<void>((resolve, reject) => {
            this.ws.onopen = () => {
                const payload = {
                    op: 2,
                    d: {
                        token: this.discordConfig.token,
                        intents: 65536,
                        properties: {
                            $os: 'linux',
                            $browser: 'discord-nestjs',
                            $device: 'discord-nestjs'
                        }
                    }
                }
                this.ws.send(JSON.stringify(payload));
                resolve();
            };
        });
    }

    onMessage(message) {
        const payload = JSON.parse(message.data);
            const { t, event, op, d } = payload;

            // Hello
            if (op === 10) {
                const heartbeatInterval = d.heartbeat_interval;
                return this.heartbeat(heartbeatInterval);
            }

            // Reconnect
            if (op === 7) {
                this.ws.close();
                return this.connect();
            }

            if (this.handlers.has(t)) {
                // ToDo when handler throws it stops listening
                return this.handlers.get(t)(d);
            }
            console.log(`${op} - ${t}`);
    }

    heartbeat(ms) {
        return setInterval(() => {
            this.ws.send(JSON.stringify({op: 1, d: null}))
        }, ms)
    }

    addHandler(pattern: string, callback: MessageHandler, isEventHandler?: boolean, extras?: Record<string, any>): void {
        this.listenerPromises.push(this.attachHandler(pattern, callback));
    }
    
    public async listen(callback: () => void) {
        await this.connectionPromise;
        await Promise.all(this.listenerPromises);
        callback();
    }
    
    public close() {
        // Implement the logic here
    }

    private async attachHandler(pattern: string, callback: MessageHandler) {
        this.handlers.set(pattern, callback);
    }
}