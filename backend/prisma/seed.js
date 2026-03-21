import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const products = [
  {
    legacyId: 1,
    name: 'Super Saiyajin',
    description: 'Transforme-se no lendario Super Saiyajin.',
    price: 19.9,
    minecraftCommand: 'lp user {player} parent add ssj',
    category: 'transformacoes',
    badge: 'POPULAR',
    imageUrl: null,
    popular: true,
  },
  {
    legacyId: 2,
    name: 'Super Saiyajin 2',
    description: 'Aumente ainda mais seu poder de luta.',
    price: 29.9,
    minecraftCommand: 'lp user {player} parent add ssj2',
    category: 'transformacoes',
    imageUrl: null,
    popular: false,
  },
  {
    legacyId: 3,
    name: 'Super Saiyajin Blue',
    description: 'Combine o Ki divino com a forca Saiyajin.',
    price: 39.9,
    minecraftCommand: 'lp user {player} parent add ssb',
    category: 'transformacoes',
    badge: 'DESTAQUE',
    imageUrl: null,
    popular: true,
  },
  {
    legacyId: 4,
    name: 'Ultra Instinct',
    description: 'A tecnica mais elevada do universo.',
    price: 59.9,
    minecraftCommand: 'lp user {player} parent add ui',
    category: 'transformacoes',
    badge: 'PREMIUM',
    imageUrl: null,
    popular: true,
  },
  {
    legacyId: 5,
    name: 'VIP Saiyajin',
    description: 'Pacote VIP completo com beneficios exclusivos.',
    price: 79.9,
    minecraftCommand: 'lp user {player} parent add vip',
    category: 'vip',
    badge: 'VIP',
    imageUrl: null,
    popular: true,
  },
  {
    legacyId: 6,
    name: 'VIP Namekusei',
    description: 'Pacote VIP com vantagens da raca Namekusei.',
    price: 69.9,
    minecraftCommand: 'lp user {player} parent add vip_namek',
    category: 'vip',
    imageUrl: null,
    popular: false,
  },
  {
    legacyId: 7,
    name: 'Moedas Zeni (1.000)',
    description: 'Adicione 1.000 zenis a sua conta.',
    price: 9.9,
    minecraftCommand: 'eco give {player} 1000',
    category: 'moedas',
    imageUrl: null,
    popular: false,
  },
  {
    legacyId: 8,
    name: 'Moedas Zeni (5.000)',
    description: 'Adicione 5.000 zenis a sua conta.',
    price: 34.9,
    minecraftCommand: 'eco give {player} 5000',
    category: 'moedas',
    badge: 'OFERTA',
    imageUrl: null,
    popular: false,
  },
  {
    legacyId: 9,
    name: 'Kit Guerreiro Z',
    description: 'Kit inicial com itens essenciais.',
    price: 14.9,
    minecraftCommand: 'kit guerreiro {player}',
    category: 'kits',
    imageUrl: null,
    popular: false,
  },
  {
    legacyId: 10,
    name: 'Kit Saiyan Elite',
    description: 'Kit premium com itens avancados.',
    price: 24.9,
    minecraftCommand: 'kit elite {player}',
    category: 'kits',
    badge: 'NOVO',
    imageUrl: null,
    popular: false,
  },
]

const main = async () => {
  const defaultPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@soloz.com' },
    update: {
      password: defaultPassword,
      role: 'admin',
    },
    create: {
      email: 'admin@soloz.com',
      password: defaultPassword,
      role: 'admin',
    },
  })

  for (const product of products) {
    await prisma.product.upsert({
      where: { legacyId: product.legacyId },
      update: product,
      create: product,
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
