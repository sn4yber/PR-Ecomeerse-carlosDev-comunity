import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resuelve la URL de una imagen de producto
 * El backend devuelve URLs como "/uploads/productos/filename.jpg"
 * Vite proxy redirige automáticamente /uploads a http://localhost:8080/uploads
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

  // El backend devuelve URLs relativas como "/uploads/productos/filename.jpg"
  // Vite proxy las redirige automáticamente al backend en http://localhost:8080
  // Por lo tanto, devolvemos la URL relativa tal cual
  const cleanUrl = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
  return cleanUrl;
}
