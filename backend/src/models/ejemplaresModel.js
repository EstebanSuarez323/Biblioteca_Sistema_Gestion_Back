import db from '../config/db.js';

export function findDisponibles() {
  return db.query(`
    SELECT e.ID_Ejemplar, l.Titulo
    FROM Ejemplar e
    JOIN Libro l ON l.ID_Libro = e.ID_Libro
    LEFT JOIN Prestamo p
      ON p.ID_Ejemplar = e.ID_Ejemplar
     AND p.F_Devolucion_Real IS NULL
    WHERE p.ID_Prestamo IS NULL
    ORDER BY e.ID_Ejemplar
  `);
}

export async function create({ ID_Libro }) {
  const [result] = await db.query('INSERT INTO Ejemplar (ID_Libro) VALUES (?)', [ID_Libro]);
  return result.insertId;
}

export function remove(id) {
  return db.query('DELETE FROM Ejemplar WHERE ID_Ejemplar=?', [id]);
}
