import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "@/auth";

export const dynamic = "force-dynamic";

async function signInWithGitHub() {
  "use server";

  await signIn("github", { redirectTo: "/admin/proyectos" });
}

async function closeSession() {
  "use server";

  await signOut({ redirectTo: "/admin/login" });
}

export default async function AdminLoginPage() {
  const session = await auth();
  const userEmail = session?.user?.email;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (userEmail && adminEmail && userEmail === adminEmail) {
    redirect("/admin/proyectos");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8">
      <section className="w-full max-w-xl rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-soft backdrop-blur sm:p-10">
        <Link
          href="/"
          className="text-sm font-bold uppercase tracking-[0.18em] text-coral"
        >
          Portafolio
        </Link>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">
          Acceso de administrador
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Ingresa con GitHub para administrar los proyectos del portafolio. No
          se guardan contraseñas en la base de datos.
        </p>

        {userEmail && userEmail !== adminEmail ? (
          <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-5">
            <p className="text-lg font-black text-red-800">No autorizado</p>
            <p className="mt-2 leading-7 text-red-700">
              La cuenta autenticada no coincide con el correo autorizado para
              administrar este sitio.
            </p>
            <form action={closeSession} className="mt-5">
              <button
                type="submit"
                className="rounded-full bg-red-700 px-5 py-3 text-sm font-black text-white transition hover:bg-red-800"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        ) : (
          <form action={signInWithGitHub} className="mt-8">
            <button
              type="submit"
              className="w-full rounded-full bg-ink px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-ocean"
            >
              Ingresar con GitHub
            </button>
          </form>
        )}

        <Link
          href="/proyectos"
          className="mt-5 inline-flex text-sm font-bold text-ocean transition hover:text-coral"
        >
          Volver al portafolio
        </Link>
      </section>
    </main>
  );
}
