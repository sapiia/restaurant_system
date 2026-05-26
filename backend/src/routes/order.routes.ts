import { Router } from "express";
import { OrderController } from "../controllers/OrderController";

const router = Router();
const controller = new OrderController();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.put("/:id/status", controller.updateStatus);
router.delete("/:id", controller.delete);

export default router;