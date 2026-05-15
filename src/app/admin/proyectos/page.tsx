import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createProject, deleteProject, updateProject } from "./actions";

export const dynamic = "force-dynamic";

const statusOptions = ["Demo", "En desarrollo", "Completado"];

type AdminProject = {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  features: string[];
  status: string;
  imageUrl: string | null;
  githubUrl: string | null;
  demoUrl: string | null;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

async function getProjects(): Promise<AdminProject[]> {
  return prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
  });
}

async function closeSession() {
  "use server";

  await signOut({ redirectTo: "/admin/login" });
}

type ProjectFormProps = {
  action: (formData: FormData) => Promise<void>;
  buttonLabel: string;
  project?: AdminProject;
};

function ProjectForm({ action, buttonLabel, project }: ProjectFormProps) {
  return (
    <form action={action} className="grid gap-4">
      {project ? <input type="hidden" name="id" value={project.id} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Título del proyecto
          <input
            name="title"
            defaultValue={project?.title}
            required
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium outline-none transition focus:border-ocean"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Slug
          <input
            name="slug"
            defaultValue={project?.slug}
            placeholder="mi-proyecto"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium outline-none transition focus:border-ocean"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Categoría
          <input
            name="category"
            defaultValue={project?.category}
            required
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium outline-none transition focus:border-ocean"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Estado
          <select
            name="status"
            defaultValue={project?.status ?? "Demo"}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium outline-none transition focus:border-ocean"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-sm font-bold text-slate-700">
        Descripción corta
        <input
          name="shortDescription"
          defaultValue={project?.shortDescription}
          required
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium outline-none transition focus:border-ocean"
        />
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-700">
        Descripción detallada
        <textarea
          name="description"
          defaultValue={project?.description}
          required
          rows={4}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium outline-none transition focus:border-ocean"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Tecnologías usadas
          <textarea
            name="technologies"
            defaultValue={project?.technologies.join("\n")}
            required
            rows={5}
            placeholder="Next.js&#10;TypeScript&#10;Tailwind CSS"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium outline-none transition focus:border-ocean"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Funcionalidades principales
          <textarea
            name="features"
            defaultValue={project?.features.join("\n")}
            required
            rows={5}
            placeholder="Listado de perfiles&#10;Formulario de reserva"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium outline-none transition focus:border-ocean"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Imagen o mockup
          <input
            name="imageUrl"
            defaultValue={project?.imageUrl ?? ""}
            placeholder="https://..."
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium outline-none transition focus:border-ocean"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Enlace de GitHub
          <input
            name="githubUrl"
            defaultValue={project?.githubUrl ?? "#"}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium outline-none transition focus:border-ocean"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Enlace de demo
          <input
            name="demoUrl"
            defaultValue={project?.demoUrl ?? "#"}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium outline-none transition focus:border-ocean"
          />
        </label>
      </div>

      <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={project?.featured}
          className="h-5 w-5 rounded border-slate-300 accent-[#006d77]"
        />
        Mostrar como proyecto destacado en el inicio
      </label>

      <button
        type="submit"
        className="w-fit rounded-full bg-coral px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-ocean"
      >
        {buttonLabel}
      </button>
    </form>
  );
}

export default async function AdminProjectsPage() {
  const session = await auth();
  const userEmail = session?.user?.email;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!userEmail) {
    redirect("/admin/login");
  }

  if (!adminEmail || userEmail !== adminEmail) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8">
        <section className="w-full max-w-2xl rounded-[2rem] border border-red-200 bg-white p-8 shadow-soft sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-coral">
            Administración
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-ink">
            No autorizado
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Tu sesión de GitHub está activa, pero el correo de esta cuenta no
            coincide con el correo configurado como administrador.
          </p>
          <p className="mt-3 rounded-2xl bg-paper px-4 py-3 text-sm font-bold text-slate-700">
            Cuenta actual: {userEmail}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <form action={closeSession}>
              <button
                type="submit"
                className="rounded-full bg-ink px-5 py-3 text-sm font-black text-white transition hover:bg-ocean"
              >
                Cerrar sesión
              </button>
            </form>
            <Link
              href="/"
              className="rounded-full border border-ink/15 bg-white px-5 py-3 text-center text-sm font-black text-ink transition hover:border-ocean hover:text-ocean"
            >
              Volver al inicio
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const projects: AdminProject[] = await getProjects();

  return (
    <main className="min-h-screen px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-coral">
              Administración
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-ink sm:text-5xl">
              Proyectos
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Gestiona los proyectos que aparecen en el portafolio. El acceso
              está protegido con GitHub OAuth y validación por correo.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full border border-ink/15 bg-white px-5 py-3 text-sm font-black text-ink transition hover:border-ocean hover:text-ocean"
            >
              Ver portafolio
            </Link>
            <Link
              href="/proyectos"
              className="rounded-full bg-ink px-5 py-3 text-sm font-black text-white transition hover:bg-ocean"
            >
              Ver proyectos públicos
            </Link>
            <form action={closeSession}>
              <button
                type="submit"
                className="rounded-full bg-coral px-5 py-3 text-sm font-black text-white transition hover:bg-ocean"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        </header>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black text-ink">
            Agregar nuevo proyecto
          </h2>
          <p className="mt-2 text-slate-600">
            Completa los datos principales. Puedes escribir tecnologías y
            funcionalidades separadas por coma o en líneas distintas.
          </p>
          <div className="mt-6">
            <ProjectForm action={createProject} buttonLabel="Agregar proyecto" />
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-coral">
                Lista de proyectos
              </p>
              <h2 className="mt-2 text-3xl font-black text-ink">
                Editar o eliminar
              </h2>
            </div>
            <p className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600">
              {projects.length} proyectos
            </p>
          </div>

          <div className="grid gap-6">
            {projects.map((project: AdminProject) => (
              <article
                key={project.id}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-6 flex flex-col gap-3 border-b border-slate-100 pb-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-mint px-3 py-1 text-xs font-black text-ink">
                        {project.status}
                      </span>
                      <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-bold text-slate-600">
                        {project.category}
                      </span>
                      {project.featured ? (
                        <span className="rounded-full bg-ink px-3 py-1 text-xs font-black text-white">
                          Destacado
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-3 text-2xl font-black text-ink">
                      {project.title}
                    </h3>
                  </div>
                  <form action={deleteProject}>
                    <input type="hidden" name="id" value={project.id} />
                    <button
                      type="submit"
                      className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-black text-red-700 transition hover:bg-red-100"
                    >
                      Eliminar
                    </button>
                  </form>
                </div>

                <ProjectForm
                  action={updateProject}
                  buttonLabel="Guardar cambios"
                  project={project}
                />
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
