import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static Vue files
  const vueDistPath = join(__dirname, '..', 'WEB', 'Vue-skmern', 'dist');
  app.use(express.static(vueDistPath));
  console.log('📂 Serving static files from:', vueDistPath);

  // Fallback route (for Vue router)
  app.use((_req: any, res: any) => {
    res.sendFile(join(vueDistPath, 'index.html'));
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
}

bootstrap();
