import { Module } from '@nestjs/common';
import { DicesService } from './dices.service';
import { DicesController } from './dices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dice } from './entities/dice.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Dice, User])],
  controllers: [DicesController],
  providers: [DicesService],
  exports: [DicesService]
})
export class DicesModule {}
