import { Router } from 'express';
import { listar, crear, devolver, eliminar } from '../controllers/prestamosController.js';

const router = Router();
router.get('/', listar);
router.post('/', crear);
router.put('/:id/devolver', devolver);
router.delete('/:id', eliminar);

export default router;
