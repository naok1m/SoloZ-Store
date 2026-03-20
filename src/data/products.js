// Dados mockados de produtos para o servidor Solo Z
import imgSSJ1      from '../assets/products/sayajin1.gif'
import imgSSJBlue   from '../assets/products/goku blue mt loco.gif'
import imgUI        from '../assets/products/ffeb994c05df1f79ca60931185429e54.gif'
import imgVipSSJ    from '../assets/products/teste.gif'
import imgZeni      from '../assets/products/40ae37e7fb62f55a1f8088269b7f0303.jpg'
import imgSSJ2      from '../assets/products/gokubalck.gif'
import imgNamekusei from '../assets/products/gifnamekusei.gif'
import imgProduct1 from '../assets/products/ezgif-8b1e93e21ac2d8f5.gif'
 
export const products = [
  {
    id: 1,
    name: 'Super Saiyajin',
    description:
      'Transforme-se no lendário Super Saiyajin! Aumente seu poder de combate, velocidade e ki. Cabelo dourado, aura brilhante e força devastadora por 30 dias no servidor.',
    price: 19.9,
    image: imgProduct1,
    category: 'transformacoes',
    popular: true,
    badge: 'POPULAR',
  },
  {
    id: 2,
    name: 'Super Saiyajin Blue',
    description:
      'O poder dos deuses! Super Saiyajin Blue combina o Ki Divino com a transformação SSJ. Aura azul intensa e poder quase ilimitado. Acesso por 30 dias.',
    price: 39.9,
    image: imgSSJBlue,
    category: 'transformacoes',
    popular: true,
    badge: 'DESTAQUE',
  },
  {
    id: 3,
    name: 'Ultra Instinct',
    description:
      'A técnica mais elevada do universo! No estado de Ultra Instinct seu corpo age sozinho, esquivando e atacando no ápice perfeito. A forma definitiva.',
    price: 59.9,
    image: imgVipSSJ,
    category: 'transformacoes',
    popular: true,
    badge: 'PREMIUM',
  },
  {
    id: 4,
    name: 'VIP Saiyajin',
    description:
      'Pacote VIP completo! Inclui todas as transformações Saiyajin (SSJ1 ao SSJ4), kit exclusivo de armadura, 2.000 Zeni de bônus e tag exclusiva no servidor.',
    price: 79.9,
    image: imgUI,
    category: 'vip',
    popular: true,
    badge: 'VIP',
  },
  {
    id: 5,
    name: 'Moedas Zeni (1.000)',
    description:
      '1.000 Moedas Zeni para usar na loja in-game! Compre itens, equipamentos e kits exclusivos diretamente dentro do servidor.',
    price: 9.9,
    image: imgZeni,
    category: 'moedas',
    popular: false,
    badge: null,
  },
  {
    id: 6,
    name: 'Moedas Zeni (5.000)',
    description:
      '5.000 Moedas Zeni pelo melhor custo-benefício! Economize 30% em relação ao pacote básico. Ideal para jogadores frequentes.',
    price: 34.9,
    image: imgZeni,
    category: 'moedas',
    popular: false,
    badge: 'OFERTA',
  },
  {
    id: 7,
    name: 'Kit Guerreiro Z',
    description:
      'Kit completo para quem está começando no servidor! Inclui armadura especial, armas encantadas, itens de sobrevivência e 500 Zeni de bônus.',
    price: 14.9,
    image: imgUI,
    category: 'kits',
    popular: false,
    badge: null,
  },
  {
    id: 8,
    name: 'Super Saiyajin 2',
    description:
      'O próximo nível de poder! SSJ2 traz raios elétricos ao redor do corpo, velocidade e força amplificadas. A forma que derrota os guerreiros mais poderosos.',
    price: 29.9,
    image: imgSSJ2,
    category: 'transformacoes',
    popular: false,
    badge: null,
  },
  {
    id: 9,
    name: 'VIP Namekusei',
    description:
      'Pacote VIP focado em Namekuseijins! Regeneração aprimorada, técnicas exclusivas de ki, aumento de vida e tag de Namekusei no servidor.',
    price: 69.9,
    image: imgNamekusei,
    category: 'vip',
    popular: false,
    badge: null,
  },
  {
    id: 10,
    name: 'Kit Sayian Elite',
    description:
      'O kit mais completo para Saiyajins! Armadura do Prince Vegeta, capacete exclusivo, Senzu Beans x10 e 1.000 Zeni de bônus.',
    price: 24.9,
    image: null,
    category: 'kits',
    popular: false,
    badge: 'NOVO',
  },
]

// Categorias disponíveis na loja
export const categories = [
  {
    id: 'transformacoes',
    name: 'Transformações',
    description: 'SSJ, SSB, UI e muito mais',
    icon: '⚡',
    gradient: 'from-sky-500 to-cyan-500',
  },
  {
    id: 'vip',
    name: 'VIP',
    description: 'Pacotes exclusivos VIP',
    icon: '👑',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'moedas',
    name: 'Moedas Zeni',
    description: 'Moedas para usar no servidor',
    icon: '💰',
    gradient: 'from-sky-400 to-cyan-600',
  },
  {
    id: 'kits',
    name: 'Kits',
    description: 'Kits para começar mais forte',
    icon: '🎒',
    gradient: 'from-green-500 to-teal-500',
  },
]
