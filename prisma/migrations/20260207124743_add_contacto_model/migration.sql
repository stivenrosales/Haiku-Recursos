-- CreateTable
CREATE TABLE "Contacto" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT,
    "mensaje" TEXT NOT NULL,
    "leido" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contacto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Contacto_email_idx" ON "Contacto"("email");

-- CreateIndex
CREATE INDEX "Contacto_createdAt_idx" ON "Contacto"("createdAt");
