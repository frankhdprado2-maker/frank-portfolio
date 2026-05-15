import Link from "next/link";
import { ProjectMockup } from "@/components/ProjectMockup";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type ProjectsPageProps = {
  searchParams?: Promise<{
    categoria?: string;
  }>;
};

const statusStyles: Record<string, string> = {
  Demo: "bg-mint text-ink",
  "En desarrollo": "bg-coral text-white",
  Completado: "bg-white text-ocean",
};

function hasValidUrl(url: string) {
  return Boolean(url && url !== "#");
}

export const metadata = {
  title: "Proyectos | Frank Cristian Prado Ccopa",
  description:
    "Portafolio de proyectos de desarrollo web, aplicaciones móviles, automatización y análisis de datos.",
};

async function getProjects() {
  return prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const selectedCategory = params?.categoria ?? "Todos";
  const projects = await getProjects();
  const projectCategories = [
    "Todos",
    ...Array.from(new Set(projects.map((project) => project.category))),
  ];
  const visibleProjects =
    selectedCategory === "Todos"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <main className="min-h-screen overflow-hidden">
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
          <Link className="text-ocean" href="/proyectos">
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

      <section className="relative px-5 pb-14 pt-10 sm:px-8 lg:pt-16">
        <div className="absolute right-0 top-16 -z-10 h-80 w-80 rounded-full bg-mint/25 blur-3xl" />
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 inline-flex rounded-full border border-ocean/20 bg-white/70 px-4 py-2 text-sm font-semibold text-ocean shadow-sm">
            Portafolio profesional
          </p>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-ink sm:text-6xl">
                Mis proyectos
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                Una selección de demos y prototipos pensados para clientes que
                necesitan sistemas web, aplicaciones móviles, reportes, paneles
                de datos o automatizaciones de procesos.
              </p>
            </div>
            <div className="rounded-3xl border border-white/80 bg-white/75 p-5 shadow-soft backdrop-blur">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">
                ¿Tienes un proyecto similar?
              </p>
              <p className="mt-3 text-slate-600">
                Puedo ayudarte a construir una solución web, móvil, de datos o
                automatización para tu negocio.
              </p>
              <Link
                href="/#contacto"
                className="mt-4 inline-flex rounded-full bg-ink px-4 py-2 text-sm font-black text-white transition hover:bg-ocean"
              >
                Contáctame
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap gap-3">
            {projectCategories.map((category) => {
              const href =
                category === "Todos"
                  ? "/proyectos"
                  : `/proyectos?categoria=${encodeURIComponent(category)}`;
              const isActive = category === selectedCategory;

              return (
                <Link
                  key={category}
                  href={href}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    isActive
                      ? "bg-ink text-white"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-ocean hover:text-ocean"
                  }`}
                >
                  {category}
                </Link>
              );
            })}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {visibleProjects.map((project) => (
              <article
                id={project.slug}
                key={project.slug}
                className="scroll-mt-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
                  <div className="min-h-64 overflow-hidden rounded-[1.5rem] bg-ink p-5 text-white">
                    <div className="flex items-center justify-between">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${
                          statusStyles[project.status] ?? "bg-white text-ink"
                        }`}
                      >
                        {project.status}
                      </span>
                      <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold">
                        {project.category}
                      </span>
                    </div>
                    <div className="mt-10 h-48 rounded-2xl border border-white/10 bg-white/[0.08] p-4">
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
                    <p className="mt-5 text-sm font-semibold text-mint">
                      Mockup de referencia
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <h2 className="text-2xl font-black tracking-tight text-ink">
                      {project.title}
                    </h2>
                    <p className="mt-3 font-semibold text-ocean">
                      {project.shortDescription}
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                      {project.description}
                    </p>

                    <div className="mt-5">
                      <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">
                        Funcionalidades principales
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.features.map((feature) => (
                          <span
                            key={feature}
                            className="rounded-full border border-slate-200 bg-paper px-3 py-1 text-sm font-semibold text-slate-700"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5">
                      <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">
                        Tecnologías usadas
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-mint px-3 py-1 text-sm font-bold text-ink"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={`/proyectos/${project.slug}`}
                        className="inline-flex justify-center rounded-full bg-ink px-5 py-3 text-sm font-black text-white transition hover:bg-ocean"
                      >
                        Ver detalles
                      </Link>
                      {hasValidUrl(project.demoUrl) ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex justify-center rounded-full bg-coral px-5 py-3 text-sm font-black text-white transition hover:bg-ocean"
                        >
                          Ver demo
                        </a>
                      ) : (
                        <span className="inline-flex cursor-not-allowed justify-center rounded-full bg-slate-200 px-5 py-3 text-sm font-black text-slate-500">
                          Próximamente
                        </span>
                      )}
                      {hasValidUrl(project.githubUrl) ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex justify-center rounded-full border border-ink/15 bg-white px-5 py-3 text-sm font-black text-ink transition hover:border-ocean hover:text-ocean"
                        >
                          Código
                        </a>
                      ) : (
                        <span className="inline-flex cursor-not-allowed justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-400">
                          Código próximamente
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
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
