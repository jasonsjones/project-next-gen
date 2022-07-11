import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

        return await this.prisma.user.create({
            data: {
                ...createUserDto,
                password: {
                    create: {
                        hash: hashedPassword
                    }
                }
            }
        });
    }

    async findAll(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }

    async findById(id: string): Promise<User> {
        return await this.prisma.user.findUnique({ where: { id } });
    }

    async findByEmail(email: string): Promise<User> {
        return await this.prisma.user.findUnique({ where: { email } });
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return await this.prisma.user.update({
            where: { id },
            data: updateUserDto
        });
    }

    async remove(id: string): Promise<User> {
        return await this.prisma.user.delete({ where: { id } });
    }
}
