import { Router } from 'express';
import { OrderController } from '../controllers/OrderController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = Router();
const controller = new OrderController();

// CUSTOMER — place order (public, no login required) 
router.post('/',              controller.create);
// Public — customer places and checks own order
router.get('/:id',        controller.getById);

// ADMIN, CHEF, CASHIER — view all orders
router.get('/',               authMiddleware, roleMiddleware('ADMIN', 'CHEF', 'CASHIER'),  controller.getAll);

// ADMIN, CHEF — update order status
router.put('/:id/status',     authMiddleware, roleMiddleware('ADMIN', 'CHEF'),             controller.updateStatus);
// ADMIN only — delete order
router.delete('/:id',         authMiddleware, roleMiddleware('ADMIN'),                     controller.delete);


// CASHIER, ADMIN — unpaid orders grouped by table
router.get('/unpaid/tables',              authMiddleware, roleMiddleware('ADMIN', 'CASHIER'), controller.getAllUnpaid);

// CASHIER, ADMIN — orders by table number
router.get('/table/:table_number',        authMiddleware, roleMiddleware('ADMIN', 'CASHIER', 'CHEF'), controller.getByTable);
router.get('/table/:table_number/unpaid', authMiddleware, roleMiddleware('ADMIN', 'CASHIER'), controller.getUnpaidByTable);

// ADMIN, CHEF, CASHIER — view all orders
router.get('/',                           authMiddleware, roleMiddleware('ADMIN', 'CHEF', 'CASHIER'), controller.getAll);

// ADMIN, CHEF — update status
router.put('/:id/status',                 authMiddleware, roleMiddleware('ADMIN', 'CHEF'), controller.updateStatus);

// ADMIN only
router.delete('/:id',                     authMiddleware, roleMiddleware('ADMIN'), controller.delete);
export default router;