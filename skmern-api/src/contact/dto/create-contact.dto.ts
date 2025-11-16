import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({ example: 'Jean', description: 'Prénom du contact' })
  @IsString()
  @IsNotEmpty()
  prenom!: string;

  @ApiProperty({ example: 'Dupont', description: 'Nom du contact' })
  @IsString()
  @IsNotEmpty()
  nom!: string;

  @ApiProperty({ example: 'jean.dupont@example.com', description: 'Email du contact' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: '+212 06 19 95 58 98', description: 'Téléphone du contact', required: false })
  @IsString()
  @IsOptional()
  telephone?: string;

  @ApiProperty({ example: 'menage', description: 'Sujet du message' })
  @IsString()
  @IsNotEmpty()
  sujet!: string;

  @ApiProperty({ example: 'Je souhaite obtenir un devis pour...', description: 'Message du contact' })
  @IsString()
  @IsNotEmpty()
  message!: string;
}

