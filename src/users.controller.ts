import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Listar todos los usuarios admin' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios admin.' })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario admin por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Crear un usuario admin' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
        role: { type: 'string', enum: ['admin', 'superadmin'] },
        active: { type: 'boolean', default: true },
      },
      required: ['name', 'email', 'password', 'role'],
    },
  })
  @ApiResponse({ status: 201, description: 'Usuario creado.' })
  create(
    @Body()
    createUserDto: {
      name: string;
      email: string;
      password: string;
      role: string;
      active?: boolean;
    },
  ) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario admin' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
        role: { type: 'string', enum: ['admin', 'superadmin'] },
        active: { type: 'boolean' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Usuario actualizado.' })
  update(
    @Param('id') id: string,
    @Body()
    updateUserDto: {
      name?: string;
      email?: string;
      password?: string;
      role?: string;
      active?: boolean;
    },
  ) {
    return this.usersService.update(Number(id), updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario admin' })
  @ApiResponse({
    status: 204,
    description: 'Usuario eliminado (sin contenido).',
  })
  async remove(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.usersService.remove(Number(id));
    return res.status(204).send();
  }
}
