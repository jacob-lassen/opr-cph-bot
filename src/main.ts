import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { discordGatewayStrategy } from './discordStrategy/discordGateway.strategy';
import { ConfigService } from '@nestjs/config';
import configLoader from './config/configLoader';

async function bootstrap() {
  await configLoader.init();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const configService = app.get<ConfigService>(ConfigService);
  const discordConfig = configService.get('discord');
  const discordApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      strategy: new discordGatewayStrategy(discordConfig),
    }
  )
  await discordApp.listen();
}
bootstrap();
