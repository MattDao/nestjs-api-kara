import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';



// --- Dossier Authenfication --- //

@Controller('auth')
export class AuthController {
  userService: any;
  constructor(private readonly authService: AuthService) {}

  // --- Ici l'utilisateur crée son profil --- //
 
  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  // --- Ici l'utilisateur se connecte --- //
 
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<{accessToken: string}> {
    return this.authService.login(loginDto);
}
}
