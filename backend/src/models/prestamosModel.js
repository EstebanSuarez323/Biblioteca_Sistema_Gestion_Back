import db from '../config/db.js';

export function findAll() {
  return db.query(`
    SELECT 
      p.ID_Prestamo,
      u.Nombre AS Usuario,
      u.Tipo   AS TipoUsuario,
      l.Titulo AS Libro,
      p.ID_Usuario,
      p.ID_Ejemplar,
      p.Fecha_Prestamo,
      p.F_Devolucion_Prevista,
      p.F_Devolucion_Real
    FROM Prestamo p
    JOIN Usuario  u ON p.ID_Usuario  = u.ID_Usuario
    JOIN Ejemplar e ON p.ID_Ejemplar = e.ID_Ejemplar
    JOIN Libro    l ON e.ID_Libro    = l.ID_Libro
    ORDER BY p.ID_Prestamo DESC
  `);
}

export async function create({ ID_Usuario, ID_Ejemplar, Fecha_Prestamo, F_Devolucion_Prevista }) {
  const [result] = await db.query(
    'INSERT INTO Prestamo (ID_Usuario, ID_Ejemplar, Fecha_Prestamo, F_Devolucion_Prevista) VALUES (?, ?, ?, ?)',
    [ID_Usuario, ID_Ejemplar, Fecha_Prestamo, F_Devolucion_Prevista]
  );
  return result.insertId;
}

export async function marcarDevolucion(id, fecha) {
  const [result] = await db.query(
    'UPDATE Prestamo SET F_Devolucion_Real=? WHERE ID_Prestamo=? AND F_Devolucion_Real IS NULL',
    [fecha, id]
  );
  return result.affectedRows;
}

export function remove(id) {
  return db.query('DELETE FROM Prestamo WHERE ID_Prestamo=?', [id]);
}
