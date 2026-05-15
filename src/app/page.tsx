import Link from "next/link";
import {
  BarChart3,
  CalendarCheck,
  Database,
  Globe,
  LayoutDashboard,
  Smartphone,
  Workflow,
} from "lucide-react";
import { ProjectMockup } from "@/components/ProjectMockup";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const services = [
  {
    title: "Desarrollo web",
    description:
      "Sitios modernos, responsivos y optimizados para presentar servicios, negocios o plataformas.",
    Icon: Globe,
  },
  {
    title: "Desarrollo de aplicaciones móviles",
    description:
      "Aplicaciones móviles con interfaces claras, navegación simple y conexión con APIs.",
    Icon: Smartphone,
  },
  {
    title: "Sistemas de reservas",
    description:
      "Plataformas para gestionar disponibilidad, solicitudes, horarios y reservas.",
    Icon: CalendarCheck,
  },
  {
    title: "Paneles administrativos",
    description:
      "Vistas privadas para gestionar datos, usuarios, proyectos o contenido.",
    Icon: LayoutDashboard,
  },
  {
    title: "Desarrollo de APIs y bases de datos",
    description:
      "Estructuras backend para guardar, consultar y organizar información de forma segura.",
    Icon: Database,
  },
  {
    title: "Automatización de procesos",
    description:
      "Flujos para reducir tareas repetitivas, mover archivos, generar reportes y ahorrar tiempo.",
    Icon: Workflow,
  },
  {
    title: "Paneles de datos",
    description:
      "Dashboards para visualizar indicadores, reportes y métricas importantes.",
    Icon: BarChart3,
  },
];

const skills = [
  "Next.js",
  "React",
  "React Native",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Prisma",
  "PostgreSQL",
  "Python",
  "SQL",
  "Power BI",
  "Excel",
  "Power Automate",
  "GitHub",
];

const stats = [
  { value: "7", label: "Servicios" },
  { value: "14", label: "Tecnologías" },
  { value: "2", label: "Idiomas" },
];

async function getFeaturedProjects() {
  return prisma.project.findMany({
    where: { featured: true },
    orderBy: { createdAt: "asc" },
    take: 3,
  });
}

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <main className="overflow-hidden">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="text-lg font-bold tracking-tight text-ink">
          Frank Prado
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          <Link className="transition hover:text-ocean" href="/">
            Inicio
          </Link>
          <Link className="transition hover:text-ocean" href="/#sobre-mi">
            Sobre mí
          </Link>
          <Link className="transition hover:text-ocean" href="/#servicios">
            Servicios
          </Link>
          <Link className="transition hover:text-ocean" href="/proyectos">
            Proyectos
          </Link>
          <Link className="transition hover:text-ocean" href="/#contacto">
            Contacto
          </Link>
        </nav>
        <Link
          href="/#contacto"
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-ocean"
        >
          Contrátame
        </Link>
      </header>

      <section id="inicio" className="relative px-5 pb-20 pt-10 sm:px-8 lg:pt-16">
        <div className="absolute right-0 top-16 -z-10 h-80 w-80 rounded-full bg-mint/25 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-ocean/20 bg-white/70 px-4 py-2 text-sm font-semibold text-ocean shadow-sm">
              Lima, Perú &middot; Español e inglés
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Frank Cristian Prado Ccopa
            </h1>
            <p className="mt-5 max-w-3xl text-xl font-semibold text-ocean sm:text-2xl">
              Desarrollador Web y Móvil | Especialista en Automatización
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Ayudo a empresas y profesionales a crear soluciones digitales
              prácticas: aplicaciones web, apps móviles, bases de datos, APIs,
              paneles de datos, reportes y automatizaciones para reducir tareas
              manuales.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/proyectos"
                className="inline-flex justify-center rounded-full bg-coral px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-ocean"
              >
                Ver proyectos
              </Link>
              <Link
                href="/#contacto"
                className="inline-flex justify-center rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:border-ocean hover:text-ocean"
              >
                Contáctame
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-white/80 bg-white/75 p-5 shadow-soft backdrop-blur">
              <div className="rounded-[1.5rem] bg-ink p-6 text-white">
                <div className="flex items-center justify-between border-b border-white/15 pb-5">
                  <div>
                    <p className="text-sm text-mint">
                      Disponible para proyectos
                    </p>
                    <p className="mt-1 text-2xl font-bold">
                      Soluciones digitales
                    </p>
                  </div>
                  <span className="h-3 w-3 rounded-full bg-mint" />
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    "Sistemas de reservas",
                    "Paneles administrativos",
                    "Automatizaciones",
                    "Paneles de datos",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/[0.08] p-4"
                    >
                      <div className="mb-5 h-2 w-14 rounded-full bg-mint" />
                      <p className="font-semibold">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl bg-white p-4 text-ink">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="text-2xl font-black text-ocean">
                          {stat.value}
                        </p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sobre-mi" className="bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-coral">
              Sobre mí
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
              Tecnología práctica para procesos reales de negocio.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-slate-600">
            <p>
              Soy especialista en desarrollo web, móvil, datos y automatización.
              Me enfoco en ayudar a negocios a construir sistemas útiles para
              ahorrar tiempo, organizar información y tomar mejores decisiones.
            </p>
            <p>
              Puedo ayudarte a crear sistemas de reservas, paneles
              administrativos, reportes, flujos de trabajo y aplicaciones de
              negocio usando herramientas modernas y procesos de datos
              confiables.
            </p>
          </div>
        </div>
      </section>

      <section id="servicios" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-coral">
              Servicios
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
              Desarrollo, automatización y análisis de datos para tu negocio.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="mb-8 flex h-10 w-10 items-center justify-center rounded-2xl bg-ocean/10 text-ocean">
                  <service.Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold text-ink">{service.title}</h3>
                <p className="mt-3 min-h-20 leading-7 text-slate-600">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="proyectos" className="bg-ink px-5 py-20 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">
                Proyectos
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Soluciones demo enfocadas en necesidades comunes de clientes.
              </h2>
            </div>
            <Link
              href="/proyectos"
              className="inline-flex w-fit rounded-full bg-mint px-5 py-3 text-sm font-black text-ink transition hover:-translate-y-0.5 hover:bg-white"
            >
              Ver portafolio completo
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article
                key={project.slug}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur"
              >
                <div className="mb-5 h-48 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/20 via-mint/20 to-coral/20 p-4">
                  {project.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full rounded-xl object-cover"
                    />
                  ) : (
                    <ProjectMockup category={project.category} />
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-mint px-3 py-1 text-xs font-black text-ink">
                    {project.status}
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-slate-100">
                    {project.category}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-black">{project.title}</h3>
                <p className="mt-4 leading-7 text-slate-200">
                  {project.shortDescription}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-slate-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/proyectos/${project.slug}`}
                  className="mt-6 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-ink transition hover:bg-mint"
                >
                  Ver detalles
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="habilidades" className="bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-coral">
                Habilidades
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Herramientas para construir soluciones completas.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-slate-200 bg-paper px-4 py-2 text-sm font-bold text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-ocean p-8 text-white shadow-soft sm:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">
            Contacto
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
            ¿Tienes un proceso, app o panel de datos que quieres construir?
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85">
            Escríbeme y conversemos cómo convertir tu idea en una solución
            digital clara, práctica y lista para usar.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <span className="inline-flex justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white">
              Lima, Perú
            </span>
            <a
              href="mailto:frankhdprado2@gmail.com?subject=Consulta%20sobre%20proyecto&body=Hola%20Frank,%20quiero%20consultarte%20sobre%20un%20proyecto."
              className="inline-flex justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-ocean transition hover:-translate-y-0.5"
            >
              Enviar correo
            </a>
            <Link
              href="/proyectos"
              className="inline-flex justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-ocean"
            >
              Ver proyectos
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Frank Cristian Prado Ccopa. Todos los derechos reservados.</p>
          <div className="flex flex-col gap-2 sm:items-end">
            <a
              href="mailto:frankhdprado2@gmail.com"
              className="font-semibold text-ocean transition hover:text-coral"
            >
              frankhdprado2@gmail.com
            </a>
            <Link
              href="/admin/login"
              className="text-xs font-semibold text-slate-400 transition hover:text-ocean"
            >
              Acceso admin
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
