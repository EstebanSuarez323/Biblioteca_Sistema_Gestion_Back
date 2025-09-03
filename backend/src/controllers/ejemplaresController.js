import * as Ejemplares from '../models/ejemplaresModel.js';

export async function disponibles(_req, res, next) {
  try {
    const [rows] = await Ejemplares.findDisponibles();
    res.json(rows);
  } catch (e) { next(e); }
}

export async function crear(req, res, next) {
  try {
    const { ID_Libro } = req.body;
    if (!ID_Libro) return res.status(400).json({ message: 'ID_Libro es obligatorio' });
    const id = await Ejemplares.create({ ID_Libro });
    res.status(201).json({ ID_Ejemplar: id, ID_Libro });
  } catch (e) { next(e); }
}

export async function eliminar(req, res, next) {
  try {
    const [result] = await Ejemplares.remove(req.params.id);
    if (!result.affectedRows) return res.status(404).json({ message: 'Ejemplar no encontrado' });
    res.status(204).end();
  } catch (e) { next(e); }
}
