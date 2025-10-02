/**
 * @fileoverview Componente principal de la aplicación
 * @description Orquestador principal que maneja el layout y la navegación
 * @author E-commerce Team
 * @created 2025-09-20
 */

import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Home, Footer } from './components';
import { Productos } from './components/pages/Productos';
import { Carrito } from './components/pages/Carrito';
import { Login } from './components/pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminPanel } from './components/admin/pages/AdminPanel';
import { ProductManagement } from './components/admin/pages/ProductManagement';
import { UserManagement } from './components/admin/pages/UserManagement';
import { ReportsAndStats } from './components/admin/pages/ReportsAndStats';
import { OrderManagement } from './components/admin/pages/OrderManagement';
import { SystemSettings } from './components/admin/pages/SystemSettings';
import { startTokenRefreshMonitor } from './lib/tokenRefresh';

/**
 * Configuración de la aplicación
 */
const APP_CONFIG = {
  title: 'NebulaTech'
};

/**
 * Componente principal de la aplicación
 * 
 * Responsabilidades:
 * - Orquestar el layout principal
 * - Gestionar la configuración global
 * - Proveer la estructura base de la aplicación
 * - Iniciar el monitor de refresh automático de tokens
 * 
 * Principios SOLID aplicados:
 * - Single Responsibility: Solo orquesta componentes
 * - Dependency Inversion: Depende de abstracciones (MenuItem)
 * - Open/Closed: Extensible agregando nuevos componentes
 */
function App() {
  /**
   * Iniciar el monitor de refresh automático de tokens
   */
  useEffect(() => {
    startTokenRefreshMonitor();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Layout Header */}
        <Header 
          title={APP_CONFIG.title}
        />
        
        {/* Contenido principal con rutas */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<Login />} />
            
            {/* Rutas protegidas del panel de administración */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } />
            <Route path="/admin/productos" element={
              <ProtectedRoute>
                <ProductManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/usuarios" element={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/reportes" element={
              <ProtectedRoute>
                <ReportsAndStats />
              </ProtectedRoute>
            } />
            <Route path="/admin/pedidos" element={
              <ProtectedRoute>
                <OrderManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/configuracion" element={
              <ProtectedRoute>
                <SystemSettings />
              </ProtectedRoute>
            } />
            
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
