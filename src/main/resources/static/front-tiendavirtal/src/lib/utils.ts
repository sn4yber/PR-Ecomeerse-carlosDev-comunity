import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resuelve la URL de una imagen de producto
 * El backend devuelve URLs como "/uploads/productos/filename.jpg"
 * En desarrollo: Vite proxy redirige automáticamente /uploads al backend local
 * En producción: Se usa la URL completa del backend
 *
 * @param imageUrl - URL de la imagen (puede ser relativa o absoluta)
 * @returns URL de la imagen lista para usar en src o null si no hay imagen
 */
export function resolveImageUrl(imageUrl?: string | null): string | null {
  if (!imageUrl) {
    return null;
  }

  // Si ya es una URL completa, retornarla tal cual
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // En producción, usar la URL del backend desde variable de entorno
  const apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl && apiUrl !== 'http://localhost:8080') {
    const cleanUrl = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
    return `${apiUrl}${cleanUrl}`;
  }

  // En desarrollo, el backend devuelve URLs relativas que Vite proxy maneja
  const cleanUrl = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
  return cleanUrl;
}
