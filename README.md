Biblioteca – Proyecto Backend + Frontend


Autores

Esteban Suarez

Amauri Martínez


Descripción

Este proyecto implementa un sistema de gestión de biblioteca con:

Backend: Node.js + Express conectado a MySQL.

Frontend: HTML, CSS y JavaScript puro.

Se pueden gestionar usuarios, libros, ejemplares y préstamos.

Toda la información proviene directamente de la base de datos (sin datos simulados).

Instalación y configuración

1. Clonar el repositorio

git clone <URL_DEL_REPOSITORIO>
cd biblioteca-reorganizada/backend

2. Instalar dependencias

npm install

3. Configurar variables de entorno

Crear un archivo .env en la carpeta backend/ con el siguiente contenido:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=biblioteca
PORT=3000
CORS_ORIGIN=http://127.0.0.1:5501

4. Crear base de datos en MySQL

Ejecutar los scripts de la carpeta db/ en orden:

-- 00_drop_create.sql
-- 01_schema.sql
-- 02_seed.sql

5. Iniciar el backend

npm run dev

6. Iniciar el frontend

Abrir la carpeta frontend/ en VSCode y usar Live Server.