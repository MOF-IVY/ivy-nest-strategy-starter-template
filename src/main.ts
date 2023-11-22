import { NestFactory } from '@nestjs/core';
import { StrategyModule } from './strategy.module';
import { StrategyService } from './strategy.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(StrategyModule);
  app.get(StrategyService).run();
}
bootstrap();
