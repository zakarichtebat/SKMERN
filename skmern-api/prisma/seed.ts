import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding de la base de données...');

  // Créer des services
  const services = [
    {
      title: 'Service de Ménage Professionnel',
      description: 'Service de ménage complet et professionnel pour votre domicile ou bureau',
      category: 'menage',
      icon: '🏠',
      image: '/photo1.jpg',
      price: 25.0,
      rating: 4.8,
      reviews: 156,
      active: true,
    },
    {
      title: 'Entretien de Jardin',
      description: 'Tonte de pelouse, taille de haies et entretien complet de votre jardin',
      category: 'jardinage',
      icon: '🌱',
      image: '/photo3.jpg',
      price: 30.0,
      rating: 4.7,
      reviews: 98,
      active: true,
    },
    {
      title: 'Réparation et Bricolage',
      description: 'Petits travaux de réparation, montage de meubles et bricolage',
      category: 'reparation',
      icon: '🔧',
      image: '/photo4.jpg',
      price: 35.0,
      rating: 4.9,
      reviews: 203,
      active: true,
    },
    {
      title: 'Plomberie',
      description: 'Dépannage et installation sanitaire, réparation de fuites',
      category: 'plomberie',
      icon: '🚿',
      image: '/slider1.jpg',
      price: 45.0,
      rating: 4.6,
      reviews: 87,
      active: true,
    },
    {
      title: 'Électricité',
      description: 'Installation électrique, dépannage et mise aux normes',
      category: 'electricite',
      icon: '⚡',
      image: '/photo1.jpg',
      price: 50.0,
      rating: 4.8,
      reviews: 124,
      active: true,
    },
    {
      title: 'Peinture et Décoration',
      description: 'Travaux de peinture intérieure et extérieure, décoration murale',
      category: 'peinture',
      icon: '🎨',
      image: '/photo3.jpg',
      price: 40.0,
      rating: 4.7,
      reviews: 145,
      active: true,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: services.indexOf(service) + 1 },
      update: {},
      create: service,
    });
  }

  console.log('✅ Seeding terminé avec succès !');
  console.log(`📊 ${services.length} services créés`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

