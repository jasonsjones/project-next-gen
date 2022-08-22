import { Injectable } from '@nestjs/common';
import { Password, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUtilsService } from '../utils/auth-utils.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

interface SignupPayload {
    access_token: string;
    user: User;
}

@Injectable()
export class UsersService {
    imageMemoryStore = new Map<string, Express.Multer.File>();

    constructor(private prisma: PrismaService, private authUtilsService: AuthUtilsService) {}

    async create(createUserDto: CreateUserDto): Promise<SignupPayload> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

        const user = await this.prisma.user.create({
            data: {
                ...createUserDto,
                password: {
                    create: {
                        hash: hashedPassword
                    }
                }
            }
        });

        const token = this.authUtilsService.generateAccessToken(user);

        return {
            access_token: token,
            user
        };
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

    async upload(id: string, file: Express.Multer.File): Promise<string> {
        // add file to a naive memory store
        // TODO: upload to cloudinary or an s3 bucket to persist image
        this.imageMemoryStore.set(id, file);
        const result = `${file.originalname} uploaded to in-memory store...`;
        return Promise.resolve(result);
    }

    getImageForId(id: string): string {
        const file = this.imageMemoryStore.get(id);
        if (file) {
            return `data:${file.mimetype};base64, ${file.buffer.toString('base64')}`;
        }
        return 'Image not found.';
    }
}
