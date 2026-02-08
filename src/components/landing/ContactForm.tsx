'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, ChevronDown, Search } from 'lucide-react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 30;

const COUNTRY_CODES = [
  // Latinoamérica - Sudamérica
  { code: '+51', country: 'PE', flag: '🇵🇪', name: 'Perú', placeholder: '999 999 999' },
  { code: '+54', country: 'AR', flag: '🇦🇷', name: 'Argentina', placeholder: '11 2345 6789' },
  { code: '+55', country: 'BR', flag: '🇧🇷', name: 'Brasil', placeholder: '11 99999 9999' },
  { code: '+56', country: 'CL', flag: '🇨🇱', name: 'Chile', placeholder: '9 1234 5678' },
  { code: '+57', country: 'CO', flag: '🇨🇴', name: 'Colombia', placeholder: '312 345 6789' },
  { code: '+593', country: 'EC', flag: '🇪🇨', name: 'Ecuador', placeholder: '99 999 9999' },
  { code: '+591', country: 'BO', flag: '🇧🇴', name: 'Bolivia', placeholder: '7123 4567' },
  { code: '+595', country: 'PY', flag: '🇵🇾', name: 'Paraguay', placeholder: '981 123 456' },
  { code: '+598', country: 'UY', flag: '🇺🇾', name: 'Uruguay', placeholder: '94 123 456' },
  { code: '+58', country: 'VE', flag: '🇻🇪', name: 'Venezuela', placeholder: '412 123 4567' },
  { code: '+592', country: 'GY', flag: '🇬🇾', name: 'Guyana', placeholder: '612 3456' },
  { code: '+597', country: 'SR', flag: '🇸🇷', name: 'Surinam', placeholder: '741 2345' },
  // Latinoamérica - Centroamérica
  { code: '+52', country: 'MX', flag: '🇲🇽', name: 'México', placeholder: '55 1234 5678' },
  { code: '+502', country: 'GT', flag: '🇬🇹', name: 'Guatemala', placeholder: '5123 4567' },
  { code: '+503', country: 'SV', flag: '🇸🇻', name: 'El Salvador', placeholder: '7012 3456' },
  { code: '+504', country: 'HN', flag: '🇭🇳', name: 'Honduras', placeholder: '9123 4567' },
  { code: '+505', country: 'NI', flag: '🇳🇮', name: 'Nicaragua', placeholder: '8123 4567' },
  { code: '+506', country: 'CR', flag: '🇨🇷', name: 'Costa Rica', placeholder: '8312 3456' },
  { code: '+507', country: 'PA', flag: '🇵🇦', name: 'Panamá', placeholder: '6123 4567' },
  { code: '+501', country: 'BZ', flag: '🇧🇿', name: 'Belice', placeholder: '622 1234' },
  // Caribe
  { code: '+53', country: 'CU', flag: '🇨🇺', name: 'Cuba', placeholder: '5 123 4567' },
  { code: '+1809', country: 'DO', flag: '🇩🇴', name: 'República Dominicana', placeholder: '809 123 4567' },
  { code: '+509', country: 'HT', flag: '🇭🇹', name: 'Haití', placeholder: '34 12 3456' },
  { code: '+1787', country: 'PR', flag: '🇵🇷', name: 'Puerto Rico', placeholder: '787 123 4567' },
  { code: '+1876', country: 'JM', flag: '🇯🇲', name: 'Jamaica', placeholder: '876 123 4567' },
  { code: '+1868', country: 'TT', flag: '🇹🇹', name: 'Trinidad y Tobago', placeholder: '868 123 4567' },
  // Norteamérica & Europa
  { code: '+1', country: 'US', flag: '🇺🇸', name: 'Estados Unidos', placeholder: '202 555 0123' },
  { code: '+1', country: 'CA', flag: '🇨🇦', name: 'Canadá', placeholder: '416 555 0123' },
  { code: '+34', country: 'ES', flag: '🇪🇸', name: 'España', placeholder: '612 345 678' },
  { code: '+44', country: 'GB', flag: '🇬🇧', name: 'Reino Unido', placeholder: '7911 123456' },
  { code: '+49', country: 'DE', flag: '🇩🇪', name: 'Alemania', placeholder: '151 1234 5678' },
  { code: '+33', country: 'FR', flag: '🇫🇷', name: 'Francia', placeholder: '6 12 34 56 78' },
  { code: '+39', country: 'IT', flag: '🇮🇹', name: 'Italia', placeholder: '312 345 6789' },
  { code: '+351', country: 'PT', flag: '🇵🇹', name: 'Portugal', placeholder: '912 345 678' },
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    countryCode: '+51',
    whatsapp: '',
    mensaje: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedCountry = COUNTRY_CODES.find(c => c.code === formData.countryCode) || COUNTRY_CODES[0];

  const filteredCountries = countrySearch
    ? COUNTRY_CODES.filter(c =>
        c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
        c.code.includes(countrySearch) ||
        c.country.toLowerCase().includes(countrySearch.toLowerCase())
      )
    : COUNTRY_CODES;

  // Auto-focus search input when dropdown opens
  useEffect(() => {
    if (dropdownOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    if (!dropdownOpen) setCountrySearch('');
  }, [dropdownOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (formData.nombre.trim().length < 2) {
      newErrors.nombre = 'Ingresa tu nombre';
    }

    if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    if (formData.whatsapp && (formData.whatsapp.length < 7 || formData.whatsapp.length > 15)) {
      newErrors.whatsapp = 'Ingresa un número válido (7 a 15 dígitos)';
    }

    if (formData.mensaje.trim().length < MIN_MESSAGE_LENGTH) {
      newErrors.mensaje = `Cuéntanos más (mínimo ${MIN_MESSAGE_LENGTH} caracteres)`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (value: string) => {
    // Only allow digits
    const digitsOnly = value.replace(/\D/g, '');
    setFormData({ ...formData, whatsapp: digitsOnly });
    if (errors.whatsapp) setErrors({ ...errors, whatsapp: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const fullWhatsapp = formData.whatsapp
        ? `${formData.countryCode} ${formData.whatsapp}`
        : '';
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          whatsapp: fullWhatsapp,
          mensaje: formData.mensaje,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch {
      // Silently handle - user sees no change
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-6 py-4 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-haiku-mint focus:border-haiku-mint bg-white text-gray-700 placeholder:text-gray-400 ${
      errors[field] ? 'border-red-400' : 'border-gray-300'
    }`;

  if (submitted) {
    return (
      <section id="contacto" className="py-14 lg:py-20">
        <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center">
          <AnimatedSection>
            <div className="bg-white rounded-[24px] p-12 shadow-lg">
              <CheckCircle className="w-16 h-16 text-haiku-mint mx-auto mb-6" />
              <h2 className="font-display text-3xl font-bold text-haiku-black mb-4">
                ¡Mensaje enviado!
              </h2>
              <p className="text-lg text-gray-600">
                Gracias por escribirnos. Te responderemos en menos de 24 horas.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Text */}
          <AnimatedSection direction="up">
            <p className="text-sm font-semibold tracking-widest text-haiku-mint uppercase mb-3">
              Contacto
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-haiku-black mb-6">
              Hablemos de tu negocio
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Cuéntanos qué necesitas y te respondemos con una propuesta personalizada. Sin compromiso, sin letra chica.
            </p>
            <div className="space-y-4 text-gray-600">
              <p className="flex items-center gap-3">
                <span className="w-2 h-2 bg-haiku-mint rounded-full" />
                Respuesta en menos de 24 horas
              </p>
              <p className="flex items-center gap-3">
                <span className="w-2 h-2 bg-haiku-mint rounded-full" />
                Diagnóstico gratuito de automatización
              </p>
              <p className="flex items-center gap-3">
                <span className="w-2 h-2 bg-haiku-mint rounded-full" />
                Sin compromiso
              </p>
            </div>
          </AnimatedSection>

          {/* Right - Form */}
          <AnimatedSection direction="up" delay={0.15}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-white rounded-2xl sm:rounded-[24px] p-5 sm:p-8 lg:p-10 shadow-lg space-y-4"
            >
              {/* Nombre */}
              <div>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => {
                    setFormData({ ...formData, nombre: e.target.value });
                    if (errors.nombre) setErrors({ ...errors, nombre: '' });
                  }}
                  placeholder="Tu nombre *"
                  className={inputClass('nombre')}
                />
                {errors.nombre && (
                  <p className="text-red-500 text-sm mt-1.5 ml-1">{errors.nombre}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="Tu email *"
                  className={inputClass('email')}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1.5 ml-1">{errors.email}</p>
                )}
              </div>

              {/* WhatsApp */}
              <div>
                <div className={`flex items-stretch border rounded-xl focus-within:ring-2 focus-within:ring-haiku-mint focus-within:border-haiku-mint ${errors.whatsapp ? 'border-red-400' : 'border-gray-300'}`}>
                  {/* Country code selector */}
                  <div ref={dropdownRef} className="relative flex">
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-1.5 px-4 bg-gray-50 hover:bg-gray-100 transition-colors border-r border-gray-300 rounded-l-xl text-sm font-medium text-gray-700 min-w-[110px]"
                    >
                      <span className="text-lg leading-none">{selectedCountry.flag}</span>
                      <span>{selectedCountry.code}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
                        >
                          {/* Search input */}
                          <div className="sticky top-0 bg-white border-b border-gray-100 p-2">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                              <input
                                ref={searchInputRef}
                                type="text"
                                value={countrySearch}
                                onChange={(e) => setCountrySearch(e.target.value)}
                                placeholder="Buscar país..."
                                className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-haiku-mint bg-gray-50 text-gray-700 placeholder:text-gray-400"
                              />
                            </div>
                          </div>
                          {/* Country list */}
                          <div className="max-h-52 overflow-y-auto">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((c) => (
                                <button
                                  key={c.code + c.country}
                                  type="button"
                                  onClick={() => {
                                    setFormData({ ...formData, countryCode: c.code });
                                    setDropdownOpen(false);
                                  }}
                                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-haiku-mint/10 transition-colors ${
                                    formData.countryCode === c.code ? 'bg-haiku-mint/10 text-haiku-mint font-medium' : 'text-gray-700'
                                  }`}
                                >
                                  <span className="text-lg leading-none">{c.flag}</span>
                                  <span className="flex-1 text-left">{c.name}</span>
                                  <span className="text-gray-400 text-xs">{c.code}</span>
                                </button>
                              ))
                            ) : (
                              <p className="px-4 py-3 text-sm text-gray-400 text-center">No se encontró el país</p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {/* Phone number input (digits only) */}
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={formData.whatsapp}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder={selectedCountry.placeholder}
                    className="flex-1 px-4 py-4 text-base focus:outline-none bg-white text-gray-700 placeholder:text-gray-400 rounded-r-xl"
                  />
                </div>
                {errors.whatsapp && (
                  <p className="text-red-500 text-sm mt-1.5 ml-1">{errors.whatsapp}</p>
                )}
              </div>

              {/* Mensaje */}
              <div>
                <textarea
                  value={formData.mensaje}
                  onChange={(e) => {
                    setFormData({ ...formData, mensaje: e.target.value });
                    if (errors.mensaje) setErrors({ ...errors, mensaje: '' });
                  }}
                  placeholder="Cuéntanos sobre tu negocio y qué necesitas... *"
                  rows={4}
                  className={`${inputClass('mensaje')} resize-none`}
                />
                <div className="flex justify-between items-center mt-1.5 mx-1">
                  {errors.mensaje ? (
                    <p className="text-red-500 text-sm">{errors.mensaje}</p>
                  ) : (
                    <span />
                  )}
                  <p className={`text-xs ${formData.mensaje.trim().length >= MIN_MESSAGE_LENGTH ? 'text-haiku-mint' : 'text-gray-400'}`}>
                    {formData.mensaje.trim().length}/{MIN_MESSAGE_LENGTH} min
                  </p>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-haiku-mint text-white font-semibold rounded-full hover:bg-[#009160] transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? 'Enviando...' : (
                  <>
                    Enviar Mensaje <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
