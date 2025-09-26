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
        />
        
        {/* Contenido principal con rutas */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<Login />} />
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
