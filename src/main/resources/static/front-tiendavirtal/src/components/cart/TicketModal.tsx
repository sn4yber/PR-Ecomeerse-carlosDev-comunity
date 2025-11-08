/**
 * @fileoverview Modal de Ticket/Factura
 * @description Muestra el ticket de compra con opción para descargar como imagen
 * @author E-commerce Team
 * @created 2025-10-13
 */

import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import html2canvas from 'html2canvas';
import { X, Download } from 'lucide-react';
import type { Factura } from '../../types/cart';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  factura: Factura | null;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  isOpen,
  onClose,
  factura,
}) => {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleDownload = async () => {
    if (!ticketRef.current || !factura) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `ticket-${factura.numeroTicket}.png`;
      link.click();
    } catch (error) {
      console.error('Error al descargar el ticket:', error);
      alert('Error al generar la imagen del ticket');
    } finally {
      setIsDownloading(false);
    }
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  if (!isOpen || !factura) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div 
      data-modal="ticket-backdrop"
      style={{ 
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        overflow: 'auto'
      }}
      onClick={handleBackdropClick}
    >
      <div 
        data-modal="ticket-content"
        style={{ 
          position: 'relative',
          zIndex: 1000000,
          maxWidth: '48rem',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          borderRadius: '0.5rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">¡Compra Exitosa!</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Descargando...
                </>
              ) : (
                <>
                  <Download size={20} />
                  Descargar
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Ticket Content */}
        <div className="p-6">
          <div 
            ref={ticketRef}
            className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 font-mono text-sm"
            style={{ maxWidth: '600px', margin: '0 auto' }}
          >
            {/* Header del Ticket */}
            <div className="text-center mb-6 border-b-2 border-gray-800 pb-4">
              <h1 className="text-3xl font-bold mb-2">{factura.empresaNombre}</h1>
              <p className="text-sm">Sistema de Inventario</p>
              <p className="text-sm">NIT: {factura.empresaNit}</p>
            </div>

            {/* Información del Ticket */}
            <div className="border-b-2 border-gray-300 pb-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="font-bold">Ticket:</span>
                <span>{factura.numeroTicket}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-bold">Fecha:</span>
                <span>{formatDate(factura.fecha)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-bold">Cliente:</span>
                <span>{factura.cliente.nombreCompleto}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-bold">Identificación:</span>
                <span>{factura.cliente.numeroIdentificacion}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-bold">Teléfono:</span>
                <span>{factura.cliente.telefono}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Método Pago:</span>
                <span>{factura.cliente.metodoPago}</span>
              </div>
            </div>

            {/* Tabla de Productos */}
            <div className="mb-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-800">
                    <th className="text-left py-2">Producto</th>
                    <th className="text-center py-2">Cant</th>
                    <th className="text-right py-2">P.Unit</th>
                    <th className="text-right py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {factura.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-300">
                      <td className="py-2 pr-2">{item.nombreProducto}</td>
                      <td className="text-center py-2">{item.cantidad}</td>
                      <td className="text-right py-2">{formatCurrency(item.precioUnitario)}</td>
                      <td className="text-right py-2 font-bold">{formatCurrency(item.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totales */}
            <div className="border-t-2 border-gray-800 pt-4">
              <div className="flex justify-between mb-2">
                <span>SUBTOTAL:</span>
                <span className="font-bold">{formatCurrency(factura.subtotal)}</span>
              </div>
              {factura.descuentoTotal > 0 && (
                <div className="flex justify-between mb-2 text-green-600">
                  <span>Descuento:</span>
                  <span className="font-bold">-{formatCurrency(factura.descuentoTotal)}</span>
                </div>
              )}
              {factura.impuestos > 0 && (
                <div className="flex justify-between mb-2">
                  <span>Impuestos:</span>
                  <span className="font-bold">{formatCurrency(factura.impuestos)}</span>
                </div>
              )}
              <div className="flex justify-between text-2xl font-bold border-t-2 border-gray-800 pt-2 mt-2">
                <span>TOTAL:</span>
                <span>{formatCurrency(factura.total)}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-6 pt-4 border-t-2 border-gray-300 text-xs">
              <p className="mb-1">¡Gracias por su compra!</p>
              <p className="mb-1">{factura.empresaWeb}</p>
              <p>Tel: {factura.empresaTelefono}</p>
            </div>
          </div>

          {/* Información adicional fuera del ticket */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-2">
              Tu pedido <span className="font-semibold">{factura.numeroPedido}</span> ha sido procesado exitosamente
            </p>
            <p className="text-sm text-gray-500">
              Recibirás un correo de confirmación en {factura.cliente.email}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex gap-4">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isDownloading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Descargando...
              </>
            ) : (
              <>
                <Download size={20} />
                Descargar Ticket
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default TicketModal;
