import { Router } from 'express';
import { PaymentController } from '../controllers/PaymentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = Router();
const controller = new PaymentController();

// ADMIN, CASHIER only
router.post('/',                    authMiddleware, roleMiddleware('ADMIN', 'CASHIER'), controller.create);
router.get('/',                     authMiddleware, roleMiddleware('ADMIN', 'CASHIER'), controller.getAll);
router.get('/:id',                  authMiddleware, roleMiddleware('ADMIN', 'CASHIER'), controller.getById);
router.get('/order/:order_id',      authMiddleware, roleMiddleware('ADMIN', 'CASHIER'), controller.getByOrderId);
router.get('/table/:table_number', authMiddleware, roleMiddleware('ADMIN', 'CASHIER'), controller.getByTable);



export default router;