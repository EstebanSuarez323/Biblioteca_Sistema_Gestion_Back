// src/middlewares/notFound.js
// Yo manejo las rutas que no existen y devuelvo 404 en formato JSON.

export default function notFound(_req, res, _next) {
  res.status(404).json({ message: 'Recurso no encontrado' });
}
