import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuration du CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5001'], // URLs du frontend Vue.js
    credentials: true,
  });

  // Configuration de la validation globale
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('SKMERN Auth API')
    .setDescription('API complète d\'authentification avec gestion des profils utilisateur')
    .setVersion('1.0')
    .addTag('auth', 'Endpoints d\'authentification')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Entrez votre token JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'SKMERN Auth API Documentation',
    customfavIcon: 'https://nestjs.com/img/logo_text.svg',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    ],
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  
  console.log(`🚀 API démarrée sur: http://localhost:${port}`);
  console.log(`📚 Documentation Swagger: http://localhost:${port}/api`);
}
bootstrap();
