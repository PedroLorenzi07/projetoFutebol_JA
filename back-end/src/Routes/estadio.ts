import { Router } from 'express';
import EstadioController from '../Controllers/EstadioController';

let router: Router = Router();
let estadioController: EstadioController = new EstadioController();

router.get('/estadios', estadioController.recuperarTodos);
router.post('/estadios', estadioController.salvar);
router.get('/estadios/:id', estadioController.recuperarUm);
router.delete('/estadios/:id', estadioController.apagar);
router.put('/estadios/:id', estadioController.editar);

export default router;