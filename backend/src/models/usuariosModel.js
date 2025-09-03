import db from '../config/db.js';

export function findAll() {
  return db.query('SELECT ID_Usuario, Tipo, Nombre FROM Usuario ORDER BY ID_Usuario');
}

export async function create({ Tipo, Nombre }) {
  const [result] = await db.query('INSERT INTO Usuario (Tipo, Nombre) VALUES (?, ?)', [Tipo, Nombre]);
  return result.insertId;
}

export async function update(id, { Tipo, Nombre }) {
  const [result] = await db.query('UPDATE Usuario SET Tipo=?, Nombre=? WHERE ID_Usuario=?', [Tipo, Nombre, id]);
  return result.affectedRows;
}

export function remove(id) {
  return db.query('DELETE FROM Usuario WHERE ID_Usuario=?', [id]);
}
