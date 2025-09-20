/**
 * @fileoverview Datos mock para desarrollo
 * @description Datos de prueba para el desarrollo del e-commerce
 * @author E-commerce Team
 * @created 2025-09-20
 */

import type { MenuItem } from '../types';

/**
 * Items del menú principal
 * 
 * Estos son los elementos que aparecerán en el menú lateral
 * estilo Wikipedia. Se organizan por categorías principales
 * del e-commerce.
 */
export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'home',
    label: 'Inicio',
    href: '/',
    icon: '🏠'
  },
  {
    id: 'categories',
    label: 'Categorías',
    href: '/categorias',
    icon: '📂'
  },
  {
    id: 'products',
    label: 'Productos',
    href: '/productos',
    icon: '🛍️'
  },
  {
    id: 'offers',
    label: 'Ofertas',
    href: '/ofertas',
    icon: '🏷️'
  },
  {
    id: 'cart',
    label: 'Carrito',
    href: '/carrito',
    icon: '🛒'
  },
  {
    id: 'orders',
    label: 'Mis Pedidos',
    href: '/pedidos',
    icon: '📦'
  },
  {
    id: 'profile',
    label: 'Mi Perfil',
    href: '/perfil',
    icon: '👤'
  },
  {
    id: 'help',
    label: 'Ayuda',
    href: '/ayuda',
    icon: '❓'
  }
];

/**
 * Configuración del sitio
 */
export const SITE_CONFIG = {
  title: 'TiendaVirtual',
  description: 'Tu tienda online de confianza',
  version: '1.0.0'
};
