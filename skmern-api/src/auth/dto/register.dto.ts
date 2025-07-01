import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Nom de famille de l\'utilisateur',
    example: 'Doe',
    minLength: 1
  })
  @IsNotEmpty()
  @IsString()
  nom!: string;

  @ApiProperty({
    description: 'Prénom de l\'utilisateur',
    example: 'John',
    minLength: 1
  })
  @IsNotEmpty()
  @IsString()
  prenom!: string;

  @ApiProperty({
    description: 'Adresse email unique de l\'utilisateur',
    example: 'john.doe@example.com',
    format: 'email'
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'Numéro de téléphone de l\'utilisateur',
    example: '+33123456789'
  })
  @IsNotEmpty()
  @IsString()
  tel!: string;

  @ApiProperty({
    description: 'Mot de passe de l\'utilisateur (minimum 6 caractères)',
    example: 'motdepasse123',
    minLength: 6
  })
  @IsNotEmpty()
  @IsString()
  password!: string;
} 