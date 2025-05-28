import { Request, Response, NextFunction } from 'express';

// Middleware para permitir CORS abierto solo en GET /products
export function publicProductsCors(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (
    (req.method === 'GET' || req.method === 'OPTIONS') &&
    req.path === '/products'
  ) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Para preflight requests
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
  }
  next();
}
