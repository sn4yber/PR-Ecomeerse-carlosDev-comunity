/**
 * @fileoverview Tipos y interfaces para el sistema de Carrito
 * @description Define las estructuras de datos del carrito de compras
 * @author E-commerce Team
 * @created 2025-10-13
 */

/**
 * Interfaz para un item del carrito
 */
export interface CartItem {
  idItem: number;
  idProducto: number;
  nombreProducto: string;
  urlImagen?: string;
  precioUnitario: number;
  cantidad: number;
  subtotal: number;
  descuento: number;
  porcentajeDescuento: number;
  fechaAgregado: string;
  fechaModificacion: string;
  stockDisponible?: number;
  disponible?: boolean;
}

/**
 * Interfaz para el carrito completo
 */
export interface Cart {
  idCarrito: number;
  idUsuario: number;
  items: CartItem[];
  subtotal: number;
  descuentoTotal: number;
  impuestos: number;
  total: number;
  cantidadItems: number;
  fechaCreacion: string;
  fechaModificacion: string;
}

/**
 * Request para agregar un producto al carrito
 */
export interface AgregarProductoRequest {
  idProducto: number;
  cantidad: number;
}

/**
 * Request para actualizar cantidad de un producto
 */
export interface ActualizarCantidadRequest {
  cantidad: number;
}

/**
 * Response del checkout
 */
export interface CheckoutResponse {
  idPedido: number;
  mensaje: string;
}

/**
 * Response de verificación de stock
 */
export interface VerificarStockResponse {
  stockDisponible: boolean;
}

/**
 * Response de cantidad de items
 */
export interface CantidadItemsResponse {
  cantidad: number;
}

/**
 * Datos de facturación del cliente
 */
export interface DatosFacturacion {
  nombreCompleto: string;
  numeroIdentificacion: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  pais: string;
  codigoPostal?: string;
  email: string;
  metodoPago: string;
}

/**
 * Request de checkout con datos de facturación
 */
export interface CheckoutRequest {
  datosFacturacion: DatosFacturacion;
}

/**
 * Item de la factura
 */
export interface ItemFactura {
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  descuento: number;
}

/**
 * Factura/Ticket generado
 */
export interface Factura {
  numeroTicket: string;
  numeroPedido: string;
  fecha: string;
  cliente: DatosFacturacion;
  items: ItemFactura[];
  subtotal: number;
  descuentoTotal: number;
  impuestos: number;
  total: number;
  empresaNombre: string;
  empresaNit: string;
  empresaDireccion: string;
  empresaTelefono: string;
  empresaEmail: string;
  empresaWeb: string;
}

/**
 * Props del componente Carrito
 */
export interface CarritoProps {
  className?: string;
}

/**
 * Props del componente CartItem
 */
export interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (idProducto: number, cantidad: number) => void;
  onRemove: (idProducto: number) => void;
  isUpdating?: boolean;
}

/**
 * Props del componente CartSummary
 */
export interface CartSummaryProps {
  cart: Cart;
  onCheckout: () => void;
  onClearCart: () => void;
  isProcessing?: boolean;
}

/**
 * Props del componente CartEmpty
 */
export interface CartEmptyProps {
  onContinueShopping: () => void;
}

/**
 * Estado del carrito en el contexto
 */
export interface CartContextState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  itemCount: number;
}

/**
 * Acciones del carrito en el contexto
 */
export interface CartContextActions {
  fetchCart: () => Promise<void>;
  addToCart: (idProducto: number, cantidad: number) => Promise<void>;
  updateQuantity: (idProducto: number, cantidad: number) => Promise<void>;
  removeFromCart: (idProducto: number) => Promise<void>;
  clearCart: () => Promise<void>;
  checkout: () => Promise<number>;
  refreshItemCount: () => Promise<void>;
}

/**
 * Contexto completo del carrito
 */
export interface CartContextType extends CartContextState, CartContextActions {}
