import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configLoader from './config/configLoader';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { FileStoreModule } from './fileStore/fileStore.module';
import { LoggerModule } from './logger/logger.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configLoader.getConfig]
        }),
        EventsModule,
        FileStoreModule,
        LoggerModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
