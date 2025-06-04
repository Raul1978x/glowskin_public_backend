/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';

import { JwtUser } from './types/jwt-user.interface';

interface JwtPayload {
  sub: number;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<JwtUser | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.active && (await bcrypt.compare(pass, user.password))) {
      // No retornar password
      // Excluimos password del resultado usando spread
      // (Si usas Prisma, puedes seleccionar los campos deseados en la query)
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // No es necesario async aquí porque no hay await
  login(user: JwtUser) {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        active: user.active,
      },
    };
  }

  async validateJwtPayload(payload: JwtPayload) {
    const user = await this.usersService.findOne(payload.sub);
    if (!user || !user.active)
      throw new UnauthorizedException('Usuario no válido o inactivo');
    return user;
  }
}
