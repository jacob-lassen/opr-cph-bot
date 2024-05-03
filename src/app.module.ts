import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configLoader from './config/configLoader';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configLoader.getConfig]
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
