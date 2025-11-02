import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    // 👇 هادي كتخلي NestJS يخدم ملفات Vue (frontend)
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'web', 'vue-skmern', 'dist'),
    }),

    AuthModule,
    ServicesModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
