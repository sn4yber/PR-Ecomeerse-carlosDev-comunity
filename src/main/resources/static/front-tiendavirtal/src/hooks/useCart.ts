/**
 * @fileoverview Hook personalizado para gestión del carrito
 * @description Hook que proporciona toda la lógica del carrito
 * @author E-commerce Team
 * @created 2025-10-13
 */

import { useState, useCallback, useEffect } from 'react';
import { cartAPI } from '../lib/cartApi';
import type { Cart, DatosFacturacion, Factura } from '../types/cart';

/**
 * Estado del carrito
 */
interface UseCartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  itemCount: number;
  isUpdating: boolean;
}

/**
 * Hook personalizado para gestión del carrito
 * 
 * Características:
 * - Carga automática del carrito
 * - Gestión de estados (loading, error)
 * - Operaciones CRUD optimizadas
 * - Manejo de errores robusto
 * 
 * @returns {Object} Estado y funciones del carrito
 */
export const useCart = () => {
  const [state, setState] = useState<UseCartState>({
    cart: null,
    isLoading: true,
    error: null,
    itemCount: 0,
    isUpdating: false,
  });

  /**
   * Actualizar el estado del carrito
   */
  const updateState = useCallback((updates: Partial<UseCartState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  /**
   * Obtener el carrito del servidor
   */
  const fetchCart = useCallback(async () => {
    try {
      updateState({ isLoading: true, error: null });
      const cart = await cartAPI.obtenerCarrito();
      updateState({
        cart,
        itemCount: cart.cantidadItems || 0,
        isLoading: false,
      });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error al cargar el carrito';
      updateState({
        error: errorMsg,
        isLoading: false,
      });
      console.error('Error al obtener carrito:', error);
    }
  }, [updateState]);

  /**
   * Actualizar solo el contador de items (más ligero)
   */
  const refreshItemCount = useCallback(async () => {
    try {
      const count = await cartAPI.obtenerCantidadItems();
      updateState({ itemCount: count });
    } catch (error) {
      console.error('Error al actualizar contador:', error);
    }
  }, [updateState]);

  /**
   * Agregar producto al carrito
   */
  const addToCart = useCallback(async (idProducto: number, cantidad: number = 1) => {
    try {
      updateState({ isUpdating: true, error: null });
      const updatedCart = await cartAPI.agregarProducto({ idProducto, cantidad });
      updateState({
        cart: updatedCart,
        itemCount: updatedCart.cantidadItems || 0,
        isUpdating: false,
      });
      return updatedCart;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error al agregar producto';
      updateState({
        error: errorMsg,
        isUpdating: false,
      });
      throw error;
    }
  }, [updateState]);

  /**
   * Actualizar cantidad de un producto
   */
  const updateQuantity = useCallback(async (idProducto: number, cantidad: number) => {
    try {
      updateState({ isUpdating: true, error: null });
      const updatedCart = await cartAPI.actualizarCantidad(idProducto, { cantidad });
      updateState({
        cart: updatedCart,
        itemCount: updatedCart.cantidadItems || 0,
        isUpdating: false,
      });
      return updatedCart;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error al actualizar cantidad';
      updateState({
        error: errorMsg,
        isUpdating: false,
      });
      throw error;
    }
  }, [updateState]);

  /**
   * Eliminar producto del carrito
   */
  const removeFromCart = useCallback(async (idProducto: number) => {
    try {
      updateState({ isUpdating: true, error: null });
      const updatedCart = await cartAPI.eliminarProducto(idProducto);
      updateState({
        cart: updatedCart,
        itemCount: updatedCart.cantidadItems || 0,
        isUpdating: false,
      });
      return updatedCart;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error al eliminar producto';
      updateState({
        error: errorMsg,
        isUpdating: false,
      });
      throw error;
    }
  }, [updateState]);

  /**
   * Vaciar el carrito
   */
  const clearCart = useCallback(async () => {
    try {
      updateState({ isUpdating: true, error: null });
      const emptyCart = await cartAPI.vaciarCarrito();
      updateState({
        cart: emptyCart,
        itemCount: 0,
        isUpdating: false,
      });
      return emptyCart;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error al vaciar carrito';
      updateState({
        error: errorMsg,
        isUpdating: false,
      });
      throw error;
    }
  }, [updateState]);

  /**
   * Verificar stock disponible
   */
  const verifyStock = useCallback(async (): Promise<boolean> => {
    try {
      return await cartAPI.verificarStock();
    } catch (error) {
      console.error('Error al verificar stock:', error);
      return false;
    }
  }, []);

  /**
   * Realizar checkout
   */
  const checkout = useCallback(async (): Promise<number> => {
    try {
      updateState({ isUpdating: true, error: null });
      const idPedido = await cartAPI.checkout();
      
      // Vaciar carrito local después del checkout exitoso
      updateState({
        cart: null,
        itemCount: 0,
        isUpdating: false,
      });
      
      return idPedido;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error al procesar el pedido';
      updateState({
        error: errorMsg,
        isUpdating: false,
      });
      throw error;
    }
  }, [updateState]);

  /**
   * Realizar checkout con datos de facturación
   */
  const checkoutWithBilling = useCallback(async (datosFacturacion: DatosFacturacion): Promise<Factura> => {
    try {
      updateState({ isUpdating: true, error: null });
      const factura = await cartAPI.checkoutConFactura({ datosFacturacion });
      
      // Vaciar carrito local después del checkout exitoso
      updateState({
        cart: null,
        itemCount: 0,
        isUpdating: false,
      });
      
      return factura;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error al procesar el pedido';
      updateState({
        error: errorMsg,
        isUpdating: false,
      });
      throw error;
    }
  }, [updateState]);

  /**
   * Cargar el carrito al montar el componente
   */
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return {
    // Estado
    cart: state.cart,
    isLoading: state.isLoading,
    error: state.error,
    itemCount: state.itemCount,
    isUpdating: state.isUpdating,
    isEmpty: !state.cart || state.cart.items.length === 0,
    
    // Acciones
    fetchCart,
    refreshItemCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    verifyStock,
    checkout,
    checkoutWithBilling,
    
    // Utilidades
    clearError: () => updateState({ error: null }),
  };
};
