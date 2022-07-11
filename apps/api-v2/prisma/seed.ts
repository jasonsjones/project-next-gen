import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DEFAULT_PASSWORD = 'test1234';

async function seed(): Promise<void> {
    const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 12);
    const ollie = await prisma.user.upsert({
        where: { email: 'oliver@qc.com' },
        update: {},
        create: {
            firstName: 'Oliver',
            lastName: 'Queen',
            email: 'oliver@qc.com',
            password: {
                create: {
                    hash: hashedPassword
                }
            }
        }
    });
    const barry = await prisma.user.upsert({
        where: { email: 'barry@starlabs.com' },
        update: {},
        create: {
            firstName: 'Barry',
            lastName: 'Allen',
            email: 'barry@starlabs.com',
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
