-- 02_seed.sql
-- Datos de ejemplo (mínimo 5 por la consigna)

USE biblioteca;

-- USUARIOS (5)
INSERT INTO Usuario (Tipo, Nombre) VALUES
('Estudiante',    'Juan Pérez'),
('Profesor',      'María Gómez'),
('Estudiante',    'Carlos Ramírez'),
('Bibliotecario', 'Laura Torres'),
('Estudiante',    'Ana López');

-- LIBROS (5)
INSERT INTO Libro (Categoria, Titulo, `Año_Publicacion`, ISBN) VALUES
('Novela',      'Cien años de soledad',     1967, '9780307474728'),
('Ciencia',     'Breve historia del tiempo',1988, '9780553380163'),
('Filosofía',   'La República',             -380, '9780140455113'),
('Tecnología',  'Clean Code',               2008, '9780132350884'),
('Novela',      'El nombre de la rosa',     1980, '9780156001311');

-- EJEMPLARES (7) → referencia a ID_Libro ya insertados
-- libro 1 (2), libro 2 (1), libro 3 (1), libro 4 (2), libro 5 (1)
INSERT INTO Ejemplar (ID_Libro) VALUES
(1),(1),
(2),
(3),
(4),(4),
(5);

-- PRÉSTAMOS (algunos activos y otros devueltos)
-- Nota: usa los ID reales generados por AUTO_INCREMENT
--      Asumimos que los ID_Ejemplar quedaron 1..7 en el orden anterior.
INSERT INTO Prestamo
(ID_Usuario, ID_Ejemplar, Fecha_Prestamo, F_Devolucion_Prevista, F_Devolucion_Real)
VALUES
(1, 1, '2025-08-15', '2025-09-01', '2025-08-28'),
(2, 3, '2025-08-20', '2025-09-05', NULL),
(3, 2, '2025-08-25', '2025-09-10', NULL),
(1, 6, '2025-08-30', '2025-09-15', NULL),
(5, 7, '2025-09-02', '2025-09-18', NULL);