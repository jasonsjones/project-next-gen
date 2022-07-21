import { ApiProperty } from '@nestjs/swagger';
import { Password, User } from '@prisma/client';

export class UserEntity implements User {
    @ApiProperty()
    id: string;

    @ApiProperty()
    email: string;

    password: Password;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
