import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(env.MONGO_URI),

    UsersModule,
    AuthModule,
    ProductModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
