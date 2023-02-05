import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  //--- Création d'un compte utilisateur --- //
  
  async register(createAuthDto: CreateAuthDto) {
    const { pseudo, email, password, role } = createAuthDto;

    // --- hashage du mot de passe ---//
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // --- création d'une entité user --- //
    const user = this.userRepository.create({
      pseudo,
      email,
      password: hashedPassword,
      role,
    });
    
 // --- Ici on crée la gestion d'erreur (ne pouvant pas créer 2 fois le même compte) --- //
 // --- On compare email et mot de passe pour savoir si le compte user existe déja --- //
    const pseudoExistAlready = await this.userRepository.findBy({
      pseudo,
    });
    const mailExistAlready = await this.userRepository.findBy({
      email,
    });
    if (pseudoExistAlready.length > 0) {
      return `L'utilisateur existe déja avec ce pseudo:${pseudo}`;
    } else if (mailExistAlready.length > 0) {
      return `L'utilisateur existe déja avec ce mail:${email}`;
    }
    try {
      const createdUser = await this.userRepository.save(user);
      return createdUser;
    } catch (error) {

  // --- Gestion des erreurs --- //
      if (error.code === '23505') {
        throw new ConflictException('Ce nom existe déja');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  //--- Connexion d'un utilisateur --- //
  async login(loginDto: LoginDto) {
    const {email, password} = loginDto;
    const user = await this.userRepository.findOneBy({
      email,
    });
    
    console.log('je veux ton mail-----------', email);
    console.log('je veux ton mdp------------', password);
   
    // --- Ici comparasaison du MP Hashé --- //
    if (user && (await bcrypt.compare(password, user.password))) {

      const payload = {
        id: user.id,
        email: user.email,
        password: user.password,
        role: user.role,
      };
      
      console.log('velaur du user dans payload', payload);

      // ---Génération du token de l'utilisateteur crée --- //
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Ces identifiants ne sont pas bons, désolé...',
      );
    }
  }
}
