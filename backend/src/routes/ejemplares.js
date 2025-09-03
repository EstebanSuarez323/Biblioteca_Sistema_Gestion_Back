import { Router } from 'express';
import { disponibles, crear, eliminar } from '../controllers/ejemplaresController.js';

const router = Router();
router.get('/disponibles', disponibles);
router.post('/', crear);
router.delete('/:id', eliminar);

export default router;
