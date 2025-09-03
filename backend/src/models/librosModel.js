import db from '../config/db.js';

export function findAll() {
  return db.query(`
    SELECT 
      ID_Libro,
      Categoria,
      Titulo,
      \`Año_Publicacion\` AS Anio_Publicacion,
      ISBN
    FROM Libro
    ORDER BY ID_Libro
  `);
}

export function findById(id) {
  return db.query(`
    SELECT 
      ID_Libro,
      Categoria,
      Titulo,
      \`Año_Publicacion\` AS Anio_Publicacion,
      ISBN
    FROM Libro
    WHERE ID_Libro = ?
  `, [id]);
}

/** BÚSQUEDA por título (para el buscador del frontend) */
export function findByTitleLike(q) {
  return db.query(`
    SELECT
      ID_Libro,
      Categoria,
      Titulo,
      \`Año_Publicacion\` AS Anio_Publicacion,
      ISBN
    FROM Libro
    WHERE Titulo LIKE CONCAT('%', ?, '%')
    ORDER BY ID_Libro
  `, [q]);
}

export async function create({ Categoria, Titulo, Anio_Publicacion, ISBN }) {
  const [result] = await db.query(
    'INSERT INTO Libro (Categoria, Titulo, `Año_Publicacion`, ISBN) VALUES (?, ?, ?, ?)',
    [Categoria, Titulo, Anio_Publicacion, ISBN]
  );
  return result.insertId;
}

export async function update(id, { Categoria, Titulo, Anio_Publicacion, ISBN }) {
  const [result] = await db.query(
    'UPDATE Libro SET Categoria=?, Titulo=?, `Año_Publicacion`=?, ISBN=? WHERE ID_Libro=?',
    [Categoria, Titulo, Anio_Publicacion, ISBN, id]
  );
  return result.affectedRows;
}

export function remove(id) {
  return db.query('DELETE FROM Libro WHERE ID_Libro=?', [id]);
}
