/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Crema Humectante',
        description:
          'Crema Hidratante a base aceite de oliva, coco y vitamina, enriquecida con extracto natural de aloe vera',
        image:
          'https://hwhej8qe5va9wndj.public.blob.vercel-storage.com/1000166210-g7CH2b1j93q4wCiEDq41jSFqz4SIXM.webp',
        price: '4000',
        category: 'facial-body',
        presentationQuantity: '100 cc',
      },
      {
        name: 'Crema Humectante',
        description:
          'Crema Hidratante a base aceite de oliva, coco y vitamina, enriquecida con extracto natural de aloe vera',
        image:
          'https://hwhej8qe5va9wndj.public.blob.vercel-storage.com/1000166209-QGaTJRcN0NwIMUfB8aRFaqDx2VA4Vf.webp',
        price: '7000',
        category: 'facial-body',
        presentationQuantity: '250cc',
      },
      {
        name: 'Champú Limpiador',
        description:
          'Con aloe vera  limpieza profunda sin agredir el cuero cabelludo.',
        image:
          'https://hwhej8qe5va9wndj.public.blob.vercel-storage.com/Brillo%20y%20Fuerza%20en%20tu%20Cabello%20%281%29.webp',
        price: '4000',
        category: 'hair',
        presentationQuantity: '250ml',
      },
      {
        name: 'Acondicionador Nutritivo',
        description: 'Deja el cabello suave, brillante y fácil de peinar.',
        image:
          'https://hwhej8qe5va9wndj.public.blob.vercel-storage.com/acondicionador.webp',
        price: '4000',
        category: 'hair',
        presentationQuantity: '250cc',
      },
      {
        name: 'Nutrición Capilar Intensiva',
        description:
          'Tratamiento semanal para cabello dañado. Restaura y fortalece desde la raíz.',
        image:
          'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
        price: '10000',
        category: 'hair',
        presentationQuantity: '250cc',
      },
      {
        name: 'Rock Spirit',
        description:
          'es una fragancia masculina de espíritu rebelde y moderno, inspirada en la energía y el magnetismo del rock. Su perfil olfativo une la frescura cítrica y aromática de la salida con un corazón dulce y especiado, y un fondo amaderado y cálido que deja una estela intensa y sensual. Es una fragancia para hombres audaces, que rompen las reglas y buscan dejar huella con un aroma radical, sensual e impredecible. Ideal para la noche, salidas especiales y quienes desean un perfume de personalidad fuerte y duradera ',
        image:
          'https://hwhej8qe5va9wndj.public.blob.vercel-storage.com/1000166189-smKG8ILBo9tqmndYDcUyRIu8vLEBx6.webp',
        price: '18000',
        category: 'perfumes',
        presentationQuantity: '100ml',
      },
      {
        name: 'Imperial Midnight ',
        description:
          'es una fragancia masculina intensa y seductora, diseñada para el hombre moderno que busca destacar con elegancia y misterio. Combina la frescura cítrico-especiada de la bergamota y la pimienta rosa con un corazón amaderado profundo (oud, sándalo) y un fondo cálido y sensual (ámbar, cuero, vainilla). Ideal para eventos nocturnos, ocasiones especiales y para quienes desean un aroma duradero y con personalidad.',
        image: '/images/Imperial Midnight.webp',
        price: '10000',
        category: 'perfumes',
        presentationQuantity: '60ml',
      },
      {
        name: 'Aqua de Venus',
        description:
          'Esta composición logra una fragancia femenina, delicada y envolvente, reconocida por su carácter empolvado y floral, con un fondo cálido y sensual',
        image:
          'https://hwhej8qe5va9wndj.public.blob.vercel-storage.com/1000166194-UUTUofBObh0sTkRB2DhcSIGLAM0mLu.webp',
        price: '10000',
        category: 'perfumes',
        presentationQuantity: '60ml',
      },
    ],
  });
}

if (process.argv[2] === 'export') {
  // Exporta los productos actuales de la base de datos
  void prisma.product.findMany().then((products) => {
    // Elimina campos no necesarios (id, createdAt, updatedAt, etc.)
    const arr = products.map(({ id, ...rest }) => rest);
    console.log(JSON.stringify(arr, null, 2));
    void prisma.$disconnect();
  });
} else {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
