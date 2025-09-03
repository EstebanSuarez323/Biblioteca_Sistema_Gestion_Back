// src/middlewares/errorHandler.js
// Yo capturo cualquier error no manejado y devuelvo una respuesta controlada.

export default function errorHandler(err, _req, res, _next) {
  console.error('[error]', err); // Imprimo el error en consola para depuración
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';
  res.status(status).json({ message });
}
