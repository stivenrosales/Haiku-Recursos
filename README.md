# Haiku Business - Sistema de Landing Pages

Sistema completo de landing pages con captura de leads y panel de administración para Haiku Business.

## 🚀 Stack Técnico

- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS + Shadcn/ui
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Autenticación**: NextAuth.js
- **Emails**: Resend + React Email
- **Validación**: Zod + React Hook Form

## ⚙️ Configuración Inicial

### 1. Configurar Base de Datos PostgreSQL (Neon)

1. Ve a [neon.tech](https://neon.tech)
2. Crea una cuenta (puedes usar GitHub login)
3. Crea un nuevo proyecto llamado "haiku-landings"
4. Copia el **DATABASE_URL** (connection string)
5. Pégalo en [.env.local](.env.local:3)

### 2. Configurar Resend (Envío de Emails)

1. Ve a [resend.com](https://resend.com)
2. Crea una cuenta (GitHub o email)
3. Verifica tu email
4. Ve a Dashboard → API Keys → Create API Key
5. Copia el API key (empieza con `re_`)
6. Pégalo en [.env.local](.env.local:10)

**Nota**: Para desarrollo, puedes usar `onboarding@resend.dev` como email de envío. Para producción, necesitarás verificar tu dominio.

### 3. Aplicar Migraciones y Seed

Una vez configuradas las variables de entorno, ejecuta:

```bash
# Generar cliente de Prisma
npx prisma generate

# Aplicar migraciones (crear tablas)
npx prisma migrate dev --name init

# Poblar base de datos con datos iniciales
npm run db:seed
```

Esto creará:
- ✅ Usuario admin (email: admin@haiku.pe, password: admin123)
- ✅ Recurso de ejemplo en `/r/guia-automatizacion`

## 🏃 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Ver base de datos (Prisma Studio)
npm run db:studio

# Verificar tipos TypeScript
npx tsc --noEmit
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
├── prisma/
│   ├── schema.prisma       # Modelo de datos
│   ├── seed.ts             # Datos iniciales
│   └── migrations/         # Migraciones de BD
├── src/
│   ├── app/               # App Router de Next.js
│   │   ├── r/[slug]/      # Landing pages públicas
│   │   ├── api/           # API routes
│   │   └── admin/         # Panel de administración
│   ├── components/
│   │   ├── ui/            # Componentes Shadcn/ui
│   │   ├── landing/       # Componentes de landing
│   │   └── admin/         # Componentes de admin
│   ├── lib/               # Utilidades y configs
│   └── types/             # TypeScript types
├── emails/                # Templates de email
└── public/                # Assets estáticos
```

## 🔐 Credenciales por Defecto

**Panel Admin:**
- URL: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Email: `admin@haiku.pe`
- Password: `admin123`

⚠️ **CAMBIAR en producción**

## 🚢 Deployment en Vercel

### Configuración ISR (Incremental Static Regeneration)

Este proyecto usa ISR para las rutas dinámicas (`/r/[slug]`), lo que significa:
- Las páginas se generan automáticamente la primera vez que alguien las visita
- Se revalidan cada 60 segundos para mantener el contenido actualizado
- Las primeras 50 páginas de recursos activos se pre-generan en build time

### Pasos para deployar:

**1. Preparar variables de entorno:**

Asegúrate de tener estas variables configuradas en Vercel:

```env
DATABASE_URL=             # Tu connection string de Neon (producción)
NEXTAUTH_URL=             # https://tu-dominio.vercel.app
NEXTAUTH_SECRET=          # Genera uno nuevo: openssl rand -base64 32
RESEND_API_KEY=           # Tu API key de Resend
RESEND_FROM_EMAIL=        # Tu email verificado (ej: recursos@tudominio.com)
NEXT_PUBLIC_APP_URL=      # https://tu-dominio.vercel.app
```

**2. Deploy desde Vercel:**

```bash
# Opción A: CLI de Vercel
npm install -g vercel
vercel

# Opción B: Desde GitHub
# 1. Ve a vercel.com
# 2. Importa este repositorio
# 3. Configura las variables de entorno
# 4. Deploy automático
```

**3. Después del deploy:**

Las migraciones de Prisma se aplicarán automáticamente durante el build gracias al script `prisma generate` en `package.json`.

**4. Verificar dominio en Resend:**

Para envío de emails en producción:
1. Ve a Resend → Domains
2. Agrega tu dominio
3. Configura registros DNS (SPF, DKIM, DMARC)
4. Verifica el dominio
5. Actualiza `RESEND_FROM_EMAIL` con tu dominio verificado

### Troubleshooting

**Error de conexión a BD:**
- Verifica que `DATABASE_URL` incluya `?sslmode=require` al final
- Usa el connection string de Neon para producción

**Recursos nuevos no aparecen:**
- Espera 60 segundos (tiempo de revalidación ISR)
- O visita la URL directamente para forzar generación

**Emails no se envían:**
- Verifica API key de Resend
- Asegura que `RESEND_FROM_EMAIL` esté verificado
- Para pruebas, usa `onboarding@resend.dev`

## 📝 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Build para producción
npm run start        # Iniciar en producción
npm run lint         # ESLint
npm run db:push      # Push cambios sin migración
npm run db:seed      # Ejecutar seed
npm run db:studio    # Prisma Studio (GUI)
```

## 🎨 Colores de Marca

- **Verde Haiku**: `#00A86B`
- **Negro**: `#171717`
- **Beige**: `#FAF9F6`

## 📧 Contacto

**Fundador**: Stiven Rosales
**Empresa**: Haiku Business
**Sitio**: haiku.pe
