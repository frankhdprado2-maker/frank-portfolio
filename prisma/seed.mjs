import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL no está configurada.");
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const projects = [
  {
    slug: "plataforma-reservas-online",
    title: "Plataforma de Reservas Online",
    category: "Desarrollo web",
    shortDescription:
      "Sistema web para gestionar perfiles, disponibilidad y reservas.",
    description:
      "Plataforma adaptable a distintos dispositivos donde los usuarios pueden explorar perfiles de servicios, revisar disponibilidad en calendario, seleccionar fecha y hora, y enviar solicitudes de reserva. Incluye una base visual para panel administrativo y gestión de información.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
    ],
    features: [
      "Listado de perfiles",
      "Detalle de perfil",
      "Calendario de disponibilidad",
      "Formulario de reserva",
      "Panel administrativo",
    ],
    status: "Demo",
    imageUrl: "",
    githubUrl: "#",
    demoUrl: "#",
    featured: true,
  },
  {
    slug: "dashboard-ventas",
    title: "Dashboard de Ventas",
    category: "Análisis de datos",
    shortDescription:
      "Panel interactivo para analizar ventas, ingresos, clientes y productos.",
    description:
      "Panel diseñado para revisar indicadores clave de ventas, comportamiento mensual, productos con mejor rendimiento, segmentación de clientes y reportes ejecutivos para apoyar decisiones comerciales.",
    technologies: ["Power BI", "Excel", "SQL"],
    features: [
      "Indicadores KPI",
      "Tendencias de ingresos",
      "Análisis de productos",
      "Segmentación de clientes",
      "Reportes mensuales",
    ],
    status: "Demo",
    imageUrl: "",
    githubUrl: "#",
    demoUrl: "#",
    featured: true,
  },
  {
    slug: "automatizacion-reportes",
    title: "Automatización de Reportes",
    category: "Automatización",
    shortDescription:
      "Flujo para ordenar archivos, procesar reportes y reducir tareas manuales.",
    description:
      "Automatización orientada a procesos repetitivos de oficina: valida carpetas, mueve archivos, procesa datos en Excel, genera reportes y maneja errores para mejorar la eficiencia operativa.",
    technologies: ["Power Automate Desktop", "Excel", "Python"],
    features: [
      "Validación de carpetas",
      "Movimiento de archivos",
      "Procesamiento de Excel",
      "Generación de reportes",
      "Manejo de errores",
    ],
    status: "Demo",
    imageUrl: "",
    githubUrl: "#",
    demoUrl: "#",
    featured: true,
  },
  {
    slug: "app-movil-reservas",
    title: "App Móvil de Reservas",
    category: "Desarrollo móvil",
    shortDescription:
      "Prototipo móvil para explorar servicios y enviar solicitudes de reserva.",
    description:
      "Aplicación móvil de demostración donde los usuarios pueden revisar servicios, entrar al detalle de un perfil, seleccionar disponibilidad y confirmar una solicitud de reserva desde una experiencia simple y ordenada.",
    technologies: ["React Native", "Expo", "TypeScript"],
    features: [
      "Pantalla de listado",
      "Pantalla de detalle",
      "Formulario de reserva",
      "Pantalla de confirmación",
    ],
    status: "Demo",
    imageUrl: "",
    githubUrl: "#",
    demoUrl: "#",
    featured: false,
  },
];

async function main() {
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
