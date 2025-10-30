import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les services' })
  @ApiResponse({ status: 200, description: 'Liste des services récupérée avec succès' })
  async findAll(@Query('category') category?: string, @Query('active') active?: string) {
    const isActive = active === 'true' ? true : active === 'false' ? false : undefined;
    return this.servicesService.findAll(category, isActive);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un service par ID' })
  @ApiResponse({ status: 200, description: 'Service récupéré avec succès' })
  @ApiResponse({ status: 404, description: 'Service non trouvé' })
  async findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Créer un nouveau service (ADMIN uniquement)' })
  @ApiResponse({ status: 201, description: 'Service créé avec succès' })
  @ApiResponse({ status: 403, description: 'Accès refusé - Admin requis' })
  async create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Mettre à jour un service (ADMIN uniquement)' })
  @ApiResponse({ status: 200, description: 'Service mis à jour avec succès' })
  @ApiResponse({ status: 403, description: 'Accès refusé - Admin requis' })
  @ApiResponse({ status: 404, description: 'Service non trouvé' })
  async update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Supprimer un service (ADMIN uniquement)' })
  @ApiResponse({ status: 200, description: 'Service supprimé avec succès' })
  @ApiResponse({ status: 403, description: 'Accès refusé - Admin requis' })
  @ApiResponse({ status: 404, description: 'Service non trouvé' })
  async remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}

