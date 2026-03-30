'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { CalculadoraInputs, ConfigAvanzada } from '@/lib/calculadora-punto-de-quiebre';
import { CONFIG_DEFAULTS } from '@/lib/calculadora-punto-de-quiebre';

interface InputsFormProps {
  onCalculate: (inputs: CalculadoraInputs, config: ConfigAvanzada) => void;
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

export function InputsForm({ onCalculate }: InputsFormProps) {
  const [leadsPorDia, setLeadsPorDia] = useState<number | ''>('');
  const [numVendedores, setNumVendedores] = useState<number | ''>('');
  const [gastoMensualAds, setGastoMensualAds] = useState<number | ''>('');
  const [salarioMensualVendedor, setSalarioMensualVendedor] = useState<number | ''>('');
  const [ticketPromedio, setTicketPromedio] = useState<number | ''>('');
  const [horaInicio, setHoraInicio] = useState(9);
  const [horaFin, setHoraFin] = useState(18);

  const [showAvanzada, setShowAvanzada] = useState(false);
  const [config, setConfig] = useState<ConfigAvanzada>({ ...CONFIG_DEFAULTS });

  const isValid =
    leadsPorDia !== '' && leadsPorDia > 0 &&
    numVendedores !== '' && numVendedores > 0 &&
    gastoMensualAds !== '' && gastoMensualAds > 0 &&
    salarioMensualVendedor !== '' && salarioMensualVendedor > 0 &&
    ticketPromedio !== '' && ticketPromedio > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onCalculate(
      {
        leadsPorDia: leadsPorDia as number,
        numVendedores: numVendedores as number,
        gastoMensualAds: gastoMensualAds as number,
        salarioMensualVendedor: salarioMensualVendedor as number,
        ticketPromedio: ticketPromedio as number,
        horaInicio,
        horaFin,
      },
      config,
    );
  };

  const horas = Array.from({ length: 24 }, (_, i) => i);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <NumberField
          label="Leads por WhatsApp al día"
          value={leadsPorDia}
          onChange={setLeadsPorDia}
          placeholder="Ej: 80"
          min={1}
        />
        <NumberField
          label="Vendedores"
          value={numVendedores}
          onChange={setNumVendedores}
          placeholder="Ej: 2"
          min={1}
        />
        <NumberField
          label="Gasto mensual en ads"
          value={gastoMensualAds}
          onChange={setGastoMensualAds}
          prefix="S/."
          placeholder="Ej: 3000"
          min={0}
        />
        <NumberField
          label="Salario mensual por vendedor"
          value={salarioMensualVendedor}
          onChange={setSalarioMensualVendedor}
          prefix="S/."
          placeholder="Ej: 1500"
          min={0}
        />
        <NumberField
          label="Precio promedio de lo que vendes"
          value={ticketPromedio}
          onChange={setTicketPromedio}
          prefix="S/."
          placeholder="Ej: 200"
          min={1}
        />

        {/* Horario de atención */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            Horario de atención
          </label>
          <div className="flex items-center gap-2">
            <select
              value={horaInicio}
              onChange={(e) => setHoraInicio(Number(e.target.value))}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#00A86B] bg-white text-gray-700"
            >
              {horas.map((h) => (
                <option key={h} value={h}>
                  {String(h).padStart(2, '0')}:00
                </option>
              ))}
            </select>
            <span className="text-gray-400">a</span>
            <select
              value={horaFin}
              onChange={(e) => setHoraFin(Number(e.target.value))}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#00A86B] bg-white text-gray-700"
            >
              {horas.map((h) => (
                <option key={h} value={h}>
                  {String(h).padStart(2, '0')}:00
                </option>
              ))}
            </select>
          </div>
        </div>
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
              label="Conversaciones/día por vendedor"
              value={config.convsVendedorDia}
              onChange={(v) =>
                setConfig((c) => ({ ...c, convsVendedorDia: v === '' ? 35 : v }))
              }
              min={1}
            />
            <NumberField
              label="Tasa de cierre vendedor (%)"
              value={Math.round(config.tasaCierreVendedor * 100)}
              onChange={(v) =>
                setConfig((c) => ({
                  ...c,
                  tasaCierreVendedor: v === '' ? 0.1 : v / 100,
                }))
              }
              suffix="%"
              min={1}
              max={100}
            />
            <NumberField
              label="Tasa de cierre con bot (%)"
              value={Math.round(config.tasaCierreBot * 100)}
              onChange={(v) =>
                setConfig((c) => ({
                  ...c,
                  tasaCierreBot: v === '' ? 0.3 : v / 100,
                }))
              }
              suffix="%"
              min={1}
              max={100}
            />
            <NumberField
              label="Efectividad en lead frío (%)"
              value={Math.round(config.penalizacionLeadFrio * 100)}
              onChange={(v) =>
                setConfig((c) => ({
                  ...c,
                  penalizacionLeadFrio: v === '' ? 0.33 : v / 100,
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
        Calcular mi punto de quiebre
      </button>
    </form>
  );
}
