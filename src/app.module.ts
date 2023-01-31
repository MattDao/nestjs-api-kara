import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [TypeOrmModule.forFeature(), AuthModule, ItemsModule, InventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
