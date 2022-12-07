import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { Response } from 'express';
import multer from 'multer';
import { CtxUser } from '../auth/ctx-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AuthUtilsService } from '../utils/auth-utils.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private authUtilsService: AuthUtilsService, private usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        const result = await this.usersService.create(createUserDto);
        if (result.user) {
            const refreshToken = this.authUtilsService.generateRefreshToken(result.user);
            res.cookie('r-token', refreshToken, { httpOnly: true, sameSite: 'none', secure: true });
            // Add additional cookie that can be read by the client to be able to determine
            // the existence of the http only refresh token cookie.
            res.cookie('authd', true, { httpOnly: false, sameSite: 'none', secure: true });
            return res.json(result);
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    me(@CtxUser() user: User) {
        return { user };
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findById(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }

    @Post(':id/upload')
    @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
    async upload(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
        return this.usersService.upload(id, file);
    }

    @Get(':id/image')
    getImage(@Param('id') id: string) {
        return this.usersService.getImageForId(id);
    }
}
