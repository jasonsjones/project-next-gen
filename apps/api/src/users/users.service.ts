import { Injectable } from '@nestjs/common';
import { User, Password } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    imageMemoryStore = new Map<string, Express.Multer.File>();

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

    async findByEmailIncludePassword(email: string): Promise<User & { password: Password }> {
        return await this.prisma.user.findUnique({ where: { email }, include: { password: true } });
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

    async upload(id: string, file: Express.Multer.File): Promise<boolean> {
        // add file to a naive memory store
        // TODO: upload to cloudinary or an s3 bucket to persist image
        this.imageMemoryStore.set(id, file);
        return Promise.resolve(true);
    }

    getImageForId(id: string): string {
        const file = this.imageMemoryStore.get(id);
        if (file) {
            return `data:${file.mimetype};base64, ${file.buffer.toString('base64')}`;
        }
        return 'Image not found.';
    }
}
