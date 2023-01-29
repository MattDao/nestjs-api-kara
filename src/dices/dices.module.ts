import { Module } from '@nestjs/common';
import { DicesService } from './dices.service';
import { DicesController } from './dices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dice } from './entities/dice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dice])],

  controllers: [DicesController],
  providers: [DicesService],
})
export class DicesModule {}
