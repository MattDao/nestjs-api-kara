import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

//création de la méthode Getuser
export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    const user: User = {
      ...req.user,
    };
    delete user.character;
    delete user.taches;
    delete user.campagne;

    return user;
  },
);
