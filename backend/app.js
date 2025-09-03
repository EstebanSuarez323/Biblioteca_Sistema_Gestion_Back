import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import usuariosRouter from './src/routes/usuarios.js';
import librosRouter from './src/routes/libros.js';
import ejemplaresRouter from './src/routes/ejemplares.js';
import prestamosRouter from './src/routes/prestamos.js';

import notFound from './src/middlewares/notFound.js';
import errorHandler from './src/middlewares/errorHandler.js';

dotenv.config();

const app = express();

// acepta JSON
app.use(express.json());

// CORS: agrega aquí los orígenes que usas

const allowed = [
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://127.0.0.1:5501'
];

app.use(cors({ origin: allowed, credentials: true }));
app.options('*', cors()); // habilita preflight


// health
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// rutas
app.use('/api/usuarios', usuariosRouter);
app.use('/api/libros', librosRouter);
app.use('/api/ejemplares', ejemplaresRouter);
app.use('/api/prestamos', prestamosRouter);

// errores
app.use(notFound);
app.use(errorHandler);

export default app;
