import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Gera um slug amigável para URLs
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/--+/g, "-") // Remove hífens duplicados
    .trim();
}

/**
 * Formata preço em EUR
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

/**
 * Formata data relativa (ex: "há 2 dias")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "agora mesmo";
  if (diffInSeconds < 3600) return `há ${Math.floor(diffInSeconds / 60)} min`;
  if (diffInSeconds < 86400)
    return `há ${Math.floor(diffInSeconds / 3600)} h`;
  if (diffInSeconds < 604800)
    return `há ${Math.floor(diffInSeconds / 86400)} dias`;

  return new Intl.DateTimeFormat("pt-PT").format(date);
}

/**
 * Valida se uma string é uma cor hexadecimal válida
 */
export function isValidHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Gera um código de acesso aleatório de 6 dígitos
 */
export function generateAccessCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}