/**
 * @fileoverview Componente de página Home
 * @description Página principal del e-commerce con hero section
 * @author E-commerce Team
 * @created 2025-09-20
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productosAPI } from '../../lib/api';
import { resolveImageUrl } from '../../lib/utils';

/**
 * Props del componente Home
 */
export interface HomeProps {
  className?: string;
}

/**
 * Componente de contador animado
 */
const AnimatedCounter: React.FC<{ end: number; duration?: number; suffix?: string }> = ({ 
  end, 
  duration = 2000, 
  suffix = "" 
}) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration]);
  
  return <span>{count}{suffix}</span>;
};

/**
 * Componente Home - Página principal
 * 
 * Características:
 * - Diseño responsivo
 * - Gradientes consistentes con la marca
 * - Call to action principal
 * - Productos destacados (Top 3)
 * - Animaciones y efectos interactivos
 * 
 * Principios SOLID aplicados:
 * - Single Responsibility: Solo maneja la presentación del home
 * - Interface Segregation: Props específicas y necesarias
 * 
 * @param className - Clases CSS adicionales
 */
export const Home: React.FC<HomeProps> = ({ className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      {/* Banner Promocional Animado */}
      <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-[length:200%_100%] animate-gradient text-white py-3 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 text-sm font-semibold">
            <span className="animate-pulse">🎮</span>
            <p className="animate-fade-in">¡OFERTA ESPECIAL! Hasta 50% OFF en productos seleccionados</p>
            <span className="animate-pulse">🔥</span>
          </div>
        </div>
      </div>

      {/* Hero Section Principal con Animaciones */}
      <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 min-h-screen flex items-center overflow-hidden">
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gray-800 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-900 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Contenido de texto con animaciones */}
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="space-y-6">
                <div className="inline-block animate-bounce-slow">
                  <span className="bg-gradient-to-r from-gray-700 to-purple-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    ✨ Tecnología de Vanguardia
                  </span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  <span className="inline-block hover:scale-105 transition-transform duration-300">
                    Bienvenidos a
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-gray-400 via-purple-400 to-gray-400 bg-clip-text text-transparent inline-block animate-gradient bg-[length:200%_100%]">
                    NebulaTech
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-300 max-w-lg leading-relaxed">
                  Encuentra lo que necesitas para{' '}
                  <span className="text-purple-400 font-bold">romper todos los límites</span> 
                  {' '}y llevar tu experiencia gaming al siguiente nivel.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/productos"
                  className="group bg-gradient-to-r from-gray-800 to-purple-700 hover:from-gray-900 hover:to-purple-800 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-flex items-center space-x-2 no-underline"
                >
                  <span>Ver Productos</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 border border-white/20">
                  Ver Demo
                </button>
              </div>

              {/* Características rápidas */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center group cursor-pointer">
                  <div className="text-purple-400 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400">Envío Gratis</p>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-pink-400 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400">Garantía Total</p>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-blue-400 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400">Entrega Rápida</p>
                </div>
              </div>
            </div>

            {/* Imagen del hero con efectos */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-pink-600/20 z-10"></div>
                <img 
                  src="/random-image.png" 
                  alt="Gaming & PC Components - NebulaTech" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Badges flotantes */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-gray-800 to-purple-700 text-white px-6 py-3 rounded-full shadow-lg animate-bounce-slow">
                <p className="font-bold text-lg">50% OFF</p>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 px-6 py-3 rounded-full shadow-lg">
                <p className="font-bold text-sm">⭐ 4.9/5 Rating</p>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Categorías Populares con Hover Effects */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Categorías <span className="bg-gradient-to-r from-gray-800 to-purple-700 bg-clip-text text-transparent">Populares</span>
            </h2>
            <p className="text-lg text-gray-600">Explora nuestras categorías más buscadas</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Gaming PCs', icon: '🖥️', color: 'from-gray-700 to-purple-700', value: 'gaming-pcs' },
              { name: 'Periféricos', icon: '⌨️', color: 'from-purple-700 to-gray-800', value: 'perifericos' },
              { name: 'Componentes', icon: '🔧', color: 'from-gray-800 to-purple-800', value: 'componentes' },
              { name: 'Accesorios', icon: '🎧', color: 'from-purple-600 to-gray-700', value: 'accesorios' }
            ].map((category, index) => (
              <Link
                key={index}
                to={`/productos?categoria=${category.value}`}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden no-underline"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Características con Iconos Animados */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              ¿Por qué <span className="bg-gradient-to-r from-gray-800 to-purple-700 bg-clip-text text-transparent">NebulaTech</span>?
            </h2>
            <p className="text-lg text-gray-600">La mejor experiencia de compra garantizada</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ),
                title: 'Calidad Premium',
                description: 'Solo productos de las mejores marcas del mercado'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Envío Express',
                description: 'Entrega en 24-48 horas a todo el país'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Garantía Extendida',
                description: 'Hasta 3 años de garantía en todos los productos'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: 'Soporte 24/7',
                description: 'Atención al cliente siempre disponible'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-purple-700 text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Sobre Nosotros Mejorada */}
      <section id="sobre-nosotros" className="py-20 bg-gradient-to-br from-gray-900 to-purple-900 text-white relative overflow-hidden">
        {/* Efectos de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-800 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    Sobre <span className="bg-gradient-to-r from-gray-400 to-purple-400 bg-clip-text text-transparent">NebulaTech</span>
                  </h2>
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    Somos una comunidad de gamers apasionados que ofrece productos gaming de alta calidad. 
                    Nuestro equipo prueba cada producto para garantizar la mejor experiencia de juego.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    Con más de 5 años de experiencia, nos hemos convertido en el destino favorito 
                    de miles de gamers que buscan calidad, precio y atención personalizada.
                  </p>
                </div>

                {/* Estadísticas Animadas */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300">
                    <h3 className="text-4xl font-bold text-purple-400 mb-2">
                      <AnimatedCounter end={10} suffix="k+" />
                    </h3>
                    <p className="text-sm text-gray-400">Productos</p>
                  </div>
                  <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300">
                    <h3 className="text-4xl font-bold text-pink-400 mb-2">
                      <AnimatedCounter end={98} suffix="%" />
                    </h3>
                    <p className="text-sm text-gray-400">Satisfacción</p>
                  </div>
                  <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300">
                    <h3 className="text-4xl font-bold text-blue-400 mb-2">
                      <AnimatedCounter end={5} suffix="+" />
                    </h3>
                    <p className="text-sm text-gray-400">Años</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-pink-600/20 z-10"></div>
                  <img 
                    src="/universo.png" 
                    alt="Gaming Setup - NebulaTech" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-gray-800 to-purple-700 text-white p-6 rounded-2xl shadow-2xl animate-bounce-slow">
                  <p className="font-bold text-lg">🎮 Tu gaming, nuestra pasión</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Productos Destacados */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-gray-800 to-purple-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                ⭐ Lo Más Vendido
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Productos <span className="bg-gradient-to-r from-gray-800 to-purple-700 bg-clip-text text-transparent">Destacados</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Los mejores productos seleccionados especialmente para ti, con la mejor calidad y precio del mercado
            </p>
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
              {productosDestacados.map((producto, index) => (
                <div 
                  key={producto.id} 
                  className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 ${
                    index === 0 ? 'lg:scale-105' : ''
                  }`}
                >
                  {/* Imagen del producto con badge */}
                  <div className="relative h-72 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {/* Badge de descuento */}
                    <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-gray-800 to-purple-700 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse">
                      -50% OFF
                    </div>
                    
                    {/* Badge de estrella para el primero */}
                    {index === 0 && (
                      <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-3 rounded-full shadow-lg">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    )}

                    {/* Overlay con gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    
                    {resolveImageUrl(producto.urlImagen) ? (
                      <img 
                        src={resolveImageUrl(producto.urlImagen)!} 
                        alt={producto.nombre}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML += `
                            <div class="w-full h-full flex items-center justify-center text-gray-400">
                              <svg class="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}

                    {/* Botón de quick view en hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold shadow-xl hover:bg-gray-100 transition-all transform hover:scale-110">
                        Vista Rápida
                      </button>
                    </div>
                  </div>

                  {/* Contenido del producto */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors flex-1">
                        {producto.nombre}
                      </h3>
                      <div className="ml-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-gray-700 to-purple-700 text-white shadow-sm">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          4.9
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                      {producto.descripcion}
                    </p>
                    
                    {/* Precio con precio anterior tachado */}
                    <div className="mb-4">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-purple-700 bg-clip-text text-transparent">
                          ${producto.precio.toFixed(2)}
                        </span>
                        <span className="text-lg text-gray-400 line-through">
                          ${(producto.precio * 2).toFixed(2)}
                        </span>
                      </div>
                      <div className="mt-2">
                        {producto.cantidadStock > 0 ? (
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1 text-green-600">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-sm font-semibold">En stock</span>
                            </div>
                            <span className="text-xs text-gray-500">({producto.cantidadStock} disponibles)</span>
                          </div>
                        ) : (
                          <span className="text-sm text-red-600 font-semibold flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            Agotado
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      to="/productos"
                      className="group/btn w-full bg-gradient-to-r from-gray-800 to-purple-700 hover:from-gray-900 hover:to-purple-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl inline-flex items-center justify-center space-x-2 no-underline"
                    >
                      <span>Ver Detalles</span>
                      <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
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

          <div className="text-center mt-16">
            <Link
              to="/productos"
              className="group inline-flex items-center px-10 py-4 border-2 border-purple-700 text-purple-700 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-gray-800 hover:to-purple-700 hover:text-white hover:border-transparent transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span>Ver todos los productos</span>
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-[length:200%_100%] animate-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              ¿Listo para llevar tu{' '}
              <span className="underline decoration-wavy decoration-purple-300">gaming</span>
              {' '}al siguiente nivel?
            </h2>
            <p className="text-xl lg:text-2xl mb-10 text-gray-300">
              Únete a miles de gamers que ya confían en NebulaTech
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/productos"
                className="group bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl inline-flex items-center space-x-2 no-underline"
              >
                <span>Explorar Productos</span>
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-110">
                Contactar Soporte
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold mb-2"><AnimatedCounter end={10} suffix="k+" /></div>
                <div className="text-sm text-purple-200">Clientes Felices</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold mb-2"><AnimatedCounter end={50} suffix="k+" /></div>
                <div className="text-sm text-purple-200">Productos Vendidos</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold mb-2"><AnimatedCounter end={24} suffix="/7" /></div>
                <div className="text-sm text-purple-200">Soporte</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold mb-2"><AnimatedCounter end={99} suffix="%" /></div>
                <div className="text-sm text-purple-200">Satisfacción</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
