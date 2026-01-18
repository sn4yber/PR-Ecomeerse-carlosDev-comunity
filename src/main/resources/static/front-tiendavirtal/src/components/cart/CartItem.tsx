/**
 * @fileoverview Componente CartItem - Item individual del carrito
 * @description Representa un producto dentro del carrito con controles
 * @author E-commerce Team
 * @created 2025-10-13
 */

import React, { useState } from 'react';
import { Trash2, Plus, Minus, AlertCircle } from 'lucide-react';
import type { CartItemProps } from '../../types/cart';
import { resolveImageUrl } from '../../lib/utils';

/**
 * Componente CartItem
 * 
 * Características:
 * - Muestra información del producto
 * - Controles para ajustar cantidad
 * - Botón para eliminar
 * - Indicador de stock
 * - Responsive design
 * 
 * Principios SOLID:
 * - Single Responsibility: Solo renderiza un item del carrito
 * - Open/Closed: Extensible mediante props
 */
export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  isUpdating = false,
}) => {
  const [localQuantity, setLocalQuantity] = useState(item.cantidad);
  const [isChanging, setIsChanging] = useState(false);

  /**
   * Manejar cambio de cantidad
   */
  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > (item.stockDisponible || 999)) return;
    
    setLocalQuantity(newQuantity);
    setIsChanging(true);
    
    try {
      await onUpdateQuantity(item.idProducto, newQuantity);
    } catch (error) {
      // Revertir en caso de error
      setLocalQuantity(item.cantidad);
      console.error('Error al actualizar cantidad:', error);
    } finally {
      setIsChanging(false);
    }
  };

  /**
   * Manejar eliminación
   */
  const handleRemove = async () => {
    setIsChanging(true);
    try {
      await onRemove(item.idProducto);
    } catch (error) {
      setIsChanging(false);
      console.error('Error al eliminar producto:', error);
    }
  };

  const isDisabled = isUpdating || isChanging;
  const hasLowStock = item.stockDisponible && item.stockDisponible < 5;
  const isOutOfStock = !item.disponible || (item.stockDisponible && item.stockDisponible < item.cantidad);

  return (
    <div className={`
      bg-white rounded-lg shadow-sm p-4 md:p-6
      transition-all duration-200
      ${isDisabled ? 'opacity-60 pointer-events-none' : ''}
      ${isOutOfStock ? 'border-2 border-red-300' : 'border border-gray-200'}
    `}>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Imagen del producto */}
        <div className="w-full md:w-32 h-32 flex-shrink-0">
          <img
            src={resolveImageUrl(item.urlImagen) || '/placeholder-product.png'}
            alt={item.nombreProducto}
            className="w-full h-full object-cover rounded-md"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-product.png';
            }}
          />
        </div>

        {/* Información del producto */}
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {item.nombreProducto}
            </h3>
            <button
              onClick={handleRemove}
              disabled={isDisabled}
              className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors ml-2"
              title="Eliminar producto"
            >
              <Trash2 size={20} />
            </button>
          </div>

          {/* Precio unitario */}
          <p className="text-gray-600 mb-2">
            Precio unitario: <span className="font-semibold">${item.precioUnitario.toFixed(2)}</span>
          </p>

          {/* Descuento si aplica */}
          {item.descuento > 0 && (
            <p className="text-green-600 text-sm mb-2">
              Descuento: {item.porcentajeDescuento}% (-${item.descuento.toFixed(2)})
            </p>
          )}

          {/* Advertencias de stock */}
          {isOutOfStock && (
            <div className="flex items-center gap-2 text-red-600 text-sm mb-2">
              <AlertCircle size={16} />
              <span>Stock insuficiente (Disponible: {item.stockDisponible || 0})</span>
            </div>
          )}
          {hasLowStock && !isOutOfStock && (
            <div className="flex items-center gap-2 text-orange-600 text-sm mb-2">
              <AlertCircle size={16} />
              <span>¡Últimas {item.stockDisponible} unidades!</span>
            </div>
          )}

          {/* Controles de cantidad y subtotal */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-3">
            {/* Controles de cantidad */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 mr-2">Cantidad:</span>
              <button
                onClick={() => handleQuantityChange(localQuantity - 1)}
                disabled={isDisabled || localQuantity <= 1}
                className="w-8 h-8 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              >
                <Minus size={16} />
              </button>
              
              <input
                type="number"
                value={localQuantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1;
                  if (value >= 1 && value <= (item.stockDisponible || 999)) {
                    handleQuantityChange(value);
                  }
                }}
                disabled={isDisabled}
                className="w-16 text-center border border-gray-300 rounded-md py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="1"
                max={item.stockDisponible || 999}
              />
              
              <button
                onClick={() => handleQuantityChange(localQuantity + 1)}
                disabled={isDisabled || localQuantity >= (item.stockDisponible || 999)}
                className="w-8 h-8 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Subtotal */}
            <div className="text-right">
              <p className="text-sm text-gray-600">Subtotal</p>
              <p className="text-xl font-bold text-purple-600">
                ${item.subtotal.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
