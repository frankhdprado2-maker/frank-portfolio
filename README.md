# Portafolio de Frank Cristian Prado Ccopa

Sitio web personal creado con Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL y GitHub OAuth con Auth.js. Está pensado como portafolio profesional para clientes de Freelancer, con una página principal, una vista pública de proyectos y un panel protegido para administrar proyectos.

## Tecnologías

- Next.js
- TypeScript
- Tailwind CSS
- React
- Prisma
- PostgreSQL
- Auth.js / NextAuth
- GitHub OAuth
- Preparado para despliegue en Vercel

## Estructura principal

```text
prisma/
  migrations/
  schema.prisma
  seed.mjs
src/
  app/
    admin/
      login/
        page.tsx
      proyectos/
        actions.ts
        page.tsx
    api/
      auth/
        [...nextauth]/
          route.ts
    proyectos/
      [slug]/
        page.tsx
      page.tsx
    globals.css
    layout.tsx
    page.tsx
  auth.ts
  lib/
    prisma.ts
```

## Variables de entorno

Crea o actualiza el archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="postgresql://usuario:password@host:puerto/base_de_datos?schema=public"

GITHUB_ID="tu_client_id_de_github"
GITHUB_SECRET="tu_client_secret_de_github"
AUTH_SECRET="valor_largo_y_seguro"
AUTH_URL="http://localhost:3000"
ADMIN_EMAIL="tu_correo_de_github@example.com"
```

También puedes usar `NEXTAUTH_URL="http://localhost:3000"` si tu despliegue o configuración lo requiere, pero para Auth.js v5 se recomienda `AUTH_URL`.

No subas el archivo `.env` a GitHub. Ya está incluido en `.gitignore`.

## Crear la OAuth App en GitHub

1. Entra a GitHub.
2. Ve a **Settings**.
3. Entra a **Developer settings**.
4. Selecciona **OAuth Apps**.
5. Haz clic en **New OAuth App**.
6. Completa los datos:

```text
Application name: Frank Portfolio Admin
Homepage URL: http://localhost:3000
Authorization callback URL: http://localhost:3000/api/auth/callback/github
```

7. Guarda la aplicación.
8. Copia el **Client ID** en `GITHUB_ID`.
9. Genera un **Client Secret** y cópialo en `GITHUB_SECRET`.

Para producción, agrega otro callback con tu dominio:

```text
https://tu-dominio.com/api/auth/callback/github
```

En Vercel, configura también:

```env
AUTH_URL="https://tu-dominio.com"
ADMIN_EMAIL="tu_correo_de_github@example.com"
```

## Instalar dependencias

```bash
npm install
```

Genera Prisma Client:

```bash
npm run db:generate
```

## Migraciones

Ejecuta la migración inicial en la base de datos:

```bash
npm run db:migrate -- --name init
```

## Datos iniciales

Ejecuta el seed para cargar los proyectos iniciales:

```bash
npm run db:seed
```

El seed agrega o actualiza estos proyectos:

- Plataforma de Reservas Online
- Dashboard de Ventas
- Automatización de Reportes
- App Móvil de Reservas

## Ejecutar el sitio

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Rutas disponibles

- `/`: página principal pública con inicio, sobre mí, servicios, proyectos destacados y contacto.
- `/proyectos`: portafolio público con proyectos, filtros por categoría y botones funcionales.
- `/proyectos/[slug]`: detalle público de cada proyecto.
- `/admin/login`: login privado de administrador con GitHub OAuth.
- `/admin/proyectos`: panel privado para crear, editar y eliminar proyectos.

El acceso de administración no aparece en la navegación pública. Para entrar al panel debes abrir `/admin/login` o `/admin/proyectos`.

## Probar el login de administrador

1. Confirma que `ADMIN_EMAIL` sea el correo principal o público de tu cuenta de GitHub.
2. Abre:

```text
http://localhost:3000/admin/login
```

3. Haz clic en **Ingresar con GitHub**.
4. Autoriza la aplicación en GitHub.
5. Si el correo coincide con `ADMIN_EMAIL`, entrarás a:

```text
http://localhost:3000/admin/proyectos
```

Si la cuenta autenticada no coincide, verás el mensaje **No autorizado**.

## Administración de proyectos

Desde `/admin/proyectos` puedes:

- Ver proyectos
- Agregar proyectos
- Editar proyectos
- Eliminar proyectos
- Marcar proyectos como destacados para el inicio
- Cerrar sesión

No se guardan contraseñas en la base de datos. El acceso usa GitHub OAuth y una validación por correo con `ADMIN_EMAIL`.

## Prisma Studio

```bash
npm run db:studio
```

## Compilación de producción

```bash
npm run build
```

```bash
npm run start
```

## Despliegue en Vercel

1. Sube el proyecto a un repositorio de GitHub.
2. Importa el repositorio en Vercel.
3. Agrega las variables de entorno:
   `DATABASE_URL`, `GITHUB_ID`, `GITHUB_SECRET`, `AUTH_SECRET`, `AUTH_URL` y `ADMIN_EMAIL`.
4. Configura en GitHub el callback de producción:

```text
https://tu-dominio.com/api/auth/callback/github
```

5. Ejecuta migraciones y seed contra tu base de datos.
6. Despliega el sitio.
