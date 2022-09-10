import bcrypt from 'bcryptjs';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const DEFAULT_PASSWORD = 'test1234';

const users: Prisma.UserCreateInput[] = [
    {
        firstName: 'Oliver',
        lastName: 'Queen',
        email: 'oliver@qc.com',
        roles: ['ADMIN']
    },
    {
        firstName: 'Barry',
        lastName: 'Allen',
        email: 'barry@starlabs.com',
        roles: ['USER']
    }
];

async function seed(): Promise<void> {
    const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 12);
    const ollie = await prisma.user.upsert({
        where: { email: users[0].email },
        update: {},
        create: {
            ...users[0],
            password: {
                create: {
                    hash: hashedPassword
                }
            }
        }
    });

    const barry = await prisma.user.upsert({
        where: { email: users[1].email },
        update: {},
        create: {
            ...users[1],
            password: {
                create: {
                    hash: hashedPassword
                }
            }
        }
    });

    console.log({ ollie, barry });
}

seed()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
