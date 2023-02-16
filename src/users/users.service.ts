import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /*create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }*/

  // --- ¨Pour les maitres de jeu --- //

  async findAllUsersByMj(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneUserByMj(idValue: string, user: User): Promise<User> {
    try {
      const UserFound = await this.userRepository.findOneBy({
        id: idValue,
      });
      return UserFound;
    } catch (error) {
      if (error) {
        throw new NotFoundException(
          ` Pas de joueur avec l'identifiant ${idValue} `,
        );
      }
    }
  }
  // --- Pour les Joueurs& les Mj --- //

  async updateUser(idValue: string, updateUserDto: UpdateUserDto, user: User) {
    const updateUserFound = await this.userRepository.findOneBy({
      id: idValue,
    });
    console.log('id requête utilisateur', idValue);
    console.log('id utilisateur', user.id);

    if (!updateUserFound) {
      throw new NotFoundException("Cette utilisateur n'existe pas");
    }

    if (updateUserFound.id !== user.id) {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à modifier ces informations",
      );
    }

    const { password } = updateUserDto;

    try {
      if (password) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        updateUserFound.password = hashedPassword;
      }

      return await this.userRepository.save(updateUserFound);
    } catch {
      throw new Error("Autre erreur, merci de contacter l'administrateur");
    }
  }

  async remove(id: string, user: User): Promise<User | string> {
    const result = await this.userRepository.delete({
      id,
    });
    console.log('result', result);
    if (result.affected === 0) {
      throw new NotFoundException(`pas d'utilisateur trouvé avec l'id:${id}`);
    }
    return `Cette action a supprimé l'utilisateur ${user.email}`;
  }
}
