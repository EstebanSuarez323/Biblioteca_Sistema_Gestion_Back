import * as Usuarios from '../models/usuariosModel.js';

export async function listar(_req, res, next) {
  try {
    const [rows] = await Usuarios.findAll();
    res.json(rows);
  } catch (e) { next(e); }
}

export async function crear(req, res, next) {
  try {
    const { Tipo, Nombre } = req.body;
    if (!Tipo || !Nombre) return res.status(400).json({ message: 'Tipo y Nombre son obligatorios' });
    const id = await Usuarios.create({ Tipo, Nombre });
    res.status(201).json({ ID_Usuario: id, Tipo, Nombre });
  } catch (e) { next(e); }
}

export async function actualizar(req, res, next) {
  try {
    const { Tipo, Nombre } = req.body;
    const ok = await Usuarios.update(req.params.id, { Tipo, Nombre });
    if (!ok) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ ID_Usuario: Number(req.params.id), Tipo, Nombre });
  } catch (e) { next(e); }
}

export async function eliminar(req, res, next) {
  try {
    const [result] = await Usuarios.remove(req.params.id);
    if (!result.affectedRows) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(204).end();
  } catch (e) { next(e); }
}
