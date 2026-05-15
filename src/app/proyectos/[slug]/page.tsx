import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectMockup } from "@/components/ProjectMockup";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
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

async function getProject(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
  });
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado | Frank Cristian Prado Ccopa",
    };
  }

  return {
    title: `${project.title} | Frank Cristian Prado Ccopa`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

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

      <section className="relative px-5 py-14 sm:px-8 lg:py-20">
        <div className="absolute right-0 top-16 -z-10 h-80 w-80 rounded-full bg-mint/25 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="overflow-hidden rounded-[2rem] bg-ink p-5 text-white shadow-soft">
            <div className="flex flex-wrap items-center gap-2">
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
            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.08] p-4">
              {project.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-80 w-full rounded-2xl object-cover"
                />
              ) : (
                <div className="h-80">
                  <ProjectMockup category={project.category} />
                </div>
              )}
            </div>
            <p className="mt-5 text-sm font-semibold text-mint">
              Mockup de referencia
            </p>
          </div>

          <div>
            <Link
              href="/proyectos"
              className="inline-flex rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-black text-ink transition hover:border-ocean hover:text-ocean"
            >
              Volver a proyectos
            </Link>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-ink sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 text-xl font-semibold text-ocean">
              {project.shortDescription}
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              {project.description}
            </p>

            <div className="mt-8">
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

            <div className="mt-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">
                Funcionalidades principales
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-700"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/#contacto"
                className="inline-flex justify-center rounded-full bg-ink px-5 py-3 text-sm font-black text-white transition hover:bg-ocean"
              >
                Contactar por este proyecto
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
                  Demo próximamente
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
