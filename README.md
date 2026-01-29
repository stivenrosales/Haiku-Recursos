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

## 🚢 Deployment

Ver el plan de implementación completo en [~/.claude/plans/floofy-growing-neumann.md](/Users/stivenkevinrosalescasas/.claude/plans/floofy-growing-neumann.md)

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

- **Verde Menta**: `#72e3ad`
- **Negro**: `#171717`

## 📧 Contacto

**Fundador**: Stiven Rosales
**Empresa**: Haiku Business
**Sitio**: haiku.pe
