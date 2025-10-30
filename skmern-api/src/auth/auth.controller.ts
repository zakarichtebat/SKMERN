import { Controller, Post, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ 
    summary: 'Inscription d\'un nouvel utilisateur',
    description: 'Crée un nouveau compte utilisateur avec les informations de base (nom, prénom, email, téléphone, mot de passe)'
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Utilisateur créé avec succès',
    schema: {
      example: {
        user: {
          id: 1,
          nom: "Doe",
          prenom: "John",
          email: "john@example.com",
          tel: "1234567890",
          cv: null,
          photo: null,
          statut: "active",
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z"
        },
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
  })
  @ApiResponse({ status: 409, description: 'Un utilisateur avec cet email existe déjà' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ 
    summary: 'Connexion d\'un utilisateur',
    description: 'Authentifie un utilisateur avec son email et mot de passe'
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Connexion réussie',
    schema: {
      example: {
        user: {
          id: 1,
          nom: "Doe",
          prenom: "John",
          email: "john@example.com",
          tel: "1234567890",
          cv: "Mon CV détaillé...",
          photo: "https://example.com/photo.jpg",
          statut: "active",
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z"
        },
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Email ou mot de passe incorrect' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Récupérer le profil utilisateur',
    description: 'Récupère les informations complètes du profil de l\'utilisateur connecté'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Profil récupéré avec succès',
    schema: {
      example: {
        id: 1,
        nom: "Doe",
        prenom: "John",
        email: "john@example.com",
        tel: "1234567890",
        cv: "Mon CV détaillé...",
        photo: "https://example.com/photo.jpg",
        statut: "active",
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z"
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Token manquant ou invalide' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Mettre à jour le profil utilisateur',
    description: 'Met à jour les informations complémentaires du profil (CV, photo, statut)'
  })
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Profil mis à jour avec succès',
    schema: {
      example: {
        id: 1,
        nom: "Doe",
        prenom: "John",
        email: "john@example.com",
        tel: "1234567890",
        cv: "Mon CV mis à jour...",
        photo: "https://example.com/nouvelle-photo.jpg",
        statut: "active",
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T12:00:00.000Z"
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Token manquant ou invalide' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
    return this.authService.updateProfile(req.user.id, updateProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Récupérer tous les utilisateurs',
    description: 'Récupère la liste de tous les utilisateurs (ADMIN uniquement)'
  })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs récupérée avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async getAllUsers() {
    return this.authService.getAllUsers();
  }
} 