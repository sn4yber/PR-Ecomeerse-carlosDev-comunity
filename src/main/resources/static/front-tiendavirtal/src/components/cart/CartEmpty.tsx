/**
 * @fileoverview Componente CartEmpty - Estado vacío del carrito
 * @description Muestra un mensaje cuando el carrito está vacío
 * @author E-commerce Team
 * @created 2025-10-13
 */

import React from 'react';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import type { CartEmptyProps } from '../../types/cart';

/**
 * Componente CartEmpty
 * 
 * Características:
 * - Mensaje amigable de carrito vacío
 * - Botón para continuar comprando
 * - Diseño centrado y atractivo
 * 
 * Principios SOLID:
 * - Single Responsibility: Solo muestra el estado vacío
 * - Open/Closed: Extensible mediante props
 */
export const CartEmpty: React.FC<CartEmptyProps> = ({ onContinueShopping }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {/* Icono */}
      <div className="mb-6 relative">
        <div className="w-32 h-32 bg-purple-50 rounded-full flex items-center justify-center">
          <ShoppingCart size={64} className="text-purple-300" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white text-2xl font-bold">0</span>
        </div>
      </div>

      {/* Mensaje principal */}
      <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
        Tu carrito está vacío
      </h2>
      
      {/* Mensaje secundario */}
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        Parece que aún no has agregado ningún producto. 
        ¡Explora nuestra tienda y encuentra lo que necesitas!
      </p>

      {/* Botón de acción */}
      <button
        onClick={onContinueShopping}
        className="
          bg-gradient-to-r from-purple-600 to-indigo-600
          hover:from-purple-700 hover:to-indigo-700
          text-white font-semibold py-4 px-8 rounded-lg
          transition-all duration-200
          flex items-center gap-2
          shadow-lg hover:shadow-xl
          transform hover:scale-105
        "
      >
        <span>Ir a la Tienda</span>
        <ArrowRight size={20} />
      </button>

      {/* Información adicional */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">🚚</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Envío Gratis</h3>
          <p className="text-sm text-gray-600">En compras superiores a $50.000</p>
        </div>

        <div className="text-center p-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">💳</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Pago Seguro</h3>
          <p className="text-sm text-gray-600">Transacciones 100% protegidas</p>
        </div>

        <div className="text-center p-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">↩️</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Devoluciones</h3>
          <p className="text-sm text-gray-600">30 días para devolver tu compra</p>
        </div>
      </div>
    </div>
  );
};

export default CartEmpty;
