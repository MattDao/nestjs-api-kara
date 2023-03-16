// --- Importation de modules nécessaires --- //
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

// --- Création de la méthode de stratégie pour le JWT --- //
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: 'jaimelessushis', // --- Clé secrète pour le JWT --- //
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // --- Extrait le token JWT de l'en-tête d'autorisation de la requête --- //
    });
  }

  // --- Validation du token JWT --- //
  async validate(payload: any): Promise<User> {
    console.log('validate');
    const { id } = payload; // --- Extraction de l'identifiant utilisateur à partir du payload --- //
    const user: User = await this.userRepository.findOneBy({
      id,
    });

    // --- Si l'utilisateur n'existe pas, renvoie une exception d'autorisation non valide --- //
    if (!user) throw new UnauthorizedException();
    return user; // --- Si l'utilisateur existe, retourne l'objet utilisateur --- //
  }
}
