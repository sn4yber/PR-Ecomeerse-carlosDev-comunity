/**
 * @fileoverview Componente de página Carrito
 * @description Página completa del carrito de compras del e-commerce
 * @author E-commerce Team
 * @created 2025-10-13
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, AlertCircle, CheckCircle } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { CartItem } from '../cart/CartItem';
import { CartSummary } from '../cart/CartSummary';
import { CartEmpty } from '../cart/CartEmpty';
import { FacturacionFormModal } from '../cart/FacturacionFormModal';
import { TicketModal } from '../cart/TicketModal';
import type { DatosFacturacion, Factura } from '../../types/cart';

/**
 * Props del componente Carrito
 */
export interface CarritoProps {
  className?: string;
}

/**
 * Componente Carrito - Página completa del carrito de compras
 * 
 * Características:
 * - Lista completa de productos en carrito
 * - Actualización de cantidades
 * - Eliminación de productos
 * - Resumen de totales
 * - Proceso de checkout
 * - Estados de loading y error
 * - Diseño responsive
 * 
 * Principios SOLID aplicados:
 * - Single Responsibility: Orquesta los componentes del carrito
 * - Dependency Inversion: Usa el hook useCart
 * - Open/Closed: Extensible mediante componentes hijos
 */
export const Carrito: React.FC<CarritoProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const {
    cart,
    isLoading,
    error,
    isEmpty,
    isUpdating,
    updateQuantity,
    removeFromCart,
    clearCart,
    checkoutWithBilling,
    clearError,
  } = useCart();

  const [checkoutMessage, setCheckoutMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const [showBillingForm, setShowBillingForm] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [factura, setFactura] = useState<Factura | null>(null);

  /**
   * Abrir modal de facturación
   */
  const handleCheckout = () => {
    setCheckoutMessage(null);
    setShowBillingForm(true);
  };

  /**
   * Procesar checkout con datos de facturación
   */
  const handleBillingSubmit = async (datosFacturacion: DatosFacturacion) => {
    try {
      const facturaGenerada = await checkoutWithBilling(datosFacturacion);
      
      if (!facturaGenerada) {
        throw new Error('No se recibió la factura del servidor');
      }
      
      // Primero establecer la factura y mostrar el modal
      setFactura(facturaGenerada);
      setShowBillingForm(false);
      
      // Pequeño delay para asegurar que React actualice los estados
      setTimeout(() => {
        setShowTicket(true);
      }, 50);
      
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error al procesar el pedido';
      setCheckoutMessage({
        type: 'error',
        text: errorMsg,
      });
      setShowBillingForm(false);
    }
  };

  /**
   * Cerrar ticket y redirigir
   */
  const handleCloseTicket = () => {
    setShowTicket(false);
    setFactura(null);
    navigate('/productos');
  };

  /**
   * Continuar comprando
   */
  const handleContinueShopping = () => {
    navigate('/productos');
  };

  /**
   * Renderizar estado de loading
   */
  if (isLoading) {
    return (
      <main className={`min-h-screen bg-gray-50 ${className}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Cargando carrito...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /**
   * Renderizar carrito vacío (pero no si estamos mostrando el ticket)
   */
  if (isEmpty && !showTicket) {
    return (
      <main className={`min-h-screen bg-gray-50 ${className}`}>
        <div className="container mx-auto px-4 py-8">
          <CartEmpty onContinueShopping={handleContinueShopping} />
        </div>
        
        {/* Modal de Ticket - puede mostrarse incluso con carrito vacío */}
        <TicketModal
          isOpen={showTicket}
          onClose={handleCloseTicket}
          factura={factura}
        />
      </main>
    );
  }

  return (
    <main className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header de la página */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingCart className="text-purple-600" size={40} />
            <h1 className="text-4xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent">
                Carrito de Compras
              </span>
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Revisa tus productos antes de finalizar la compra
          </p>
        </div>

        {/* Mensajes de error o éxito */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="flex-grow">
              <p className="text-red-800 font-semibold">Error</p>
              <p className="text-red-700">{error}</p>
            </div>
            <button
              onClick={clearError}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              ✕
            </button>
          </div>
        )}

        {checkoutMessage && (
          <div className={`
            mb-6 rounded-lg p-4 flex items-start gap-3
            ${checkoutMessage.type === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
            }
          `}>
            {checkoutMessage.type === 'success' ? (
              <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
            ) : (
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            )}
            <div className="flex-grow">
              <p className={checkoutMessage.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                {checkoutMessage.text}
              </p>
            </div>
          </div>
        )}

        {/* Contenido principal: Lista de productos y resumen */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {cart?.items.map((item) => (
              <CartItem
                key={item.idItem}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                isUpdating={isUpdating}
              />
            ))}
          </div>

          {/* Resumen del carrito */}
          <div className="lg:col-span-1">
            {cart && (
              <CartSummary
                cart={cart}
                onCheckout={handleCheckout}
                onClearCart={clearCart}
                isProcessing={isUpdating}
              />
            )}
          </div>
        </div>

        {/* Botón para continuar comprando (móvil) */}
        <div className="mt-8 text-center">
          <button
            onClick={handleContinueShopping}
            className="text-purple-600 hover:text-purple-700 font-semibold underline"
          >
            ← Continuar comprando
          </button>
        </div>
      </div>

      {/* Modal de Facturación */}
      <FacturacionFormModal
        isOpen={showBillingForm}
        onClose={() => setShowBillingForm(false)}
        onSubmit={handleBillingSubmit}
        isProcessing={isUpdating}
      />

      {/* Modal de Ticket */}
      <TicketModal
        isOpen={showTicket}
        onClose={handleCloseTicket}
        factura={factura}
      />
    </main>
  );
};

export default Carrito;
