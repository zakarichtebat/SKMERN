import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  @Get()
  getFrontend(@Res() res: Response) {
    const indexPath = join(__dirname, '..', '..', '..', 'WEB', 'Vue-skmern', 'dist', 'index.html');
    console.log('📄 Serving Vue app from:', indexPath);
    return res.sendFile(indexPath);
  }
}
