'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MasivosInputsForm } from './MasivosInputsForm';
import { MasivosResultados } from './MasivosResultados';
import {
  calcularMasivos,
  type MasivosInputs,
  type MasivosConfigAvanzada,
  type ResultadoMasivos,
} from '@/lib/calculadora-mensajes-masivos';

export function CalculadoraMensajesMasivos() {
  const [resultado, setResultado] = useState<ResultadoMasivos | null>(null);
  const [contactos, setContactos] = useState(0);

  const handleCalculate = (inputs: MasivosInputs, config: MasivosConfigAvanzada) => {
    const result = calcularMasivos(inputs, config);
    setResultado(result);
    setContactos(inputs.contactos);
  };

  const handleRecalcular = () => {
    setResultado(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 leading-tight">
          ¿Te conviene hacer mensajes masivos por WhatsApp?
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Calcula cuánto cuesta reactivar tu base de contactos con templates
          oficiales vs conseguir leads nuevos con ads.
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
            <MasivosInputsForm onCalculate={handleCalculate} />
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MasivosResultados
              resultado={resultado}
              contactos={contactos}
              onRecalcular={handleRecalcular}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
