import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from 'src/middlewares/LoggerMiddleware';
import { UsersModule } from './modules/Users/users.module';
import { ProductsSeed } from './modules/seeder/products/products.seed';
import { CategoriesSeed } from './modules/seeder/categories/categories.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(LoggerMiddleware);
const categories = app.get(CategoriesSeed);
await categories.seed();
console.log("Categorias cargadas");


const products = app.get(ProductsSeed);
await products.seed();
console.log("products cargados");

  await app.listen(3000);
}
bootstrap();
