import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt'; // Importation du package bcrypt pour hacher le mot de passe de l'utilisateur.
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // Injection de la dépendance du repository de l'utilisateur.
    private jwtService: JwtService, // Injection de la dépendance de la JWT service.
  ) {}

  //--- Création d'un compte utilisateur --- //
  async register(createAuthDto: CreateAuthDto) {
    const { pseudo, email, password, role } = createAuthDto;

    // --- hashage du mot de passe ---//
    const salt = await bcrypt.genSalt(); // Génération d'un sel aléatoire.
    const hashedPassword = await bcrypt.hash(password, salt); // Hachage du mot de passe avec le sel généré précédemment.

    // --- création d'une entité user --- //
    const user = this.userRepository.create({
      pseudo,
      email,
      password: hashedPassword,
      role,
    });

    // --- Ici on crée la gestion d'erreur (ne pouvant pas créer 2 fois le même compte) --- //
    // --- On compare email et mot de passe pour savoir si le compte user existe déjà --- //
    const pseudoExistAlready = await this.userRepository.findBy({
      pseudo,
    });
    const mailExistAlready = await this.userRepository.findBy({
      email,
    });
    if (pseudoExistAlready.length > 0) {
      return `L'utilisateur existe déjà avec ce pseudo: ${pseudo}`;
    } else if (mailExistAlready.length > 0) {
      return `L'utilisateur existe déjà avec ce mail: ${email}`;
    }
    try {
      const createdUser = await this.userRepository.save(user); // Sauvegarde l'utilisateur crée dans la base de données.
      return createdUser;
    } catch (error) {
      // --- Gestion des erreurs --- //
      if (error.code === '23505') {
        throw new ConflictException('Ce nom existe déjà');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  //--- Connexion d'un utilisateur --- //
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOneBy({
      email,
    });

    console.log('je veux ton mail-----------', email);
    console.log('je veux ton mdp------------', password);

    // --- Ici comparaison du MP Hashé --- //
    if (user && (await bcrypt.compare(password, user.password))) {
      // Vérification que le mot de passe correspond bien au hash stocké en base de données.
      const payload = {
        id: user.id,
        email: user.email,
        password: user.password,
        role: user.role,
      };

      console.log('valeur du user dans payload', payload);

      // --- Génération du token de l'utilisateur crée --- //
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Ces identifiants ne sont pas bons, désolé...',
      );
    }
  }
}
