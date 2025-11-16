/**
 * Hook personalizado para manejar la configuración de la tienda
 * Usa localStorage para persistir los datos
 */

import { useState, useEffect } from 'react';
import type { ConfiguracionCompleta } from '../types/configuracion';
import { CONFIGURACION_DEFAULT } from '../types/configuracion';

const STORAGE_KEY = 'nebulatech_configuracion';

export const useConfiguracion = () => {
  const [configuracion, setConfiguracion] = useState<ConfiguracionCompleta>(CONFIGURACION_DEFAULT);
  const [loading, setLoading] = useState(true);

  // Cargar configuración desde localStorage al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setConfiguracion({ ...CONFIGURACION_DEFAULT, ...parsed });
      }
    } catch (error) {
      console.error('Error al cargar configuración:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Guardar configuración en localStorage
  const guardarConfiguracion = (nuevaConfig: ConfiguracionCompleta) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevaConfig));
      setConfiguracion(nuevaConfig);
      return true;
    } catch (error) {
      console.error('Error al guardar configuración:', error);
      return false;
    }
  };

  // Actualizar solo una sección
  const actualizarSeccion = <K extends keyof ConfiguracionCompleta>(
    seccion: K,
    datos: ConfiguracionCompleta[K]
  ) => {
    const nuevaConfig = {
      ...configuracion,
      [seccion]: datos,
    };
    return guardarConfiguracion(nuevaConfig);
  };

  // Resetear a valores por defecto
  const resetearConfiguracion = () => {
    localStorage.removeItem(STORAGE_KEY);
    setConfiguracion(CONFIGURACION_DEFAULT);
    return true;
  };

  return {
    configuracion,
    loading,
    guardarConfiguracion,
    actualizarSeccion,
    resetearConfiguracion,
  };
};
