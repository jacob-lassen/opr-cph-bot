import { CustomTransportStrategy, MessageHandler, Server } from '@nestjs/microservices';
import { ConstructorOptions } from './interfaces/constructorOptions.interface';
import { DiscordConfig } from 'src/config/interfaces/discordConfig.interface';

export class discordGatewayStrategy extends Server implements CustomTransportStrategy {
    private listenerPromises: Promise<void>[];
    private connectionPromise: Promise<void>;
    private ws: WebSocket;
    private handlers: Map<string, MessageHandler>;

    constructor(options: DiscordConfig) {
        super();
        this.listenerPromises = [];
        this.ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');
        const connectionPromise = new Promise<void>((resolve, reject) => {
            this.ws.onopen = () => {
                const payload = {
                    op: 2,
                    d: {
                        token: options.token,
                        intents: 65536,
                        properties: {
                            $os: 'linux',
                            $browser: 'discord-nestjs',
                            $device: 'discord-nestjs'
                        }
                    }
                }
                console.log(payload);
                this.ws.send(JSON.stringify(payload));
                resolve();
            };
            this.ws.onerror = (error) => {
                console.log(error);
            };
        });

        this.ws.onmessage = (message) => {
            const payload = JSON.parse(message.data);
            const { t, event, op, d } = payload;

            if (op === 10) {
                const heartbeatInterval = d.heartbeat_interval;
                this.heartbeat(heartbeatInterval);
            }
            console.log(payload);
        };
    }

    heartbeat(ms) {
        return setInterval(() => {
            this.ws.send(JSON.stringify({op: 1, d: null}))
        }, ms)
    }

    addHandler(event: string, callback: MessageHandler, isEventHandler?: boolean, extras?: Record<string, any>): void {
        this.listenerPromises.push(this.attachHandler(event, callback));
    }
    
    public async listen(callback: () => void) {
        await this.connectionPromise;
        await Promise.all(this.listenerPromises);
        callback();
    }
    
    public close() {
        // Implement the logic here
    }

    private async attachHandler(event: string, callback: MessageHandler) {
        this.handlers.set(event, callback);
    }
}