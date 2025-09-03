// server.js
// Yo levanto el servidor HTTP y hago una verificación simple de la base de datos.

import app from './app.js';              // Importo la app ya configurada
import dotenv from 'dotenv';             // Importo dotenv para leer .env
import db from './src/config/db.js';     // Importo el pool de MySQL para probar la conexión

// Cargo variables de entorno
dotenv.config();

// Tomo el puerto del .env o uso 3000 por defecto
const PORT = process.env.PORT || 3000;

// Arranco el servidor
app.listen(PORT, async () => {
  console.log(`[server] Biblioteca backend escuchando en puerto ${PORT}`);
  try {
    // Hago una consulta trivial para comprobar conexión a MySQL
    await db.query('SELECT 1');
    console.log('[db] Conexión a MySQL verificada');
  } catch (err) {
    console.error('[db] Error al conectar con MySQL:', err.message);
  }
});
