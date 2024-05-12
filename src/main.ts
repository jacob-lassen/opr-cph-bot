import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { discordGatewayStrategy } from './discordStrategy/discordGateway.strategy';
import { ConfigService } from '@nestjs/config';
import configLoader from './config/configLoader';
import { InitializeFileStoreService } from './fileStore/services/initializeFileStore.service';
import { CustomLogger } from './logger/customLogger.service';

async function bootstrap() {
  // Main app
  await configLoader.init();
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(CustomLogger));
  await app.listen(3000);

  // Discord microservice
  const configService = app.get<ConfigService>(ConfigService);
  const discordConfig = configService.get('discord');
  const discordApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      strategy: new discordGatewayStrategy(discordConfig),
    }
  )
  discordApp.useLogger(app.get(CustomLogger));

  // initialize
  const initializeFileStoreService = app.get<InitializeFileStoreService>(InitializeFileStoreService);
  await initializeFileStoreService.initializeStore();

  // Start app
  await discordApp.listen();
}
bootstrap();
