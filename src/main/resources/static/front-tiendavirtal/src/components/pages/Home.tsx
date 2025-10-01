/**
 * @fileoverview Componente de página Home
 * @description Página principal del e-commerce con hero section
 * @author E-commerce Team
 * @created 2025-09-20
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productosAPI, type Producto } from '../../lib/api';

/**
 * Props del componente Home
 */
export interface HomeProps {
  className?: string;
}

/**
 * Componente Home - Página principal
 * 
 * Características:
 * - Diseño responsivo
 * - Gradientes consistentes con la marca
 * - Call to action principal
 * - Productos destacados (Top 3)
 * 
 * Principios SOLID aplicados:
 * - Single Responsibility: Solo maneja la presentación del home
 * - Interface Segregation: Props específicas y necesarias
 * 
 * @param className - Clases CSS adicionales
 */
export const Home: React.FC<HomeProps> = ({ className = "" }) => {
  /**
   * Hook useQuery para obtener los 3 productos destacados del backend.
   */
  const { data: productosDestacados, error, isLoading } = useQuery({
    queryKey: ['productos-destacados'],
    queryFn: async () => {
      return await productosAPI.obtenerTop3Destacados();
    }
  });

  return (
    <main className={`min-h-screen ${className}`}>
      {/* Hero Section Principal */}
      <section className="
        bg-gray-100 
        min-h-screen flex items-center
      ">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Contenido de texto */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
                  <span className="
                    bg-gradient-to-r from-gray-900 to-purple-600 
                    bg-clip-text text-transparent inline-block
                  ">
                    Bienvenidos a NebulaTech
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-md">
                  Encuentra lo que necesitas, para romper todos los límites.
                </p>
              </div>
              
              <Link 
                to="/productos"
                className="
                  bg-gradient-to-r from-purple-600 to-gray-800 
                  hover:from-purple-700 hover:to-gray-900 
                  text-white px-8 py-4 font-semibold 
                  transition-all duration-200 hover:scale-105
                  inline-block no-underline
                "
              >
                Ver Productos
              </Link>
            </div>

            {/* Imagen del hero */}
            <div className="relative">
              <div className="rounded-lg overflow-hidden aspect-[4/3] shadow-lg">
                <img 
                  src="/random-image.png" 
                  alt="Gaming & PC Components - NebulaTech" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sección Sobre Nosotros */}
      <section id="sobre-nosotros" className="
        bg-white 
        py-12
      ">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Sobre <span className="
                  bg-gradient-to-r from-purple-600 to-gray-800 
                  bg-clip-text text-transparent
                ">NebulaTech</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Somos una comunidad de gamers apasionados que ofrece productos gaming de alta calidad. 
                  Nuestro equipo prueba cada producto para garantizar la mejor experiencia de juego.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-purple-600">10k+</h3>
                    <p className="text-sm text-gray-600">Productos</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-purple-600">98%</h3>
                    <p className="text-sm text-gray-600">Satisfacción</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-purple-600">5+</h3>
                    <p className="text-sm text-gray-600">Años</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="/universo.png" 
                    alt="Gaming Setup - NebulaTech" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="
                  absolute -bottom-4 -right-4 
                  bg-gradient-to-r from-purple-600 to-gray-800
                  text-white p-3 rounded-lg shadow-lg
                ">
                  <p className="font-semibold text-sm">Tu gaming, nuestra pasión</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Productos Destacados */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Productos <span className="bg-gradient-to-r from-purple-600 to-gray-800 bg-clip-text text-transparent">Destacados</span>
            </h2>
            <p className="text-lg text-gray-600">Los mejores productos seleccionados para ti</p>
          </div>

          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando productos destacados...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 max-w-2xl mx-auto">
              Error al cargar productos: {error.message}
            </div>
          )}

          {productosDestacados && productosDestacados.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productosDestacados.map((producto) => (
                <div 
                  key={producto.id} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Imagen del producto */}
                  <div className="h-64 bg-gray-200 overflow-hidden">
                    {producto.urlImagen ? (
                      <img 
                        src={producto.urlImagen} 
                        alt={producto.nombre}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Contenido del producto */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{producto.nombre}</h3>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Destacado
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{producto.descripcion}</p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-bold text-purple-600">${producto.precio.toFixed(2)}</span>
                      </div>
                      <div>
                        {producto.cantidadStock > 0 ? (
                          <span className="text-sm text-green-600 font-medium">✓ En stock</span>
                        ) : (
                          <span className="text-sm text-red-600 font-medium">Sin stock</span>
                        )}
                      </div>
                    </div>

                    <Link
                      to="/productos"
                      className="mt-4 w-full bg-gradient-to-r from-purple-600 to-gray-800 hover:from-purple-700 hover:to-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 inline-block text-center no-underline"
                    >
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {productosDestacados && productosDestacados.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="mt-4 text-gray-600">No hay productos destacados disponibles</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/productos"
              className="inline-flex items-center px-8 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-200"
            >
              Ver todos los productos
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
