/**
 * @fileoverview Tipos generales para el e-commerce
 * @author E-commerce Team
 * @created 2025-09-20
 */

/**
 * Elemento del menú de navegación
 */
export interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  children?: MenuItem[];
}

/**
 * Props del componente Header
 */
export interface HeaderProps {
  title: string;
  className?: string;
}

/**
 * Perfil de usuario
 */
export interface UserProfile {
  name: string;
  role: 'admin' | 'user' | 'guest';
  avatar?: string | null;
}

/**
 * Estado del menú lateral
 */
export interface SidebarState {
  isOpen: boolean;
  activeItem?: string;
}

/**
 * Información de contacto de la empresa
 */
export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  whatsapp?: string;
}

/**
 * Enlace de navegación
 */
export interface FooterLink {
  name: string;
  href: string;
}

/**
 * Sección del footer
 */
export interface FooterSection {
  title: string;
  links: FooterLink[];
}

/**
 * Re-exportar tipos del carrito
 */
export type {
  Cart,
  CartItem,
  AgregarProductoRequest,
  ActualizarCantidadRequest,
  CheckoutResponse,
  VerificarStockResponse,
  CantidadItemsResponse,
  CarritoProps,
  CartItemProps,
  CartSummaryProps,
  CartEmptyProps,
  CartContextState,
  CartContextActions,
  CartContextType,
} from './cart';

/**
 * Re-exportar tipos de usuario
 */
export type {
  Usuario,
  CrearUsuarioRequest,
  ActualizarUsuarioRequest,
  FiltrosUsuarios,
  EstadisticasUsuarios,
} from './usuario';

/**
 * Re-exportar tipos de reportes
 */
export type {
  EstadisticasGenerales,
  VentaMensual,
  ProductoMasVendido,
} from './reporte';
