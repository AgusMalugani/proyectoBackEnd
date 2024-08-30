import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from 'src/middlewares/LoggerMiddleware';
import { UsersModule } from './modules/Users/users.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(LoggerMiddleware);
  await app.listen(3000);
}
bootstrap();
