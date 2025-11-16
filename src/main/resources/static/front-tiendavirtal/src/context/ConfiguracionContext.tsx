/**
 * Context para compartir la configuración de la tienda en toda la aplicación
 */

import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useConfiguracion } from '../hooks/useConfiguracion';
import type { ConfiguracionCompleta } from '../types/configuracion';

interface ConfiguracionContextType {
  configuracion: ConfiguracionCompleta;
  loading: boolean;
  guardarConfiguracion: (nuevaConfig: ConfiguracionCompleta) => boolean;
  actualizarSeccion: <K extends keyof ConfiguracionCompleta>(
    seccion: K,
    datos: ConfiguracionCompleta[K]
  ) => boolean;
  resetearConfiguracion: () => boolean;
}

const ConfiguracionContext = createContext<ConfiguracionContextType | undefined>(undefined);

export const ConfiguracionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const configuracionData = useConfiguracion();

  return (
    <ConfiguracionContext.Provider value={configuracionData}>
      {children}
    </ConfiguracionContext.Provider>
  );
};

export const useConfiguracionGlobal = () => {
  const context = useContext(ConfiguracionContext);
  if (context === undefined) {
    throw new Error('useConfiguracionGlobal debe usarse dentro de ConfiguracionProvider');
  }
  return context;
};
