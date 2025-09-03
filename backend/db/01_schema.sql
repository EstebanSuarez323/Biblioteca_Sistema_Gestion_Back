-- 01_schema.sql
-- Definición del esquema (tablas y claves foráneas)

USE biblioteca;

-- Tabla de usuarios
CREATE TABLE Usuario (
  ID_Usuario INT AUTO_INCREMENT PRIMARY KEY,
  Tipo ENUM('Estudiante','Profesor','Bibliotecario') NOT NULL,
  Nombre VARCHAR(100) NOT NULL
);

-- Tabla de libros
CREATE TABLE Libro (
  ID_Libro INT AUTO_INCREMENT PRIMARY KEY,
  Categoria VARCHAR(50) NOT NULL,
  Titulo VARCHAR(200) NOT NULL,
  `Año_Publicacion` INT,
  ISBN VARCHAR(20)
);

-- Tabla de ejemplares
CREATE TABLE Ejemplar (
  ID_Ejemplar INT AUTO_INCREMENT PRIMARY KEY,
  ID_Libro INT NOT NULL,
  CONSTRAINT ejemplar_ibfk_1
    FOREIGN KEY (ID_Libro) REFERENCES Libro(ID_Libro)
    ON DELETE CASCADE
);

-- Tabla de préstamos
CREATE TABLE Prestamo (
  ID_Prestamo INT AUTO_INCREMENT PRIMARY KEY,
  ID_Usuario INT NOT NULL,
  ID_Ejemplar INT NOT NULL,
  Fecha_Prestamo DATE NOT NULL,
  F_Devolucion_Prevista DATE NOT NULL,
  F_Devolucion_Real DATE NULL,
  Detalle_Prestamo VARCHAR(255) NULL,
  CONSTRAINT prestamo_usuario_fk
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario),
  CONSTRAINT prestamo_ejemplar_fk
    FOREIGN KEY (ID_Ejemplar) REFERENCES Ejemplar(ID_Ejemplar)
);
