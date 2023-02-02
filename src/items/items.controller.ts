import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Item } from './entities/item.entity';

@Controller('items')
@UseGuards(AuthGuard())
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(
    @Body() createItemDto: CreateItemDto,
    @GetUser() user:User,
    ):Promise<Item | string> {
      console.log(User);
    return this.itemsService.create(createItemDto, user);
  }

  @Get()
  findAllByUser(
    @GetUser() user:User,
  ): Promise<Item[]> {
    console.log(Item)
    return this.itemsService.findAllByUser(user);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @GetUser() user:User,
    ): Promise<Item | string> { 
    return this.itemsService.findOne(id, user);
  }

 /*@Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);*/
  

 @Delete(':id')
 remove(@Param('id') id: string,
  @GetUser() user:User,
  ) {
    return this.itemsService.remove(id, user);
  }

}

