'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  PAISES,
  getPrecioTemplate,
  type MasivosInputs,
  type MasivosConfigAvanzada,
  MASIVOS_CONFIG_DEFAULTS,
} from '@/lib/calculadora-mensajes-masivos';

interface MasivosInputsFormProps {
  onCalculate: (inputs: MasivosInputs, config: MasivosConfigAvanzada) => void;
}

function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  placeholder,
  min,
  max,
  step,
}: {
  label: string;
  value: number | '';
  onChange: (v: number | '') => void;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`w-full py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#00A86B] focus:border-[#00A86B] bg-white text-gray-700 placeholder:text-gray-400 ${
            prefix ? 'pl-12 pr-4' : suffix ? 'pl-4 pr-12' : 'px-4'
          }`}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export function MasivosInputsForm({ onCalculate }: MasivosInputsFormProps) {
  const [pais, setPais] = useState('PE');
  const [contactos, setContactos] = useState<number | ''>('');
  const [precioPromedio, setPrecioPromedio] = useState<number | ''>('');
  const [tasaRecuperacion, setTasaRecuperacion] = useState<number | ''>(5);
  const [gastoMensualAds, setGastoMensualAds] = useState<number | ''>('');
  const [leadsNuevosMes, setLeadsNuevosMes] = useState<number | ''>('');

  const [showAvanzada, setShowAvanzada] = useState(false);
  const [config, setConfig] = useState<MasivosConfigAvanzada>({
    ...MASIVOS_CONFIG_DEFAULTS,
  });

  // Actualizar precio de template cuando cambia el país
  const handlePaisChange = (newPais: string) => {
    setPais(newPais);
    setConfig((c) => ({ ...c, costoTemplate: getPrecioTemplate(newPais) }));
  };

  const isValid =
    contactos !== '' && contactos > 0 &&
    precioPromedio !== '' && precioPromedio > 0 &&
    tasaRecuperacion !== '' && tasaRecuperacion > 0 && tasaRecuperacion <= 100 &&
    gastoMensualAds !== '' && gastoMensualAds > 0 &&
    leadsNuevosMes !== '' && leadsNuevosMes > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onCalculate(
      {
        pais,
        contactos: contactos as number,
        precioPromedio: precioPromedio as number,
        tasaRecuperacion: (tasaRecuperacion as number) / 100,
        gastoMensualAds: gastoMensualAds as number,
        leadsNuevosMes: leadsNuevosMes as number,
      },
      config,
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        {/* País */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">País</label>
          <select
            value={pais}
            onChange={(e) => handlePaisChange(e.target.value)}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#00A86B] bg-white text-gray-700"
          >
            {PAISES.map((p) => (
              <option key={p.code} value={p.code}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>

        <NumberField
          label="Contactos a los que quieres escribir"
          value={contactos}
          onChange={setContactos}
          placeholder="Ej: 1000"
          min={1}
        />

        <NumberField
          label="Precio promedio de lo que vendes"
          value={precioPromedio}
          onChange={setPrecioPromedio}
          prefix="$"
          placeholder="Ej: 50"
          min={1}
        />

        <NumberField
          label="Tasa de recuperación esperada"
          value={tasaRecuperacion}
          onChange={setTasaRecuperacion}
          suffix="%"
          placeholder="Ej: 5"
          min={1}
          max={100}
        />

        <NumberField
          label="Gasto mensual en ads"
          value={gastoMensualAds}
          onChange={setGastoMensualAds}
          prefix="$"
          placeholder="Ej: 500"
          min={0}
        />

        <NumberField
          label="Leads nuevos que consigues al mes"
          value={leadsNuevosMes}
          onChange={setLeadsNuevosMes}
          placeholder="Ej: 200"
          min={1}
        />
      </div>

      {/* Configuración avanzada */}
      <div className="border-t border-gray-200 pt-4">
        <button
          type="button"
          onClick={() => setShowAvanzada(!showAvanzada)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          {showAvanzada ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          Configuración avanzada
        </button>

        {showAvanzada && (
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <NumberField
              label="Costo por template Meta (USD)"
              value={Math.round(config.costoTemplate * 10000) / 10000}
              onChange={(v) =>
                setConfig((c) => ({ ...c, costoTemplate: v === '' ? 0.0466 : v }))
              }
              prefix="$"
              step={0.001}
              min={0.001}
            />
            <NumberField
              label="Tasa de cierre sobre leads recuperados (%)"
              value={Math.round(config.tasaCierreRecuperados * 100)}
              onChange={(v) =>
                setConfig((c) => ({
                  ...c,
                  tasaCierreRecuperados: v === '' ? 0.1 : v / 100,
                }))
              }
              suffix="%"
              min={1}
              max={100}
            />
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid}
        className="w-full sm:w-auto px-8 py-4 bg-[#00A86B] text-white font-semibold rounded-full hover:bg-[#009160] transition-all text-lg disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Calcular mi envío masivo
      </button>
    </form>
  );
}
