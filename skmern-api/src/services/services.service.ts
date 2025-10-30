import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async findAll(category?: string, active?: boolean) {
    const where: any = {};
    
    if (category && category !== 'all') {
      where.category = category;
    }
    
    if (active !== undefined) {
      where.active = active;
    }

    return this.prisma.service.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException(`Service avec l'ID ${id} non trouvé`);
    }

    return service;
  }

  async create(createServiceDto: CreateServiceDto) {
    return this.prisma.service.create({
      data: createServiceDto,
    });
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    // Vérifier si le service existe
    await this.findOne(id);

    return this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
    });
  }

  async remove(id: number) {
    // Vérifier si le service existe
    await this.findOne(id);

    return this.prisma.service.delete({
      where: { id },
    });
  }
}

