/**
 * @fileoverview Panel de perfil de usuario - Gestión de información personal, contraseña e historial de pedidos
 * @author E-commerce Team
 */

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { obtenerMiPerfil, actualizarMiPerfil, cambiarContrasena } from '../../api/usuariosApi';
import { obtenerMisPedidos } from '../../api/pedidosApi';
import type { ActualizarPerfilRequest, CambiarContrasenaRequest } from '../../types/usuario';
import type { PedidoDetalle } from '../../types/pedido';

type Tab = 'perfil' | 'contrasena' | 'pedidos';

export function UserProfile() {
  const [activeTab, setActiveTab] = useState<Tab>('perfil');

  // ========== QUERIES ==========
  
  const { data: usuario, isLoading: loadingPerfil } = useQuery({
    queryKey: ['miPerfil'],
    queryFn: obtenerMiPerfil,
  });

  const { data: pedidos = [], isLoading: loadingPedidos } = useQuery({
    queryKey: ['misPedidos'],
    queryFn: obtenerMisPedidos,
    enabled: activeTab === 'pedidos',
  });

  // ========== RENDER ==========

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {usuario?.nombre?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Mi Perfil
              </h1>
              <p className="text-gray-600">
                {usuario?.nombre} {usuario?.apellido} • {usuario?.rol}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('perfil')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'perfil'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Información Personal</span>
              </button>
              <button
                onClick={() => setActiveTab('contrasena')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'contrasena'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Cambiar Contraseña</span>
              </button>
              <button
                onClick={() => setActiveTab('pedidos')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'pedidos'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
                <span>Mis Pedidos</span>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'perfil' && (
              <PerfilTab usuario={usuario} loading={loadingPerfil} />
            )}
            {activeTab === 'contrasena' && <ContrasenaTab />}
            {activeTab === 'pedidos' && (
              <PedidosTab pedidos={pedidos} loading={loadingPedidos} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ========== TAB COMPONENTS ==========

interface PerfilTabProps {
  usuario: any;
  loading: boolean;
}

function PerfilTab({ usuario, loading }: PerfilTabProps) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ActualizarPerfilRequest>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
  });

  const actualizarMutation = useMutation({
    mutationFn: actualizarMiPerfil,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['miPerfil'] });
      // Actualizar localStorage
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        const updatedUser = { ...user, ...data };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      setIsEditing(false);
      alert('Perfil actualizado exitosamente');
    },
    onError: (error: Error) => {
      alert('Error al actualizar perfil: ' + error.message);
    },
  });

  const handleEdit = () => {
    setFormData({
      nombre: usuario?.nombre || '',
      apellido: usuario?.apellido || '',
      email: usuario?.email || '',
      telefono: usuario?.telefono || '',
    });
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    actualizarMutation.mutate(formData);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apellido *
            </label>
            <input
              type="text"
              value={formData.apellido}
              onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              value={formData.telefono || ''}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={actualizarMutation.isPending}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            <span>{actualizarMutation.isPending ? 'Guardando...' : 'Guardar Cambios'}</span>
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span>Cancelar</span>
          </button>
        </div>
      </form>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Información Personal</h2>
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span>Editar</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Nombre</p>
          <p className="text-lg font-semibold text-gray-800">{usuario?.nombre}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Apellido</p>
          <p className="text-lg font-semibold text-gray-800">{usuario?.apellido}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Nombre de Usuario</p>
          <p className="text-lg font-semibold text-gray-800">{usuario?.nombreUsuario}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Email</p>
          <p className="text-lg font-semibold text-gray-800">{usuario?.email}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Teléfono</p>
          <p className="text-lg font-semibold text-gray-800">{usuario?.telefono || 'No especificado'}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Rol</p>
          <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            {usuario?.rol === 'ADMIN' ? (
              <>
                <svg className="w-5 h-5 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span>Administrador</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Cliente</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function ContrasenaTab() {
  const [formData, setFormData] = useState<CambiarContrasenaRequest>({
    contrasenaActual: '',
    nuevaContrasena: '',
  });
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  const cambiarContrasenaMutation = useMutation({
    mutationFn: cambiarContrasena,
    onSuccess: () => {
      setFormData({ contrasenaActual: '', nuevaContrasena: '' });
      setConfirmarContrasena('');
      alert('Contraseña actualizada exitosamente');
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.nuevaContrasena !== confirmarContrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (formData.nuevaContrasena.length < 6) {
      alert('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }

    cambiarContrasenaMutation.mutate(formData);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Cambiar Contraseña</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contraseña Actual *
          </label>
          <input
            type="password"
            value={formData.contrasenaActual}
            onChange={(e) => setFormData({ ...formData, contrasenaActual: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nueva Contraseña *
          </label>
          <input
            type="password"
            value={formData.nuevaContrasena}
            onChange={(e) => setFormData({ ...formData, nuevaContrasena: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            minLength={6}
          />
          <p className="text-sm text-gray-500 mt-1">Mínimo 6 caracteres</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirmar Nueva Contraseña *
          </label>
          <input
            type="password"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={cambiarContrasenaMutation.isPending}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>{cambiarContrasenaMutation.isPending ? 'Actualizando...' : 'Cambiar Contraseña'}</span>
        </button>
      </form>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>Consejos de Seguridad</span>
        </h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Usa una contraseña única que no uses en otros sitios</li>
          <li>• Combina letras mayúsculas, minúsculas, números y símbolos</li>
          <li>• Evita información personal fácil de adivinar</li>
          <li>• Cambia tu contraseña periódicamente</li>
        </ul>
      </div>
    </div>
  );
}

interface PedidosTabProps {
  pedidos: PedidoDetalle[];
  loading: boolean;
}

function PedidosTab({ pedidos, loading }: PedidosTabProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (pedidos.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-24 h-24 mx-auto mb-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No tienes pedidos aún
        </h3>
        <p className="text-gray-600 mb-6">
          ¡Empieza a comprar y tus pedidos aparecerán aquí!
        </p>
        <a
          href="/productos"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span>Ver Productos</span>
        </a>
      </div>
    );
  }

  const getEstadoColor = (estado: string) => {
    const colores: Record<string, string> = {
      PENDIENTE: 'bg-yellow-100 text-yellow-800',
      PROCESANDO: 'bg-blue-100 text-blue-800',
      ENVIADO: 'bg-purple-100 text-purple-800',
      ENTREGADO: 'bg-green-100 text-green-800',
      CANCELADO: 'bg-red-100 text-red-800',
    };
    return colores[estado] || 'bg-gray-100 text-gray-800';
  };

  const getEstadoPagoColor = (estado: string) => {
    const colores: Record<string, string> = {
      PENDIENTE: 'bg-yellow-100 text-yellow-800',
      PAGADO: 'bg-green-100 text-green-800',
      FALLIDO: 'bg-red-100 text-red-800',
      REEMBOLSADO: 'bg-gray-100 text-gray-800',
    };
    return colores[estado] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Historial de Pedidos ({pedidos.length})
        </h2>
      </div>

      <div className="space-y-4">
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600">
                  Pedido #{pedido.id} • {pedido.fechaPedido ? new Date(pedido.fechaPedido).toLocaleDateString() : 'Fecha no disponible'}
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  ${(pedido.total || 0).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(pedido.estadoPedido || 'PENDIENTE')}`}>
                  {pedido.estadoPedido || 'PENDIENTE'}
                </span>
                <div className="mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoPagoColor(pedido.estadoPago || 'PENDIENTE')}`}>
                    Pago: {pedido.estadoPago || 'PENDIENTE'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Dirección de envío:</p>
                <p className="font-medium text-gray-800">{pedido.clienteDireccion || 'No especificada'}</p>
                <p className="text-gray-600">{pedido.clienteCiudad || 'Ciudad'}, {pedido.clientePais || 'País'}</p>
              </div>
              <div>
                <p className="text-gray-600">Método de pago:</p>
                <p className="font-medium text-gray-800">{pedido.metodoPago || 'No especificado'}</p>
                {pedido.clienteTelefono && (
                  <>
                    <p className="text-gray-600 mt-2">Teléfono:</p>
                    <p className="font-medium text-gray-800">{pedido.clienteTelefono}</p>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-medium text-gray-800">${(pedido.subtotal || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Descuentos</p>
                  <p className="font-medium text-green-600">-${(pedido.descuentos || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Impuestos</p>
                  <p className="font-medium text-gray-800">${(pedido.impuestos || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total</p>
                  <p className="font-bold text-gray-800 text-lg">${(pedido.total || 0).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
