import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional, Min, Max } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 'Service de ménage professionnel' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Service de ménage complet pour votre domicile' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 'menage' })
  @IsString()
  category!: string;

  @ApiProperty({ example: '🏠' })
  @IsString()
  icon!: string;

  @ApiProperty({ example: '/images/menage.jpg' })
  @IsString()
  image!: string;

  @ApiProperty({ example: 25.0 })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ example: 4.5, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @ApiProperty({ example: 120, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  reviews?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

