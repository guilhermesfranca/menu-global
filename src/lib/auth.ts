import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não definido no .env");
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: "ADMIN" | "MANAGER";
  restaurantId?: string;
}

/**
 * Hash de senha com bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

/**
 * Verifica senha com hash
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Gera JWT token
 */
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

/**
 * Verifica e decodifica JWT token
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

/**
 * Obtém o usuário autenticado a partir dos cookies
 */
export async function getAuthUser(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  return verifyToken(token);
}

/**
 * Define o cookie de autenticação
 */
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: "/",
  });
}

/**
 * Remove o cookie de autenticação
 */
export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}