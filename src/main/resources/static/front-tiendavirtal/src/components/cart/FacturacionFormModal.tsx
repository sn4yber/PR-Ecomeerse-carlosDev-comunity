/**
 * @fileoverview Modal de formulario de facturación
 * @description Formulario para capturar datos del cliente antes del checkout
 * @author E-commerce Team
 * @created 2025-10-13
 */

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, User, CreditCard, Mail, Phone, MapPin } from 'lucide-react';
import type { DatosFacturacion } from '../../types/cart';

interface FacturacionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (datos: DatosFacturacion) => void;
  isProcessing: boolean;
}

export const FacturacionFormModal: React.FC<FacturacionFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isProcessing,
}) => {
  const [formData, setFormData] = useState<DatosFacturacion>({
    nombreCompleto: '',
    numeroIdentificacion: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    pais: 'Colombia',
    codigoPostal: '',
    email: '',
    metodoPago: 'Efectivo',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof DatosFacturacion, string>>>({});

  // Cargar datos del usuario registrado al abrir el modal
  useEffect(() => {
    if (isOpen) {
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          
          // Autocompletar con los datos del usuario registrado
          setFormData(prev => ({
            ...prev,
            nombreCompleto: `${user.nombre} ${user.apellido}` || prev.nombreCompleto,
            email: user.email || prev.email,
            telefono: user.telefono || prev.telefono,
          }));

          console.log('✅ Datos del usuario cargados en el formulario:', {
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            telefono: user.telefono
          });
        }
      } catch (error) {
        console.error('Error cargando datos del usuario:', error);
      }
    }
  }, [isOpen]);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error del campo al cambiar
    if (errors[name as keyof DatosFacturacion]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof DatosFacturacion, string>> = {};

    if (!formData.nombreCompleto.trim()) {
      newErrors.nombreCompleto = 'El nombre completo es obligatorio';
    } else if (formData.nombreCompleto.trim().length < 2) {
      newErrors.nombreCompleto = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.numeroIdentificacion.trim()) {
      newErrors.numeroIdentificacion = 'La identificación es obligatoria';
    } else if (formData.numeroIdentificacion.trim().length < 5) {
      newErrors.numeroIdentificacion = 'La identificación debe tener al menos 5 caracteres';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio';
    } else if (!/^[0-9]{7,15}$/.test(formData.telefono)) {
      newErrors.telefono = 'El teléfono debe tener entre 7 y 15 dígitos';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es obligatoria';
    } else if (formData.direccion.trim().length < 5) {
      newErrors.direccion = 'La dirección debe tener al menos 5 caracteres';
    }

    if (!formData.ciudad.trim()) {
      newErrors.ciudad = 'La ciudad es obligatoria';
    }

    if (!formData.pais.trim()) {
      newErrors.pais = 'El país es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isProcessing) {
      onClose();
    }
  };

  const modalContent = (
    <div 
      data-modal="facturacion-backdrop"
      style={{ 
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        overflow: 'auto'
      }}
      onClick={handleBackdropClick}
    >
      <div 
        data-modal="facturacion-content"
        style={{ 
          position: 'relative',
          zIndex: 1000000,
          maxWidth: '48rem',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          borderRadius: '0.5rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Datos de Facturación</h2>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información Personal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <User size={20} />
              Información Personal
            </h3>

            <div>
              <label htmlFor="nombreCompleto" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo *
              </label>
              <input
                type="text"
                id="nombreCompleto"
                name="nombreCompleto"
                value={formData.nombreCompleto}
                onChange={handleChange}
                disabled={isProcessing}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.nombreCompleto ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Juan Pérez"
              />
              {errors.nombreCompleto && (
                <p className="mt-1 text-sm text-red-600">{errors.nombreCompleto}</p>
              )}
            </div>

            <div>
              <label htmlFor="numeroIdentificacion" className="block text-sm font-medium text-gray-700 mb-1">
                Número de Identificación *
              </label>
              <input
                type="text"
                id="numeroIdentificacion"
                name="numeroIdentificacion"
                value={formData.numeroIdentificacion}
                onChange={handleChange}
                disabled={isProcessing}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.numeroIdentificacion ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="1234567890"
              />
              {errors.numeroIdentificacion && (
                <p className="mt-1 text-sm text-red-600">{errors.numeroIdentificacion}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="telefono" className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                  <Phone size={16} />
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  disabled={isProcessing}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.telefono ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="3001234567"
                />
                {errors.telefono && (
                  <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                  <Mail size={16} />
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isProcessing}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="correo@ejemplo.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Dirección */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MapPin size={20} />
              Dirección
            </h3>

            <div>
              <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1">
                Dirección Completa *
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                disabled={isProcessing}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.direccion ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Calle 123 #45-67"
              />
              {errors.direccion && (
                <p className="mt-1 text-sm text-red-600">{errors.direccion}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700 mb-1">
                  Ciudad *
                </label>
                <input
                  type="text"
                  id="ciudad"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  disabled={isProcessing}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.ciudad ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Bogotá"
                />
                {errors.ciudad && (
                  <p className="mt-1 text-sm text-red-600">{errors.ciudad}</p>
                )}
              </div>

              <div>
                <label htmlFor="pais" className="block text-sm font-medium text-gray-700 mb-1">
                  País *
                </label>
                <input
                  type="text"
                  id="pais"
                  name="pais"
                  value={formData.pais}
                  onChange={handleChange}
                  disabled={isProcessing}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.pais ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Colombia"
                />
                {errors.pais && (
                  <p className="mt-1 text-sm text-red-600">{errors.pais}</p>
                )}
              </div>

              <div>
                <label htmlFor="codigoPostal" className="block text-sm font-medium text-gray-700 mb-1">
                  Código Postal
                </label>
                <input
                  type="text"
                  id="codigoPostal"
                  name="codigoPostal"
                  value={formData.codigoPostal}
                  onChange={handleChange}
                  disabled={isProcessing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="110111"
                />
              </div>
            </div>
          </div>

          {/* Método de Pago */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <CreditCard size={20} />
              Método de Pago
            </h3>

            <div>
              <label htmlFor="metodoPago" className="block text-sm font-medium text-gray-700 mb-1">
                Seleccionar método de pago *
              </label>
              <select
                id="metodoPago"
                name="metodoPago"
                value={formData.metodoPago}
                onChange={handleChange}
                disabled={isProcessing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="Efectivo">Efectivo</option>
                <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                <option value="Tarjeta de Débito">Tarjeta de Débito</option>
                <option value="Transferencia">Transferencia Bancaria</option>
                <option value="PSE">PSE</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Procesando...
                </>
              ) : (
                'Finalizar Compra'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default FacturacionFormModal;
