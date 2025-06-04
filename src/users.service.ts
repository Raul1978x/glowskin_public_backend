import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({ select: { password: false, id: true, name: true, email: true, role: true, active: true, createdAt: true, updatedAt: true } });
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id }, select: { password: false, id: true, name: true, email: true, role: true, active: true, createdAt: true, updatedAt: true } });
  }

  async create(data: { name: string; email: string; password: string; role: string; active?: boolean }) {
    const hashed = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: { ...data, password: hashed },
      select: { password: false, id: true, name: true, email: true, role: true, active: true, createdAt: true, updatedAt: true },
    });
  }

  async update(id: number, data: { name?: string; email?: string; password?: string; role?: string; active?: boolean }) {
    let updateData = { ...data };
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    } else {
      delete updateData.password;
    }
    return this.prisma.user.update({
      where: { id },
      data: updateData,
      select: { password: false, id: true, name: true, email: true, role: true, active: true, createdAt: true, updatedAt: true },
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
