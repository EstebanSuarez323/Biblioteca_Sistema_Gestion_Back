// src/config/db.js
// Yo creo un pool de conexiones MySQL usando mysql2/promise para consultas con async/await.

import mysql from 'mysql2/promise';   // Importo el cliente mysql2 en modo promesa
import dotenv from 'dotenv';          // Importo dotenv para leer variables de entorno

// Cargo las variables de entorno desde .env
dotenv.config();

// Creo el pool de conexiones con parámetros de .env
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exporto el pool para usarlo en controladores
export default db;
