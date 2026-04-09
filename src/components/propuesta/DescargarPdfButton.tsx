'use client';

import { Download } from 'lucide-react';

export function DescargarPdfButton({ clienteNombre }: { clienteNombre: string }) {
  const handleDownload = () => {
    document.title = `Propuesta - ${clienteNombre} - Haiku`;
    window.print();
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 bg-haiku-black text-white font-display font-semibold px-5 py-2.5 rounded-full shadow-lg hover:opacity-90 transition-opacity text-sm"
    >
      <Download className="w-4 h-4" />
      Descargar PDF
    </button>
  );
}
