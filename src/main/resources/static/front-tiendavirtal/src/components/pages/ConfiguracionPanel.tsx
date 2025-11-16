/**
 * Panel de Configuración de la Tienda
 * Permite configurar aspectos generales, de tienda y avanzados
 */

import React, { useState } from 'react';
import { useConfiguracion } from '../../hooks/useConfiguracion';
import type { 
  ConfiguracionGeneral, 
  ConfiguracionTienda, 
  ConfiguracionAvanzada,
  ConfiguracionHero,
  Caracteristica,
  RedSocial,
  Categoria
} from '../../types/configuracion';
import { MONEDAS } from '../../types/configuracion';

type TabType = 'general' | 'tienda' | 'hero' | 'caracteristicas' | 'redesSociales' | 'categorias' | 'avanzada';

export const ConfiguracionPanel: React.FC = () => {
  const { configuracion, loading, actualizarSeccion, resetearConfiguracion } = useConfiguracion();
  const [tabActiva, setTabActiva] = useState<TabType>('general');
  const [guardando, setGuardando] = useState(false);

  // Formularios locales
  const [formGeneral, setFormGeneral] = useState<ConfiguracionGeneral>(configuracion.general);
  const [formTienda, setFormTienda] = useState<ConfiguracionTienda>(configuracion.tienda);
  const [formAvanzada, setFormAvanzada] = useState<ConfiguracionAvanzada>(configuracion.avanzada);
  const [formHero, setFormHero] = useState<ConfiguracionHero>(configuracion.hero);
  const [formCaracteristicas, setFormCaracteristicas] = useState<Caracteristica[]>(configuracion.caracteristicas);
  // const [formEstadisticas, setFormEstadisticas] = useState<Estadistica[]>(configuracion.estadisticas);
  // const [formAbout, setFormAbout] = useState<ConfiguracionAbout>(configuracion.about);
  const [formRedesSociales, setFormRedesSociales] = useState<RedSocial[]>(configuracion.redesSociales);
  const [formCategorias, setFormCategorias] = useState<Categoria[]>(configuracion.categorias);

  // Actualizar formularios cuando cambia la configuración
  React.useEffect(() => {
    setFormGeneral(configuracion.general);
    setFormTienda(configuracion.tienda);
    setFormAvanzada(configuracion.avanzada);
    setFormHero(configuracion.hero);
    setFormCaracteristicas(configuracion.caracteristicas);
    // setFormEstadisticas(configuracion.estadisticas);
    // setFormAbout(configuracion.about);
    setFormRedesSociales(configuracion.redesSociales);
    setFormCategorias(configuracion.categorias);
  }, [configuracion]);

  const handleGuardarGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    const exito = actualizarSeccion('general', formGeneral);
    setGuardando(false);
    if (exito) {
      alert('✅ Configuración general guardada correctamente');
    } else {
      alert('❌ Error al guardar la configuración');
    }
  };

  const handleGuardarTienda = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    const exito = actualizarSeccion('tienda', formTienda);
    setGuardando(false);
    if (exito) {
      alert('✅ Configuración de tienda guardada correctamente');
    } else {
      alert('❌ Error al guardar la configuración');
    }
  };

  const handleGuardarAvanzada = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    const exito = actualizarSeccion('avanzada', formAvanzada);
    setGuardando(false);
    if (exito) {
      alert('✅ Configuración avanzada guardada correctamente');
    } else {
      alert('❌ Error al guardar la configuración');
    }
  };

  const handleResetear = () => {
    if (confirm('¿Estás seguro de resetear toda la configuración a los valores por defecto?')) {
      resetearConfiguracion();
      alert('✅ Configuración reseteada correctamente');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Cargando configuración...</p>
        </div>
      </div>
    );
  }

  const handleGuardarHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    const exito = actualizarSeccion('hero', formHero);
    setGuardando(false);
    if (exito) {
      alert('✅ Contenido del Hero guardado correctamente');
    }
  };

  const handleGuardarCaracteristicas = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    const exito = actualizarSeccion('caracteristicas', formCaracteristicas);
    setGuardando(false);
    if (exito) {
      alert('✅ Características guardadas correctamente');
    }
  };

  const handleGuardarRedesSociales = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    const exito = actualizarSeccion('redesSociales', formRedesSociales);
    setGuardando(false);
    if (exito) {
      alert('✅ Redes sociales guardadas correctamente');
    }
  };

  const handleGuardarCategorias = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    const exito = actualizarSeccion('categorias', formCategorias);
    setGuardando(false);
    if (exito) {
      alert('✅ Categorías guardadas correctamente');
    }
  };

  const tabs = [
    { 
      id: 'general' as TabType, 
      label: 'General', 
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
    },
    { 
      id: 'tienda' as TabType, 
      label: 'Tienda', 
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
    },
    { 
      id: 'hero' as TabType, 
      label: 'Hero', 
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6v6H9z"/></svg>
    },
    { 
      id: 'caracteristicas' as TabType, 
      label: 'Características', 
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    },
    { 
      id: 'redesSociales' as TabType, 
      label: 'Redes', 
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
    },
    { 
      id: 'categorias' as TabType, 
      label: 'Categorías', 
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>
    },
    { 
      id: 'avanzada' as TabType, 
      label: 'Avanzada', 
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Configuración del Sistema</h1>
            <p className="mt-2 text-purple-100">Personaliza tu tienda según tus necesidades</p>
          </div>
          <svg className="w-16 h-16 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTabActiva(tab.id)}
                className={`
                  ${tabActiva === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                  flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors duration-200 flex items-center justify-center space-x-2
                `}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* TAB: General */}
          {tabActiva === 'general' && (
            <form onSubmit={handleGuardarGeneral} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de la Tienda
                  </label>
                  <input
                    type="text"
                    value={formGeneral.nombreTienda}
                    onChange={(e) => setFormGeneral({ ...formGeneral, nombreTienda: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email de Contacto
                  </label>
                  <input
                    type="email"
                    value={formGeneral.emailContacto}
                    onChange={(e) => setFormGeneral({ ...formGeneral, emailContacto: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formGeneral.telefono}
                    onChange={(e) => setFormGeneral({ ...formGeneral, telefono: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formGeneral.whatsapp}
                    onChange={(e) => setFormGeneral({ ...formGeneral, whatsapp: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección
                  </label>
                  <input
                    type="text"
                    value={formGeneral.direccion}
                    onChange={(e) => setFormGeneral({ ...formGeneral, direccion: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Año de Fundación
                  </label>
                  <input
                    type="text"
                    value={formGeneral.añoFundacion}
                    onChange={(e) => setFormGeneral({ ...formGeneral, añoFundacion: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="2020"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slogan
                  </label>
                  <input
                    type="text"
                    value={formGeneral.slogan}
                    onChange={(e) => setFormGeneral({ ...formGeneral, slogan: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Tu tienda de tecnología y gaming"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Negocio
                  </label>
                  <select
                    value={formGeneral.tipoNegocio}
                    onChange={(e) => setFormGeneral({ ...formGeneral, tipoNegocio: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="gaming">Gaming</option>
                    <option value="ropa">Ropa</option>
                    <option value="tecnologia">Tecnología</option>
                    <option value="hogar">Hogar</option>
                    <option value="deportes">Deportes</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción de la Tienda
                </label>
                <textarea
                  value={formGeneral.descripcion}
                  onChange={(e) => setFormGeneral({ ...formGeneral, descripcion: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL del Logo
                </label>
                <input
                  type="url"
                  value={formGeneral.logoUrl}
                  onChange={(e) => setFormGeneral({ ...formGeneral, logoUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://ejemplo.com/logo.png"
                />
                <p className="mt-1 text-sm text-gray-500">Deja vacío si no quieres mostrar logo</p>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={guardando}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
                >
                  {guardando ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          )}

          {/* TAB: Tienda */}
          {tabActiva === 'tienda' && (
            <form onSubmit={handleGuardarTienda} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Moneda
                  </label>
                  <select
                    value={formTienda.moneda}
                    onChange={(e) => {
                      const moneda = e.target.value as keyof typeof MONEDAS;
                      setFormTienda({
                        ...formTienda,
                        moneda,
                        simboloMoneda: MONEDAS[moneda].simbolo,
                      });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {Object.entries(MONEDAS).map(([codigo, info]) => (
                      <option key={codigo} value={codigo}>
                        {info.nombre} ({info.simbolo})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IVA / Impuestos (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={formTienda.iva}
                    onChange={(e) => setFormTienda({ ...formTienda, iva: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Costo de Envío Base
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={formTienda.costoEnvioBase}
                    onChange={(e) => setFormTienda({ ...formTienda, costoEnvioBase: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">Costo fijo de envío por pedido</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Envío Gratis Desde
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="10000"
                    value={formTienda.envioGratisDesde}
                    onChange={(e) => setFormTienda({ ...formTienda, envioGratisDesde: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">Monto mínimo para envío gratuito</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Vista Previa</h3>
                    <p className="mt-1 text-sm text-blue-700">
                      Ejemplo: Producto de {formTienda.simboloMoneda}100,000 + IVA ({formTienda.iva}%) = {formTienda.simboloMoneda}{(100000 * (1 + formTienda.iva / 100)).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={guardando}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
                >
                  {guardando ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          )}

          {/* TAB: Hero (Contenido Principal) */}
          {tabActiva === 'hero' && (
            <form onSubmit={handleGuardarHero} className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M9 9h6v6H9z"/>
                  </svg>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-900 mb-2">Sección Hero</h3>
                    <p className="text-sm text-blue-700">
                      Esta es la primera sección que verán tus usuarios al entrar a la página. Personaliza el título, subtítulo y llamado a la acción.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título
                  </label>
                  <input
                    type="text"
                    value={formHero.titulo}
                    onChange={(e) => setFormHero({ ...formHero, titulo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Bienvenidos a"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtítulo (Nombre destacado)
                  </label>
                  <input
                    type="text"
                    value={formHero.subtitulo}
                    onChange={(e) => setFormHero({ ...formHero, subtitulo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="NebulaTech"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Badge (Etiqueta superior)
                  </label>
                  <input
                    type="text"
                    value={formHero.badge}
                    onChange={(e) => setFormHero({ ...formHero, badge: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Tecnología de Vanguardia"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Texto del Botón CTA
                  </label>
                  <input
                    type="text"
                    value={formHero.textoCta}
                    onChange={(e) => setFormHero({ ...formHero, textoCta: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ver Productos"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  value={formHero.descripcion}
                  onChange={(e) => setFormHero({ ...formHero, descripcion: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Encuentra lo que necesitas para..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL de Imagen Hero
                </label>
                <input
                  type="text"
                  value={formHero.imagenHero}
                  onChange={(e) => setFormHero({ ...formHero, imagenHero: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="/random-image.png"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={guardando}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
                >
                  {guardando ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          )}

          {/* TAB: Características */}
          {tabActiva === 'caracteristicas' && (
            <form onSubmit={handleGuardarCaracteristicas} className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-900 mb-2">Características del Negocio</h3>
                    <p className="text-sm text-blue-700">
                      Destaca las ventajas de tu negocio. Estas aparecen en la sección "¿Por qué...?"
                    </p>
                  </div>
                </div>
              </div>

              {formCaracteristicas.map((caracteristica, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Característica {index + 1}</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ícono (nombre o emoji)
                      </label>
                      <input
                        type="text"
                        value={caracteristica.icono}
                        onChange={(e) => {
                          const nuevas = [...formCaracteristicas];
                          nuevas[index].icono = e.target.value;
                          setFormCaracteristicas(nuevas);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="check"
                        required
                      />
                      <p className="mt-1 text-xs text-gray-500">Ej: check, star, shield, zap</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título
                      </label>
                      <input
                        type="text"
                        value={caracteristica.titulo}
                        onChange={(e) => {
                          const nuevas = [...formCaracteristicas];
                          nuevas[index].titulo = e.target.value;
                          setFormCaracteristicas(nuevas);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Calidad Premium"
                        required
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción
                      </label>
                      <input
                        type="text"
                        value={caracteristica.descripcion}
                        onChange={(e) => {
                          const nuevas = [...formCaracteristicas];
                          nuevas[index].descripcion = e.target.value;
                          setFormCaracteristicas(nuevas);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Solo productos de las mejores marcas"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={guardando}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
                >
                  {guardando ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          )}

          {/* TAB: Redes Sociales */}
          {tabActiva === 'redesSociales' && (
            <form onSubmit={handleGuardarRedesSociales} className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-900 mb-2">Redes Sociales</h3>
                    <p className="text-sm text-blue-700">
                      Configura los enlaces a tus redes sociales. Aparecerán en el footer de la página.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {formRedesSociales.map((red, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex-shrink-0">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={red.visible}
                          onChange={(e) => {
                            const nuevas = [...formRedesSociales];
                            nuevas[index].visible = e.target.checked;
                            setFormRedesSociales(nuevas);
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {red.nombre}
                        </label>
                        <input
                          type="text"
                          value={red.nombre}
                          disabled
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          URL
                        </label>
                        <input
                          type="url"
                          value={red.url}
                          onChange={(e) => {
                            const nuevas = [...formRedesSociales];
                            nuevas[index].url = e.target.value;
                            setFormRedesSociales(nuevas);
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder={`https://${red.nombre.toLowerCase()}.com/tu-perfil`}
                          required={red.visible}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={guardando}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
                >
                  {guardando ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          )}

          {/* TAB: Categorías */}
          {tabActiva === 'categorias' && (
            <form onSubmit={handleGuardarCategorias} className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
                  </svg>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-900 mb-2">Categorías del Negocio</h3>
                    <p className="text-sm text-blue-700">
                      Define las categorías de productos de tu tienda. Aparecen en el menú y en la página principal.
                    </p>
                  </div>
                </div>
              </div>

              {formCategorias.map((categoria, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Categoría {index + 1}</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ícono (nombre o emoji)
                      </label>
                      <input
                        type="text"
                        value={categoria.icono}
                        onChange={(e) => {
                          const nuevas = [...formCategorias];
                          nuevas[index].icono = e.target.value;
                          setFormCategorias(nuevas);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="monitor"
                        required
                      />
                      <p className="mt-1 text-xs text-gray-500">Ej: monitor, keyboard, cpu, headphones</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre
                      </label>
                      <input
                        type="text"
                        value={categoria.nombre}
                        onChange={(e) => {
                          const nuevas = [...formCategorias];
                          nuevas[index].nombre = e.target.value;
                          setFormCategorias(nuevas);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Gaming PCs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug (URL)
                      </label>
                      <input
                        type="text"
                        value={categoria.valor}
                        onChange={(e) => {
                          const nuevas = [...formCategorias];
                          nuevas[index].valor = e.target.value;
                          setFormCategorias(nuevas);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="gaming-pcs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gradient (Tailwind)
                      </label>
                      <input
                        type="text"
                        value={categoria.colorGradient}
                        onChange={(e) => {
                          const nuevas = [...formCategorias];
                          nuevas[index].colorGradient = e.target.value;
                          setFormCategorias(nuevas);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="from-gray-700 to-purple-700"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={guardando}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
                >
                  {guardando ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          )}

          {/* TAB: Avanzada */}
          {tabActiva === 'avanzada' && (
            <form onSubmit={handleGuardarAvanzada} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">Modo Mantenimiento</h3>
                    <p className="text-sm text-gray-500">Desactiva temporalmente la tienda para clientes</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formAvanzada.modoMantenimiento}
                      onChange={(e) => setFormAvanzada({ ...formAvanzada, modoMantenimiento: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">Mostrar Productos Sin Stock</h3>
                    <p className="text-sm text-gray-500">Permite ver productos agotados en el catálogo</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formAvanzada.mostrarProductosSinStock}
                      onChange={(e) => setFormAvanzada({ ...formAvanzada, mostrarProductosSinStock: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">Permitir Compras Sin Registro</h3>
                    <p className="text-sm text-gray-500">Los visitantes pueden comprar como invitados</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formAvanzada.permitirComprasSinRegistro}
                      onChange={(e) => setFormAvanzada({ ...formAvanzada, permitirComprasSinRegistro: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">Notificar Stock Bajo</h3>
                    <p className="text-sm text-gray-500">Alertas cuando el inventario está bajo</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formAvanzada.notificarStockBajo}
                      onChange={(e) => setFormAvanzada({ ...formAvanzada, notificarStockBajo: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                {formAvanzada.notificarStockBajo && (
                  <div className="ml-4 p-4 bg-white border border-gray-200 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Umbral de Stock Bajo
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={formAvanzada.stockBajoUmbral}
                      onChange={(e) => setFormAvanzada({ ...formAvanzada, stockBajoUmbral: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Notificar cuando el stock sea menor o igual a este número
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleResetear}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-200"
                  >
                    Resetear a Valores por Defecto
                  </button>
                  <button
                    type="submit"
                    disabled={guardando}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
                  >
                    {guardando ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionPanel;
