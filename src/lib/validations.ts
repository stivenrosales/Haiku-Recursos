import { z } from 'zod';

export const leadSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  whatsapp: z.string().min(10, 'Número de WhatsApp inválido'),
  slug: z.string().min(1, 'Slug requerido'),
});

export const recursoSchema = z.object({
  titulo: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  slug: z
    .string()
    .min(1, 'El slug es requerido')
    .regex(/^[a-z0-9-]+$/, 'Solo letras minúsculas, números y guiones'),
  descripcion: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres'),
  urlRecurso: z.string().url('URL inválida'),
  icono: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (!val || val === '' ? null : val)),
  emailAsunto: z
    .string()
    .min(5, 'El asunto debe tener al menos 5 caracteres'),
  emailCuerpo: z.string().min(10, 'El cuerpo debe tener al menos 10 caracteres'),
  activo: z.boolean().default(true),
});

export const emailSchema = z.object({
  leadIds: z.array(z.string()).min(1, 'Selecciona al menos un lead'),
  asunto: z.string().min(5, 'El asunto debe tener al menos 5 caracteres'),
  cuerpo: z.string().min(10, 'El cuerpo debe tener al menos 10 caracteres'),
});
