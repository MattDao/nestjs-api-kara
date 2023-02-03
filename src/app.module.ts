import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';
import { User } from './users/entities/user.entity';
import { Character } from './characters/entities/character.entity';
import { Item } from './items/entities/item.entity';
import { Dice } from './dices/entities/dice.entity';
import { Campagne } from './campagnes/entities/campagne.entity';
import { UsersModule } from './users/users.module';
import { CampagnesModule } from './campagnes/campagnes.module';
import { DicesModule } from './dices/dices.module';
import { CharacterModule } from './characters/character.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
    }),
   
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Character, Item, Dice,Campagne],
      synchronize: process.env.MODE === 'DEV' ? true : false,
    }),
    UsersModule,
    CharacterModule,
    DicesModule,
    ItemsModule,
    AuthModule,
    CampagnesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
