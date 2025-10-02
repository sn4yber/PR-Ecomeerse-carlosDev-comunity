/**
 * @fileoverview Componente de página Productos
 * @description Página de productos del e-commerce - Catálogo completo
 * @author E-commerce Team
 * @created 2025-09-25
 * @updated 2025-10-01
 */

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productosAPI, type Producto } from '../../lib/api';
import { resolveImageUrl } from '../../lib/utils';

/**
 * Props del componente Productos
 */
export interface ProductosProps {
  className?: string;
}

/**
 * Componente Productos - Catálogo completo de productos
 * 
 * Características:
 * - Diseño responsivo
 * - Lista completa de productos del inventario
 * - Búsqueda de productos
 * - Cards con información detallada
 * 
 * Principios SOLID aplicados:
 * - Single Responsibility: Solo maneja la presentación de productos
 * - Interface Segregation: Props específicas y necesarias
 * 
 * @param className - Clases CSS adicionales
 */
export const Productos: React.FC<ProductosProps> = ({ className = "" }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Obtener todos los productos
  const { data: productos, isLoading, error } = useQuery({
    queryKey: ['productos'],
    queryFn: async () => {
      return await productosAPI.obtenerTodos();
    }
  });

  // Filtrar productos por búsqueda
  const productosFiltrados = productos?.filter((producto: Producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header de la página */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent">
              Catálogo de Productos
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Explora nuestro catálogo completo de productos gaming
          </p>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-8">
          <div className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <svg 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-lg">Cargando productos...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Error al cargar productos: {error.message}</span>
            </div>
          </div>
        )}

        {productos && productosFiltrados && productosFiltrados.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg className="mx-auto h-20 w-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-semibold mb-2 text-gray-700 mt-4">
              No se encontraron productos
            </h2>
            <p className="text-gray-500">Intenta con otra búsqueda</p>
          </div>
        )}

        {productos && productosFiltrados && productosFiltrados.length > 0 && (
          <>
            {/* Contador de productos */}
            <div className="mb-6">
              <p className="text-gray-600">
                Mostrando <span className="font-semibold text-purple-600">{productosFiltrados.length}</span> producto{productosFiltrados.length !== 1 ? 's' : ''}
                {searchTerm && <span> para "{searchTerm}"</span>}
              </p>
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productosFiltrados.map((producto: Producto) => (
                <div 
                  key={producto.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  {/* Imagen del producto */}
                  <div className="h-56 bg-gray-200 overflow-hidden relative">
                    {resolveImageUrl(producto.urlImagen) ? (
                      <img 
                        src={resolveImageUrl(producto.urlImagen)!} 
                        alt={producto.nombre}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        onLoad={() => {
                          console.log('✅ Imagen cargada:', producto.nombre, 'URL:', resolveImageUrl(producto.urlImagen));
                        }}
                        onError={(e) => {
                          console.error('❌ Error cargando imagen:', producto.nombre, 'URL Original:', producto.urlImagen, 'URL Resuelta:', resolveImageUrl(producto.urlImagen));
                          
                          // Si la imagen falla al cargar, mostrar el placeholder
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center text-gray-400">
                              <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Badge de destacado */}
                    {producto.destacado && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Destacado
                      </div>
                    )}

                    {/* Badge de stock */}
                    {producto.cantidadStock === 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Agotado
                      </div>
                    )}
                  </div>

                  {/* Información del producto */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                      {producto.nombre}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                      {producto.descripcion}
                    </p>
                    
                    <div className="space-y-3">
                      {/* Precio */}
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-purple-600">
                          ${producto.precio.toFixed(2)}
                        </span>
                        
                        {producto.cantidadStock > 0 && (
                          <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            En stock
                          </span>
                        )}
                      </div>

                      {/* Botón de acción */}
                      <button 
                        className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                          producto.cantidadStock > 0
                            ? 'bg-gradient-to-r from-purple-600 to-gray-800 hover:from-purple-700 hover:to-gray-900 text-white hover:scale-105'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={producto.cantidadStock === 0}
                      >
                        {producto.cantidadStock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Productos;
