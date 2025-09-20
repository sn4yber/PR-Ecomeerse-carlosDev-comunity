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
  menuItems: MenuItem[];
  className?: string;
}

/**
 * Estado del menú lateral
 */
export interface SidebarState {
  isOpen: boolean;
  activeItem?: string;
}
