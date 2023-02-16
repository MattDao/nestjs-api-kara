import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Item } from './entities/item.entity';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
  imports: [AuthModule, TypeOrmModule.forFeature([Item, User])],
})
export class ItemsModule {}
