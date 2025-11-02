import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS
  app.enableCors();

  // ✅ prefix backend routes
  app.setGlobalPrefix('api');

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('FIXILYA API')
    .setDescription('API de la plateforme FIXILYA - Services à domicile')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Serve static Vue files
  const vueDistPath = join(__dirname, '..', '..', 'WEB', 'Vue-skmern', 'dist');
  app.use('/uploads', express.static(join(__dirname, '..', '..', 'uploads')));
  app.use(express.static(vueDistPath));

  console.log('📂 Serving static files from:', vueDistPath);

  // 👇 Important: Fallback for Vue *only if not /api/*
  app.use((req, res, next) => {
    if (req.url.startsWith('/api')) return next(); // 👉 let NestJS handle API routes
    res.sendFile(join(vueDistPath, 'index.html'));
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📚 Swagger available on http://localhost:${port}/api`);
}

bootstrap();
