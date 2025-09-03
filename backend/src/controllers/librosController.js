import * as Libros from '../models/librosModel.js';

export async function listar(req, res, next) {
  try {
    const q = (req.query?.q || '').trim();
    const [rows] = q ? await Libros.findByTitleLike(q) : await Libros.findAll();
    res.json(rows);
  } catch (e) { next(e); }
}

export async function crear(req, res, next) {
  try {
    const { Categoria, Titulo, Anio_Publicacion, ISBN } = req.body;
    if (!Categoria || !Titulo || !Anio_Publicacion || !ISBN) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    const id = await Libros.create({ Categoria, Titulo, Anio_Publicacion, ISBN });
    res.status(201).json({ ID_Libro: id, Categoria, Titulo, Anio_Publicacion, ISBN });
  } catch (e) { next(e); }
}

export async function actualizar(req, res, next) {
  try {
    const { id } = req.params;
    const { Categoria, Titulo, Anio_Publicacion, ISBN } = req.body;
    if (!Categoria || !Titulo || !Anio_Publicacion || !ISBN) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    const affected = await Libros.update(id, { Categoria, Titulo, Anio_Publicacion, ISBN });
    if (!affected) return res.status(404).json({ message: 'Libro no encontrado' });
    res.status(204).end();
  } catch (e) { next(e); }
}

export async function eliminar(req, res, next) {
  try {
    const { id } = req.params;
    const [result] = await Libros.remove(id);
    if (!result.affectedRows) return res.status(404).json({ message: 'Libro no encontrado' });
    res.status(204).end();
  } catch (e) { next(e); }
}
