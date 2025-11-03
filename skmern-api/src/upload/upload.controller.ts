import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/dto/register.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private cloudinaryService: CloudinaryService) {}

  @Post('service-image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Upload une image de service vers Cloudinary (ADMIN uniquement)' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Image uploadée avec succès' })
  @ApiResponse({ status: 400, description: 'Fichier invalide' })
  @ApiResponse({ status: 403, description: 'Accès refusé - Admin requis' })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return callback(
            new BadRequestException('Seules les images sont autorisées (jpg, jpeg, png, gif, webp)'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max
      },
    }),
  )
  async uploadServiceImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Aucun fichier fourni');
    }

    try {
      const result = await this.cloudinaryService.uploadImage(file);

      return {
        filename: result.public_id,
        path: result.secure_url,
        size: result.bytes,
        mimetype: file.mimetype,
        cloudinaryId: result.public_id,
      };
    } catch (error) {
      throw new BadRequestException('Erreur lors de l\'upload de l\'image');
    }
  }
}


