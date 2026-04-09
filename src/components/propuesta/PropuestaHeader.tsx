import Image from 'next/image';

export function PropuestaHeader() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <Image src="/favicon.png" alt="Haiku" width={32} height={32} />
        <span className="font-display font-bold text-haiku-black">Haiku Business</span>
      </div>
      <span className="text-xs text-gray-400 font-body uppercase tracking-wider">
        Propuesta Comercial
      </span>
    </header>
  );
}
