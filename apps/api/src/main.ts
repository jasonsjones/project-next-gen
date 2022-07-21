import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from './prisma/prisma.service';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api/v1');

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Next-Gen Side Project API')
        .setDescription('A RESTful API for the next-gen side project')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/v1/doc', app, document);

    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);

    await app.listen(3000);
}
bootstrap();
