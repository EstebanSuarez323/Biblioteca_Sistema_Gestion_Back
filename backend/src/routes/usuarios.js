import { Router } from 'express';
import { listar, crear, actualizar, eliminar } from '../controllers/usuariosController.js';

const router = Router();
router.get('/', listar);
router.post('/', crear);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);

export default router;
