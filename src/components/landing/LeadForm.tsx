'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import PhoneInput from 'react-phone-number-input';
import { isPossiblePhoneNumber } from 'libphonenumber-js';
import 'react-phone-number-input/style.css';

interface LeadFormProps {
  slug: string;
  titulo: string;
  recursoUrl: string;
}

export function LeadForm({ slug, titulo, recursoUrl }: LeadFormProps) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const { toast } = useToast();

  const validatePhone = (value: string | undefined) => {
    if (!value) {
      setPhoneError('WhatsApp es requerido');
      return false;
    }
    if (!isPossiblePhoneNumber(value)) {
      setPhoneError('Número de WhatsApp inválido');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar teléfono antes de enviar
    if (!validatePhone(whatsapp)) {
      toast({
        title: 'Error',
        description: phoneError,
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          email,
          whatsapp,
          slug
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        toast({
          title: '¡Éxito!',
          description: data.message,
        });
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Error al procesar solicitud',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error de conexión',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center lg:text-left space-y-6 py-8">
        <div className="text-6xl mb-4">✨</div>
        <h3 className="text-3xl font-bold text-gray-900">
          ¡Listo!
        </h3>
        <p className="text-lg text-gray-600">
          Te envié <strong>{titulo}</strong> a tu email
        </p>
        <a
          href={recursoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6"
        >
          <button className="px-8 py-4 bg-[#00A86B] text-white font-semibold rounded-full hover:bg-[#009160] transition-all text-lg">
            Acceder al Recurso →
          </button>
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Nombre */}
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Tu nombre *"
        required
        className="w-full px-6 py-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#00A86B] focus:border-[#00A86B] bg-white text-gray-700 placeholder:text-gray-400"
      />

      {/* Email */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Tu email *"
        required
        className="w-full px-6 py-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#00A86B] focus:border-[#00A86B] bg-white text-gray-700 placeholder:text-gray-400"
      />

      {/* WhatsApp con selector de país */}
      <div className="phone-input-wrapper">
        <PhoneInput
          international
          defaultCountry="PE"
          value={whatsapp}
          onChange={(value) => {
            setWhatsapp(value || '');
            if (value) validatePhone(value);
          }}
          placeholder="Tu WhatsApp *"
          className="phone-input"
        />
        {phoneError && (
          <p className="text-red-500 text-xs mt-1">{phoneError}</p>
        )}
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-8 py-4 bg-[#00A86B] text-white font-semibold rounded-full hover:bg-[#009160] transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Enviando...' : 'Obtener Recurso Gratis →'}
      </button>

      <p className="text-xs text-gray-500 leading-relaxed pt-2">
        Al enviar recibirás el recurso gratis directamente en tu email. Sin spam. 🎁
      </p>

      <style jsx global>{`
        .phone-input-wrapper {
          position: relative;
        }

        /* Override any default styles from react-phone-number-input */
        .phone-input,
        .phone-input * {
          box-sizing: border-box;
        }

        .phone-input {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 1rem 1.5rem;
          border: 1px solid rgb(209 213 219);
          border-radius: 0.375rem;
          background-color: #ffffff !important;
          transition: all 0.2s;
        }

        .phone-input:focus-within {
          outline: none;
          border-color: #00A86B;
          box-shadow: 0 0 0 2px rgba(0, 168, 107, 0.1);
        }

        .phone-input .PhoneInputCountry {
          margin-right: 0.75rem;
          display: flex;
          align-items: center;
          background: transparent;
        }

        .phone-input .PhoneInputCountryIcon {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 2px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          background: transparent;
        }

        .phone-input .PhoneInputCountrySelect {
          border: none;
          background: transparent !important;
          font-size: 1rem;
          cursor: pointer;
          padding: 0;
          margin: 0;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
        }

        .phone-input .PhoneInputCountrySelect:focus {
          background: transparent !important;
        }

        .phone-input .PhoneInputCountrySelectArrow {
          display: none;
        }

        .phone-input .PhoneInputInput {
          flex: 1;
          border: none;
          background: transparent !important;
          font-size: 1rem;
          color: rgb(55 65 81);
          outline: none;
          padding: 0;
          margin: 0;
        }

        .phone-input .PhoneInputInput:focus {
          background: transparent !important;
        }

        .phone-input .PhoneInputInput::placeholder {
          color: rgb(156 163 175);
        }

        /* Remove any default backgrounds that might be applied */
        .PhoneInput {
          background: transparent !important;
        }
      `}</style>
    </form>
  );
}
