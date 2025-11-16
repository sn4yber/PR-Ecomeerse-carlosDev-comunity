/**
 * @fileoverview Wrapper del Panel de Administrador para compatibilidad
 * @description Componente que envuelve AdminDashboard para mantener compatibilidad
 * @author E-commerce Team
 * @created 2025-09-29
 */

import React from 'react';
import { AdminDashboard } from './admin/pages/AdminDashboard';

export interface AdminPanelProps {
  className?: string;
}

/**
 * Componente AdminPanel - Wrapper para AdminDashboard
 * Mantiene compatibilidad con el nombre anterior
 */
export const AdminPanel: React.FC<AdminPanelProps> = (props) => {
  return <AdminDashboard {...props} />;
};

export default AdminPanel;
