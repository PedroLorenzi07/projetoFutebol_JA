import { Router } from 'express';
import TimeController from '../Controllers/TimeController';

let router: Router = Router();
let timeController: TimeController = new TimeController();

router.get('/times', timeController.recuperarTodos);
router.post('/times', timeController.salvar);
router.get('/times/:id', timeController.recuperarUm);
router.delete('/times/:id', timeController.apagar);
router.put('/times/:id', timeController.editar);

export default router;