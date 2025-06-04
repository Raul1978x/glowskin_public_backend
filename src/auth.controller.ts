import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('auth')
@ApiBearerAuth('access-token')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login de usuario admin' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email', example: 'admin@email.com' },
        password: { type: 'string', example: 'tuPassword123' },
      },
      required: ['email', 'password'],
      example: {
        email: 'admin@email.com',
        password: 'tuPassword123',
      },
    },
    examples: {
      loginRequest: {
        summary: 'Ejemplo de login',
        value: {
          email: 'admin@email.com',
          password: 'tuPassword123',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Login exitoso, devuelve JWT.',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...jwt',
        user: {
          id: 1,
          name: 'Admin',
          email: 'admin@email.com',
          role: 'admin',
          active: true,
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales incorrectas.',
    schema: {
      example: {
        statusCode: 401,
        message: 'Credenciales incorrectas',
        error: 'Unauthorized',
      },
    },
  })
  async login(@Body() body: { email: string; password: string }) {
    const user: Record<string, unknown> | null =
      await this.authService.validateUser(body.email, body.password);
    if (!user || typeof user !== 'object')
      throw new UnauthorizedException('Credenciales incorrectas');
    const { access_token } = await this.authService.login(user);
    return { access_token };
  }
}
