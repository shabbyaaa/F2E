import { NestFactory } from '@nestjs/core';
import AllModule from './module';

async function bootstrap() {
  const app = await NestFactory.create(AllModule);
  await app.listen(3000);
}
bootstrap();
