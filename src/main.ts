import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from 'src/middlewares/LoggerMiddleware';
import { UsersModule } from './modules/Users/users.module';
import { ProductsSeed } from './modules/seeder/products/products.seed';
import { CategoriesSeed } from './modules/seeder/categories/categories.seed';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(LoggerMiddleware);
const categories = app.get(CategoriesSeed);
await categories.seed();
console.log("Categorias cargadas");
const products = app.get(ProductsSeed);
await products.seed();
console.log("products cargados");

app.useGlobalPipes(new ValidationPipe({whitelist:true,
  transform:true,
  exceptionFactory: (errors)=>{
    const errores = errors.map((error)=>{
       return {property : error.property, constraints: error.constraints};
  });
  return new BadRequestException({alert: "Se han detectado los siguientes errores",errors: errores})
  }
}));

const swaggerConfig = new DocumentBuilder()
  .setTitle("Modulo 4 henry")
  .setDescription("Es una demo para el proyecto del modulo 4")
  .setVersion("1.0")
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app,swaggerConfig);
  SwaggerModule.setup("api",app,document)

  await app.listen(3000);
}
bootstrap();
