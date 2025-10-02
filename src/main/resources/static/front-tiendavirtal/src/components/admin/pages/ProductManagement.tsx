/**
 * @fileoverview Componente de Gestión de Productos para Admin
 * @description Página para administrar productos del e-commerce con CRUD completo
 * @author E-commerce Team
 * @created 2025-09-29
 * @updated 2025-10-01
 */

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '../layout/AdminHeader';
import { productosAPI, filesAPI, type Producto } from '../../../lib/api';
import { resolveImageUrl } from '../../../lib/utils';

export interface ProductManagementProps {
  className?: string;
}

/**
 * Componente ProductManagement - Gestión completa de productos
 * 
 * Características:
 * - CRUD completo de productos
 * - Upload de imágenes
 * - Marcar productos destacados para Home
 * - Control de inventario
 */
export const ProductManagement: React.FC<ProductManagementProps> = ({ className = "" }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [useUrlInput, setUseUrlInput] = useState(false);

  // Estado del formulario
  const [formData, setFormData] = useState<Producto>({
    nombre: '',
    descripcion: '',
    precio: 0,
    cantidadStock: 0,
    urlImagen: '',
    destacado: false,
  });

  // Cargar productos
  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await productosAPI.obtenerTodos();
      setProductos(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // Abrir modal para crear
  const handleNuevoProducto = () => {
    setEditingProduct(null);
    setFormData({
      nombre: '',
      descripcion: '',
      precio: 0,
      cantidadStock: 0,
      urlImagen: '',
      destacado: false,
    });
    setImagePreview(null);
    setSelectedFile(null);
    setUseUrlInput(false);
    setShowModal(true);
  };

  // Abrir modal para editar
  const handleEditarProducto = (producto: Producto) => {
    setEditingProduct(producto);
    setFormData(producto);
    // Resolver URL de imagen para la vista previa
    setImagePreview(resolveImageUrl(producto.urlImagen));
    setSelectedFile(null);
    setUseUrlInput(!!producto.urlImagen);
    setShowModal(true);
  };

  // Manejar selección de archivo
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido (JPG, PNG)');
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no puede superar los 5MB');
        return;
      }

      setSelectedFile(file);
      
      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Guardar producto (crear o actualizar)
  const handleGuardarProducto = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setUploading(true);
      console.log('=== INICIO GUARDAR PRODUCTO ===');
      console.log('Archivo seleccionado:', selectedFile);
      console.log('Form data:', formData);
      
      // Si hay un archivo seleccionado, subirlo primero
      let imagenUrl = formData.urlImagen;
      if (selectedFile) {
        console.log('Subiendo archivo...');
        const resultado = await filesAPI.subirImagen(selectedFile);
        console.log('Resultado subida:', resultado);
        imagenUrl = resultado.url;
      }

      // Crear/actualizar producto con la URL de la imagen
      const productoData = {
        ...formData,
        urlImagen: imagenUrl,
      };

      console.log('Guardando producto:', productoData);
      if (editingProduct && editingProduct.id) {
        await productosAPI.actualizar(editingProduct.id, productoData);
      } else {
        await productosAPI.crear(productoData);
      }
      
      console.log('Producto guardado exitosamente');
      setShowModal(false);
      setSelectedFile(null);
      setImagePreview(null);
      cargarProductos();
    } catch (err: any) {
      console.error('=== ERROR AL GUARDAR PRODUCTO ===');
      console.error('Error completo:', err);
      console.error('Mensaje:', err.message);
      alert(err.message || 'Error al guardar producto');
    } finally {
      setUploading(false);
    }
  };

  // Eliminar producto
  const handleEliminarProducto = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    
    try {
      await productosAPI.eliminar(id);
      cargarProductos();
    } catch (err: any) {
      alert(err.message || 'Error al eliminar producto');
    }
  };

  // Marcar/desmarcar como destacado
  const handleToggleDestacado = async (id: number, destacadoActual: boolean) => {
    try {
      await productosAPI.marcarDestacado(id, !destacadoActual);
      cargarProductos();
    } catch (err: any) {
      alert(err.message || 'Error al actualizar estado destacado');
    }
  };

  // Filtrar productos por búsqueda
  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <AdminHeader 
        title="Gestión de Productos" 
        subtitle="Administra tu inventario"
        showBackButton={true}
        backButtonPath="/admin"
      />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Barra de acciones */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleNuevoProducto}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Producto
          </button>
        </div>

        {/* Lista de productos */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando productos...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        ) : productosFiltrados.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="mt-4 text-gray-600">No hay productos disponibles</p>
            <button
              onClick={handleNuevoProducto}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Crear primer producto
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destacado</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productosFiltrados.map((producto) => (
                  <tr key={producto.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-100">
                        {resolveImageUrl(producto.urlImagen) ? (
                          <img 
                            src={resolveImageUrl(producto.urlImagen)!} 
                            alt={producto.nombre} 
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{producto.nombre}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{producto.descripcion}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">${producto.precio.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        producto.cantidadStock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {producto.cantidadStock} unid.
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleDestacado(producto.id!, producto.destacado || false)}
                        className={`p-2 rounded-lg transition-colors ${
                          producto.destacado 
                            ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                        title={producto.destacado ? 'Quitar de destacados' : 'Marcar como destacado'}
                      >
                        <svg className="w-5 h-5" fill={producto.destacado ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditarProducto(producto)}
                        className="text-purple-600 hover:text-purple-900 mr-3"
                      >
                        <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleEliminarProducto(producto.id!)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de crear/editar producto */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              
              <form onSubmit={handleGuardarProducto}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre del producto *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Ej: Mouse Gaming RGB"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción *
                    </label>
                    <textarea
                      required
                      value={formData.descripcion}
                      onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Describe el producto..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Precio (USD) *
                      </label>
                      <input
                        type="number"
                        required
                        step="0.01"
                        min="0"
                        value={formData.precio}
                        onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={formData.cantidadStock}
                        onChange={(e) => setFormData({ ...formData, cantidadStock: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Sección de imagen */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Imagen del producto
                    </label>
                    
                    {/* Selector de método de imagen */}
                    <div className="flex gap-4 mb-3">
                      <button
                        type="button"
                        onClick={() => {
                          setUseUrlInput(false);
                          setFormData({ ...formData, urlImagen: '' });
                        }}
                        className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                          !useUrlInput 
                            ? 'border-purple-600 bg-purple-50 text-purple-700 font-semibold' 
                            : 'border-gray-300 text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        📁 Subir Archivo
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUseUrlInput(true);
                          setSelectedFile(null);
                          setImagePreview(null);
                        }}
                        className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                          useUrlInput 
                            ? 'border-purple-600 bg-purple-50 text-purple-700 font-semibold' 
                            : 'border-gray-300 text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        🔗 URL de Imagen
                      </button>
                    </div>

                    {/* Input de archivo */}
                    {!useUrlInput && (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-purple-400 transition-colors">
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png"
                          onChange={handleFileSelect}
                          className="hidden"
                          id="file-upload"
                        />
                        <label 
                          htmlFor="file-upload"
                          className="cursor-pointer flex flex-col items-center justify-center"
                        >
                          <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <span className="text-sm text-gray-600">
                            {selectedFile ? selectedFile.name : 'Haz clic para seleccionar una imagen'}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            JPG, PNG (máx. 5MB)
                          </span>
                        </label>
                      </div>
                    )}

                    {/* Input de URL */}
                    {useUrlInput && (
                      <input
                        type="url"
                        value={formData.urlImagen}
                        onChange={(e) => {
                          const url = e.target.value;
                          setFormData({ ...formData, urlImagen: url });
                          // Resolver URL para vista previa
                          setImagePreview(resolveImageUrl(url));
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="https://ejemplo.com/imagen.jpg"
                      />
                    )}

                    {/* Preview de la imagen */}
                    {imagePreview && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
                        <div className="relative inline-block">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="h-40 w-40 object-cover rounded-lg border-2 border-gray-200"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }} 
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              setSelectedFile(null);
                              setFormData({ ...formData, urlImagen: '' });
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="destacado"
                      checked={formData.destacado}
                      onChange={(e) => setFormData({ ...formData, destacado: e.target.checked })}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="destacado" className="ml-2 block text-sm text-gray-700">
                      Marcar como producto destacado (aparecerá en el Home)
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    disabled={uploading}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Guardando...
                      </>
                    ) : (
                      <>{editingProduct ? 'Actualizar' : 'Crear'} Producto</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
