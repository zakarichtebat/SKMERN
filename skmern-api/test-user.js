// Script pour créer un utilisateur de test
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    // Hasher le mot de passe "test123"
    const hashedPassword = await bcrypt.hash('test123', 10);
    
    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        nom: 'Test',
        prenom: 'User',
        email: 'test@skmern.com',
        tel: '+33100000000',
        password: hashedPassword,
        statut: 'active'
      },
    });

    console.log('✅ Utilisateur créé avec succès:', {
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      password: 'test123' // Mot de passe en clair pour les tests
    });

  } catch (error) {
    if (error.code === 'P2002') {
      console.log('⚠️ Utilisateur existe déjà avec cet email');
    } else {
      console.error('❌ Erreur:', error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser(); 