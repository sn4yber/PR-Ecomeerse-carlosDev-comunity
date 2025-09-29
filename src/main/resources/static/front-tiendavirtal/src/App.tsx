/**
 * @fileoverview Componente principal de la aplicación
 * @description Orquestador principal que maneja el layout y la navegación
 * @author E-commerce Team
 * @created 2025-09-20
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Home, Footer } from './components';
import { Productos } from './components/pages/Productos';
import { Carrito } from './components/pages/Carrito';
import { Login } from './components/pages/Login';
import { AdminPanel } from './components/admin/pages/AdminPanel';
import { ProductManagement } from './components/admin/pages/ProductManagement';
import { UserManagement } from './components/admin/pages/UserManagement';
import { ReportsAndStats } from './components/admin/pages/ReportsAndStats';
import { OrderManagement } from './components/admin/pages/OrderManagement';
import { SystemSettings } from './components/admin/pages/SystemSettings';
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
  /**
   * SISTEMA DE LOGIN PERSISTENTE - Para implementar después
   * 
   * Tip: useQuery(['authStatus']) para verificar token
   * Tip: if (!authData?.authenticated) return <Login />;
   */

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Layout Header */}
        <Header 
          title={APP_CONFIG.title} 
          menuItems={APP_CONFIG.menuItems} 
        />
        
        {/* Contenido principal con rutas */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<Login />} />
            
            {/* Rutas del panel de administración */}
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/productos" element={<ProductManagement />} />
            <Route path="/admin/usuarios" element={<UserManagement />} />
            <Route path="/admin/reportes" element={<ReportsAndStats />} />
            <Route path="/admin/pedidos" element={<OrderManagement />} />
            <Route path="/admin/configuracion" element={<SystemSettings />} />
            
            {/* Ruta por defecto - redirección al home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
