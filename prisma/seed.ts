/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Crema Hidratante de Aloe Vera',
        description:
          'Ideal para pieles sensibles. Calma, refresca y rehidrata profundamente.',
        image:
          'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&q=80',
        price: '24.99',
        category: 'facial-body',
      },
      {
        name: 'Crema Rica en Vitamina A',
        description: 'Anti-edad, reduce arrugas, ideal para pieles maduras.',
        image:
          'https://images.unsplash.com/photo-1608248543803-ba4f8c70e8c1?w=600&q=80',
        price: '29.99',
        category: 'facial-body',
      },
      {
        name: 'Crema Hidratante de Aceite de Oliva',
        description: 'Hidratación intensa, apta para todo tipo de piel.',
        image:
          'https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=600&q=80',
        price: '22.99',
        category: 'facial-body',
      },
      {
        name: 'Champú Limpiador Suave',
        description:
          'Con aloe vera y aceite de coco. Limpieza profunda sin agredir el cuero cabelludo.',
        image:
          'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&q=80',
        price: '18.99',
        category: 'hair',
      },
      {
        name: 'Acondicionador Nutritivo',
        description:
          'Con aceite de oliva y vitamina A. Deja el cabello suave, brillante y fácil de peinar.',
        image:
          'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&q=80',
        price: '19.99',
        category: 'hair',
      },
      {
        name: 'Mascarilla Capilar Intensiva',
        description:
          'Tratamiento semanal para cabello dañado. Restaura y fortalece desde la raíz.',
        image:
          'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
        price: '24.99',
        category: 'hair',
      },
      {
        name: 'Serene Bloom',
        description:
          'Fragancia floral y cítrica. Notas de jazmín, bergamota y vainilla.',
        image:
          'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80',
        price: '39.99',
        category: 'perfumes',
      },
      {
        name: 'Emberwood Nights',
        description:
          'Notas amaderadas y ámbar. Elegante y sofisticado para ocasiones especiales.',
        image:
          'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&q=80',
        price: '45.99',
        category: 'perfumes',
      },
      {
        name: 'Citrus Burst',
        description:
          'Frutal y especiado. Refrescante combinación de cítricos y especias exóticas.',
        image:
          'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80',
        price: '34.99',
        category: 'perfumes',
      },
      {
        name: 'Cápsulas de Radiación Cutánea',
        description:
          'Vitamina C y E para piel radiante. Mejora la elasticidad y luminosidad.',
        image:
          'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80',
        price: '29.99',
        category: 'supplements',
      },
      {
        name: 'Fortaleza de Cabello y Uñas',
        description:
          'Biotina y colágeno. Fortalece y promueve el crecimiento saludable.',
        image:
          'https://images.unsplash.com/photo-1626170733247-7066f0e33c8b?w=600&q=80',
        price: '32.99',
        category: 'supplements',
      },
      {
        name: 'Apoyo al Bienestar Diario',
        description:
          'Vitaminas generales para salud interna. Mejora tu bienestar desde adentro.',
        image:
          'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=600&q=80',
        price: '27.99',
        category: 'supplements',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
