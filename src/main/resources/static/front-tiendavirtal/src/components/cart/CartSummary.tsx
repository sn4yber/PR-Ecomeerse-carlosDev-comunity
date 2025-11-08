/**
 * @fileoverview Componente CartSummary - Resumen del carrito
 * @description Muestra el resumen de totales y acciones del carrito
 * @author E-commerce Team
 * @created 2025-10-13
 */

import React from 'react';
import { ShoppingBag, Trash2, CreditCard } from 'lucide-react';
import type { CartSummaryProps } from '../../types/cart';

/**
 * Componente CartSummary
 * 
 * Características:
 * - Resumen de totales (subtotal, descuentos, impuestos, total)
 * - Botón de checkout
 * - Botón de vaciar carrito
 * - Diseño responsive
 * 
 * Principios SOLID:
 * - Single Responsibility: Solo muestra el resumen
 * - Open/Closed: Extensible mediante props
 */
export const CartSummary: React.FC<CartSummaryProps> = ({
  cart,
  onCheckout,
  onClearCart,
  isProcessing = false,
}) => {
  const handleCheckout = () => {
    if (cart.items.length === 0) return;
    onCheckout();
  };

  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      onClearCart();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="text-purple-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-900">Resumen del Pedido</h2>
      </div>

      {/* Detalles de totales */}
      <div className="space-y-3 mb-6">
        {/* Subtotal */}
        <div className="flex justify-between text-gray-700">
          <span>Subtotal:</span>
          <span className="font-semibold">${cart.subtotal.toFixed(2)}</span>
        </div>

        {/* Descuentos */}
        {cart.descuentoTotal > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Descuentos:</span>
            <span className="font-semibold">-${cart.descuentoTotal.toFixed(2)}</span>
          </div>
        )}

        {/* Impuestos */}
        <div className="flex justify-between text-gray-700">
          <span>Impuestos (IVA 19%):</span>
          <span className="font-semibold">${cart.impuestos.toFixed(2)}</span>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-300 my-4"></div>

        {/* Total */}
        <div className="flex justify-between text-xl font-bold text-gray-900">
          <span>Total:</span>
          <span className="text-purple-600">${cart.total.toFixed(2)}</span>
        </div>

        {/* Cantidad de items */}
        <p className="text-sm text-gray-600 text-center">
          {cart.cantidadItems} {cart.cantidadItems === 1 ? 'producto' : 'productos'}
        </p>
      </div>

      {/* Botones de acción */}
      <div className="space-y-3">
        {/* Botón de checkout */}
        <button
          type="button"
          onClick={handleCheckout}
          disabled={isProcessing || cart.items.length === 0}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CreditCard size={20} />
          {isProcessing ? 'Procesando...' : 'Proceder al Pago'}
        </button>

        {/* Botón de vaciar carrito */}
        <button
          type="button"
          onClick={handleClearCart}
          disabled={isProcessing || cart.items.length === 0}
          className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 size={20} />
          Vaciar Carrito
        </button>
      </div>

      {/* Información adicional */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>Envío gratis en compras superiores a $50.000</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>Devolución gratis dentro de 30 días</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>Pago seguro garantizado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
