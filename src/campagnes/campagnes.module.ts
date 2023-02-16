import { Module } from '@nestjs/common';
import { CampagnesService } from './campagnes.service';
import { CampagnesController } from './campagnes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campagne } from './entities/campagne.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campagne, User])],
  controllers: [CampagnesController],
  providers: [CampagnesService],
  exports: [CampagnesService],
})
export class CampagnesModule {}
