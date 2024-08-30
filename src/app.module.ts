import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/Users/users.module';
import { ProductsModule } from './modules/Products/products.module';

@Module({
  imports: [UsersModule,ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
