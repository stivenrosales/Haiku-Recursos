'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InputsForm } from './InputsForm';
import { ResultadosDisplay } from './ResultadosDisplay';
import {
  calcular,
  type CalculadoraInputs,
  type ConfigAvanzada,
  type ResultadoCalculadora,
} from '@/lib/calculadora-punto-de-quiebre';

export function CalculadoraPuntoDeQuiebre() {
  const [resultado, setResultado] = useState<ResultadoCalculadora | null>(null);

  const handleCalculate = (inputs: CalculadoraInputs, config: ConfigAvanzada) => {
    const result = calcular(inputs, config);
    setResultado(result);
  };

  const handleRecalcular = () => {
    setResultado(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 leading-tight">
          ¿Ya pasaste tu punto de quiebre?
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Mete tus números reales y descubre si estás perdiendo plata por no automatizar
          tu atención por WhatsApp.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {resultado === null ? (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <InputsForm onCalculate={handleCalculate} />
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ResultadosDisplay resultado={resultado} onRecalcular={handleRecalcular} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
