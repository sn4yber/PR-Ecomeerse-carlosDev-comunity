/**
 * @fileoverview Componente principal de la aplicación
 * @description Orquestador principal que maneja el layout y la navegación
 * @author E-commerce Team
 * @created 2025-09-20
 */

import { Header, Home, Footer } from './components';
import type { MenuItem } from './types';

/**
 * Configuración del menú principal
 * 
 * Separamos la configuración del componente para seguir
 * el principio de responsabilidad única
 */
const MENU_ITEMS: MenuItem[] = [
  { id: 'home', label: 'Inicio', href: '/' },
  { id: 'products', label: 'Productos', href: '/productos' },
  { id: 'cart', label: 'Carrito', href: '/carrito' }
];

/**
 * Configuración de la aplicación
 */
const APP_CONFIG = {
  title: 'NebulaTech',
  menuItems: MENU_ITEMS
};

/**
 * Componente principal de la aplicación
 * 
 * Responsabilidades:
 * - Orquestar el layout principal
 * - Gestionar la configuración global
 * - Proveer la estructura base de la aplicación
 * 
 * Principios SOLID aplicados:
 * - Single Responsibility: Solo orquesta componentes
 * - Dependency Inversion: Depende de abstracciones (MenuItem)
 * - Open/Closed: Extensible agregando nuevos componentes
 */
function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Layout Header */}
      <Header 
        title={APP_CONFIG.title} 
        menuItems={APP_CONFIG.menuItems} 
      />
      
      {/* Contenido principal */}
      <main className="flex-grow">
        <Home />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
