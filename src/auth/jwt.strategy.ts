/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

function getFromAuthHeaderAsBearerToken(): (req: any) => string | null {
  const extractJwt = ExtractJwt as unknown as {
    fromAuthHeaderAsBearerToken?: () => (req: any) => string | null;
  };
  if (typeof extractJwt.fromAuthHeaderAsBearerToken !== 'function') {
    throw new Error('ExtractJwt.fromAuthHeaderAsBearerToken is not a function');
  }
  return extractJwt.fromAuthHeaderAsBearerToken();
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    const jwtOptions: {
      jwtFromRequest: (req: any) => string | null;
      ignoreExpiration: boolean;
      secretOrKey: string;
    } = {
      jwtFromRequest: getFromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'changeme',
    };
    super(jwtOptions);
  }

  async validate(payload: any) {
    return this.authService.validateJwtPayload(payload);
  }
}
