import * as Prestamos from '../models/prestamosModel.js';
import db from '../config/db.js'; // para validaciones

export async function listar(_req, res, next) {
  try {
    const [rows] = await Prestamos.findAll();
    res.json(rows);
  } catch (e) { next(e); }
}

export async function crear(req, res, next) {
  try {
    const { ID_Usuario, ID_Ejemplar, Fecha_Prestamo, F_Devolucion_Prevista } = req.body;
    if (!ID_Usuario || !ID_Ejemplar || !Fecha_Prestamo || !F_Devolucion_Prevista)
      return res.status(400).json({ message: 'Campos obligatorios faltantes' });

    // Validaciones básicas
    const [[user]]     = await db.query('SELECT ID_Usuario FROM Usuario  WHERE ID_Usuario=?', [ID_Usuario]);
    const [[ejemplar]] = await db.query('SELECT ID_Ejemplar FROM Ejemplar WHERE ID_Ejemplar=?', [ID_Ejemplar]);
    if (!user)     return res.status(400).json({ message: 'Usuario no existe' });
    if (!ejemplar) return res.status(400).json({ message: 'Ejemplar no existe' });

    const [[activo]] = await db.query(
      'SELECT ID_Prestamo FROM Prestamo WHERE ID_Ejemplar=? AND F_Devolucion_Real IS NULL LIMIT 1',
      [ID_Ejemplar]
    );
    if (activo) return res.status(409).json({ message: 'El ejemplar ya está prestado' });

    const id = await Prestamos.create({ ID_Usuario, ID_Ejemplar, Fecha_Prestamo, F_Devolucion_Prevista });
    res.status(201).json({ ID_Prestamo: id, ID_Usuario, ID_Ejemplar, Fecha_Prestamo, F_Devolucion_Prevista });
  } catch (e) { next(e); }
}

export async function devolver(req, res, next) {
  try {
    const fecha = req.body.F_Devolucion_Real || new Date().toISOString().slice(0, 10);
    const ok = await Prestamos.marcarDevolucion(req.params.id, fecha);
    if (!ok) return res.status(404).json({ message: 'Préstamo no encontrado o ya devuelto' });
    res.json({ ID_Prestamo: Number(req.params.id), F_Devolucion_Real: fecha });
  } catch (e) { next(e); }
}

export async function eliminar(req, res, next) {
  try {
    const [result] = await Prestamos.remove(req.params.id);
    if (!result.affectedRows) return res.status(404).json({ message: 'Préstamo no encontrado' });
    res.status(204).end();
  } catch (e) { next(e); }
}
