# Calculadora "Mensajes Masivos sin Baneo"

## Objetivo

Herramienta interactiva pública para nutrición de audiencia. El usuario mete cuántos contactos quiere reactivar y ve si le conviene más enviar templates oficiales de WhatsApp vs gastar en ads para conseguir leads nuevos. Incluye recomendación de plan Haiku.

No captura leads. Sin gate. Contenido abierto para SEO y tráfico desde redes.

## Ruta

`/calculadoras/mensajes-masivos`

## Inputs del usuario

| Campo | Tipo | Default | Requerido |
|-------|------|---------|-----------|
| País | selector (Latam) | Perú | sí |
| Contactos a los que quieres escribir | número | — | sí |
| Precio promedio de lo que vendes (USD) | número | — | sí |
| Tasa de recuperación esperada (%) | número | 5% | sí |
| Gasto mensual en ads (USD) | número | — | sí |
| Leads nuevos que consigues al mes | número | — | sí |

## Configuración avanzada (colapsada)

| Parámetro | Default | Nota |
|-----------|---------|------|
| Costo por template Meta (USD) | auto según país | Editable |
| Tasa de cierre sobre leads recuperados | 10% | Leads fríos, más conservador |

## Precios template Meta por país (USD, marketing)

Perú, Colombia, Ecuador, Bolivia, Paraguay: ~$0.0466
México: ~$0.0360
Chile: ~$0.0626
Argentina: ~$0.0513
Brasil: ~$0.0500
Uruguay: ~$0.0377

(Verificar precios actuales de Meta antes de implementar)

## Lógica

1. Costo del envío masivo = contactos × precio template del país
2. CPL (costo por lead nuevo) = gasto mensual ads / leads nuevos al mes
3. Leads recuperados = contactos × tasa de recuperación
4. Ventas por reactivación = leads recuperados × tasa de cierre (default 10%)
5. Ingresos por reactivación = ventas × precio promedio
6. Costo equivalente en ads = leads recuperados × CPL
7. ROI del envío = ingresos por reactivación / costo del envío

## Output

### Narrativa
Texto que explica el resultado en lenguaje claro: costo del envío, leads esperados, comparación con ads.

### Tabla comparativa: Reactivar vs Ads nuevos

| | Reactivar con templates | Conseguir con ads |
|--|------------------------|-------------------|
| Costo | costo envío | leads recuperados × CPL |
| Leads | leads recuperados | leads recuperados |
| Costo por lead | costo envío / leads recuperados | CPL |
| Ingresos potenciales | ventas × ticket | ventas × ticket |

### ROI del envío
Ingresos / costo del envío

### Plan Haiku recomendado
Según cantidad de templates: Pro (500 incluidos), Scale (1,500 incluidos), bloques extra ($67/500 templates).

## CTA
"Quiero reactivar mi base" → Cal.com

## Stack
- Página estática Next.js, todo client-side
- Branding Haiku (mint, beige, black)
- Mismo patrón de componentes que /calculadoras/punto-de-quiebre
