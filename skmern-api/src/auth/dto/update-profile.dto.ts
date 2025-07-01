import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({
    description: 'Nom de famille de l\'utilisateur',
    example: 'Dupont',
    required: false
  })
  @IsOptional()
  @IsString()
  nom?: string;

  @ApiProperty({
    description: 'Prénom de l\'utilisateur',
    example: 'Marie',
    required: false
  })
  @IsOptional()
  @IsString()
  prenom?: string;

  @ApiProperty({
    description: 'Numéro de téléphone de l\'utilisateur',
    example: '+33987654321',
    required: false
  })
  @IsOptional()
  @IsString()
  tel?: string;

  @ApiProperty({
    description: 'CV ou description professionnelle de l\'utilisateur',
    example: 'Développeur Full Stack avec 5 ans d\'expérience en JavaScript, Node.js et React...',
    required: false
  })
  @IsOptional()
  @IsString()
  cv?: string;

  @ApiProperty({
    description: 'URL de la photo de profil',
    example: 'https://example.com/photos/profile.jpg',
    required: false
  })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiProperty({
    description: 'Statut du compte utilisateur',
    example: 'active',
    enum: ['active', 'inactive', 'pending', 'blocked'],
    required: false
  })
  @IsOptional()
  @IsString()
  statut?: string;
} 