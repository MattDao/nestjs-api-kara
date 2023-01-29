import { Module } from '@nestjs/common';
import { CampagnesService } from './campagnes.service';
import { CampagnesController } from './campagnes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campagne } from './entities/campagne.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Campagne])],
  controllers: [CampagnesController],
  providers: [CampagnesService],
})
export class CampagnesModule {}
